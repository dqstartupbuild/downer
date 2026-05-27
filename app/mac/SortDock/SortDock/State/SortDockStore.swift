import AppKit
import Combine
import Foundation

final class SortDockStore: ObservableObject {
    @Published var activities: [ActivityRecord] {
        didSet {
            persist()
        }
    }

    @Published var isHistoryPresented = false

    @Published var destinations: [DestinationFolder] {
        didSet {
            persist()
        }
    }

    @Published var rules: [RoutingRule] {
        didSet {
            persist()
        }
    }

    @Published var selectedDestinationID: UUID?
    @Published var selectedRuleID: UUID?
    @Published var settings: SortDockSettings {
        didSet {
            persist()
            handleSettingsChange(oldValue: oldValue)
        }
    }

    @Published private(set) var statusMessage = "Ready"

    private let fileManager = FileManager.default
    private let mover = FileMover()
    private let persistence = SettingsPersistence()
    private let promptCoordinator = PromptCoordinator()
    private var folderAccess: FolderAccess?
    private var knownFilePaths = Set<String>()
    private var scanTask: Task<Void, Never>?
    private var snoozeTasks: [UUID: Task<Void, Never>] = [:]
    private var watcher: FolderWatcher?

    init() {
        let configuration = persistence.load()
        settings = configuration.settings
        destinations = configuration.destinations
        rules = configuration.rules
        activities = configuration.activities
        selectedDestinationID = configuration.destinations.first?.id
        selectedRuleID = configuration.rules.first?.id
    }

    var currentStatusTitle: String {
        if !settings.isSortingEnabled {
            return "Paused"
        }

        if settings.watchedFolderBookmark == nil {
            return "Needs folder access"
        }

        return "Sorting active"
    }

    var currentStatusSummary: String {
        "\(watchedFolderURL.lastPathComponent) -> \(rules.count) rules -> \(settings.moveBehavior.summary) after \(delayLabel)"
    }

    var delayLabel: String {
        settings.delayOption == .custom
            ? "\(Int(settings.customDelaySeconds)) sec"
            : settings.delayOption.label
    }

    var lastActivityText: String {
        activities.first?.message ?? "No files moved yet."
    }

    var snoozeLabel: String {
        settings.snoozeOption == .custom
            ? "\(Int(settings.customSnoozeMinutes)) min"
            : settings.snoozeOption.label
    }

    var watchedFolderURL: URL {
        folderAccess?.url ?? URL(fileURLWithPath: settings.watchedFolderPath, isDirectory: true)
    }

    func addDestination(named rawName: String) {
        let name = cleanDestinationName(rawName)

        guard !name.isEmpty else {
            return
        }

        let destination = DestinationFolder(name: name)
        destinations.append(destination)
        selectedDestinationID = destination.id
    }

    func chooseWatchedFolder() {
        guard let url = promptCoordinator.chooseWatchedFolder() else {
            return
        }

        do {
            settings.watchedFolderBookmark = try url.bookmarkData(
                options: [.withSecurityScope],
                includingResourceValuesForKeys: nil,
                relativeTo: nil
            )
        } catch {
            settings.watchedFolderBookmark = nil
        }

        settings.watchedFolderPath = url.path
    }

    func deleteRule(_ rule: RoutingRule) {
        rules.removeAll { $0.id == rule.id }

        if selectedRuleID == rule.id {
            selectedRuleID = rules.first?.id
        }
    }

    func destinationName(for rule: RoutingRule) -> String {
        destinations.first { $0.id == rule.destinationID }?.name ?? "Missing folder"
    }

    func duplicateExtensions(_ extensions: [String], excluding ruleID: UUID?) -> [String] {
        let otherExtensions = rules
            .filter { $0.id != ruleID }
            .flatMap(\.extensions)

        return extensions.filter { otherExtensions.contains($0) }
    }

    func duplicateRule(_ rule: RoutingRule) {
        rules.append(
            RoutingRule(
                extensions: rule.extensions,
                destinationID: rule.destinationID
            )
        )
    }

    func removeDestination(_ destination: DestinationFolder) {
        destinations.removeAll { $0.id == destination.id }
        rules.removeAll { $0.destinationID == destination.id }

        if settings.defaultDestinationID == destination.id {
            settings.defaultDestinationID = nil
        }

        if selectedDestinationID == destination.id {
            selectedDestinationID = destinations.first?.id
        }
    }

    func renameDestination(_ destination: DestinationFolder, name rawName: String) {
        let name = cleanDestinationName(rawName)

        guard let index = destinations.firstIndex(where: { $0.id == destination.id }),
              !name.isEmpty
        else {
            return
        }

        destinations[index].name = name
    }

    func saveRule(id: UUID?, extensions: [String], destinationID: UUID) {
        if let id,
           let index = rules.firstIndex(where: { $0.id == id }) {
            rules[index].extensions = extensions
            rules[index].destinationID = destinationID
            selectedRuleID = id
        } else {
            let rule = RoutingRule(extensions: extensions, destinationID: destinationID)
            rules.append(rule)
            selectedRuleID = rule.id
        }
    }

    func start() {
        AppearanceCoordinator.apply(settings.appearanceMode)
        updateLoginItem()
        resolveFolderAccess()
        restartWatcher(resetKnownFiles: true)
        resumeWaitingActivities()
    }

    func showHistory() {
        isHistoryPresented = true
    }

    func clearHistory() {
        activities = []
        statusMessage = "History cleared."
    }

    func toggleSorting() {
        settings.isSortingEnabled.toggle()
    }

    func canChooseFolderForActivity(_ activity: ActivityRecord) -> Bool {
        activity.status != .moved && existingFileURL(for: activity) != nil
    }

    func canLeaveActivity(_ activity: ActivityRecord) -> Bool {
        guard existingFileURL(for: activity) != nil else {
            return false
        }

        return activity.status == .waiting || activity.status == .failed
    }

    func canMoveActivity(_ activity: ActivityRecord) -> Bool {
        guard activity.status != .moved,
              existingFileURL(for: activity) != nil
        else {
            return false
        }

        return suggestedDestination(for: activity) != nil
    }

    func canRevealActivity(_ activity: ActivityRecord) -> Bool {
        existingFileURL(for: activity) != nil
    }

    func chooseFolderForActivity(_ activity: ActivityRecord) {
        guard let fileURL = existingFileURL(for: activity) else {
            statusMessage = "Could not find \(activity.fileName ?? "that file")."
            return
        }

        guard let folderURL = promptCoordinator.chooseFolder() else {
            return
        }

        cancelSnooze(for: activity.id)
        let destination = DestinationFolder(name: folderURL.lastPathComponent)
        performMove(
            fileURL: fileURL,
            destination: destination,
            customFolderURL: folderURL,
            activityID: activity.id
        )
    }

    func leaveActivity(_ activity: ActivityRecord) {
        guard let fileURL = existingFileURL(for: activity) else {
            statusMessage = "Could not find \(activity.fileName ?? "that file")."
            return
        }

        cancelSnooze(for: activity.id)
        recordLeft(
            fileURL: fileURL,
            destination: suggestedDestination(for: activity),
            activityID: activity.id
        )
        statusMessage = "Left \(fileURL.lastPathComponent)."
    }

    func moveActivity(_ activity: ActivityRecord) {
        guard let fileURL = existingFileURL(for: activity) else {
            statusMessage = "Could not find \(activity.fileName ?? "that file")."
            return
        }

        guard let destination = suggestedDestination(for: activity) else {
            statusMessage = "Choose where \(fileURL.lastPathComponent) should go."
            return
        }

        cancelSnooze(for: activity.id)
        performMove(fileURL: fileURL, destination: destination, activityID: activity.id)
    }

    func revealActivity(_ activity: ActivityRecord) {
        guard let fileURL = existingFileURL(for: activity) else {
            statusMessage = "Could not find \(activity.fileName ?? "that file")."
            return
        }

        NSWorkspace.shared.activateFileViewerSelecting([fileURL])
    }

    func suggestedDestinationName(for activity: ActivityRecord) -> String? {
        suggestedDestination(for: activity)?.name ?? activity.destinationName
    }

    private func cleanDestinationName(_ rawName: String) -> String {
        rawName.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private func currentTopLevelFiles() -> [URL] {
        guard fileManager.fileExists(atPath: watchedFolderURL.path) else {
            return []
        }

        let urls = (try? fileManager.contentsOfDirectory(
            at: watchedFolderURL,
            includingPropertiesForKeys: [.isDirectoryKey],
            options: [.skipsHiddenFiles]
        )) ?? []

        return urls.filter { url in
            let values = try? url.resourceValues(forKeys: [.isDirectoryKey])
            return values?.isDirectory != true
        }
    }

    private func defaultDestination() -> DestinationFolder? {
        guard let id = settings.defaultDestinationID else {
            return nil
        }

        return destinations.first { $0.id == id }
    }

    private func destination(for fileURL: URL) -> DestinationFolder? {
        let fileExtension = fileURL.pathExtension.lowercased()

        if let rule = rules.first(where: { $0.matches(fileExtension: fileExtension) }) {
            return destinations.first { $0.id == rule.destinationID }
        }

        return defaultDestination()
    }

    private func cancelSnooze(for activityID: UUID) {
        snoozeTasks[activityID]?.cancel()
        snoozeTasks[activityID] = nil
    }

    private func existingFileURL(for activity: ActivityRecord) -> URL? {
        [activity.currentPath, activity.sourcePath]
            .compactMap { $0 }
            .map { URL(fileURLWithPath: $0) }
            .first { fileManager.fileExists(atPath: $0.path) }
    }

    private func suggestedDestination(for activity: ActivityRecord) -> DestinationFolder? {
        if let destinationID = activity.destinationID,
           let destination = destinations.first(where: { $0.id == destinationID }) {
            return destination
        }

        guard let fileURL = existingFileURL(for: activity) else {
            return nil
        }

        return destination(for: fileURL)
    }

    private func handleSettingsChange(oldValue: SortDockSettings) {
        if settings.appearanceMode != oldValue.appearanceMode {
            AppearanceCoordinator.apply(settings.appearanceMode)
        }

        if settings.runAtLogin != oldValue.runAtLogin {
            updateLoginItem()
        }

        if settings.watchedFolderPath != oldValue.watchedFolderPath
            || settings.isSortingEnabled != oldValue.isSortingEnabled
            || settings.watchedFolderBookmark != oldValue.watchedFolderBookmark {
            resolveFolderAccess()
            restartWatcher(resetKnownFiles: true)
        }
    }

    private func performMove(
        fileURL: URL,
        destination: DestinationFolder,
        customFolderURL: URL? = nil,
        activityID: UUID? = nil
    ) {
        let destinationFolderURL = customFolderURL
            ?? mover.destinationURL(for: destination, watchedFolderURL: watchedFolderURL)

        do {
            let movedURL = try mover.move(fileURL: fileURL, to: destinationFolderURL)
            recordMoved(
                originalURL: fileURL,
                movedURL: movedURL,
                destination: destination,
                destinationFolderURL: destinationFolderURL,
                activityID: activityID
            )
            statusMessage = "Moved \(fileURL.lastPathComponent)."
        } catch {
            recordFailed(fileURL: fileURL, destination: destination, activityID: activityID)
            statusMessage = "Could not move \(fileURL.lastPathComponent)."
        }
    }

    private func persist() {
        persistence.save(
            SortDockConfiguration(
                settings: settings,
                destinations: destinations,
                rules: rules,
                activities: activities
            )
        )
    }

    private func processFile(_ fileURL: URL, activityID: UUID? = nil) {
        guard fileManager.fileExists(atPath: fileURL.path) else {
            if let activityID {
                recordMissing(fileURL: fileURL, activityID: activityID)
            }
            return
        }

        guard let destination = destination(for: fileURL) else {
            recordLeft(fileURL: fileURL, destination: nil, activityID: activityID)
            return
        }

        switch settings.moveBehavior {
        case .autoMove:
            performMove(fileURL: fileURL, destination: destination, activityID: activityID)
        case .askFirst:
            let choice = promptCoordinator.askForMove(
                fileName: fileURL.lastPathComponent,
                destinationName: destination.name,
                watchedFolderName: watchedFolderURL.lastPathComponent,
                askLaterEnabled: settings.askLaterEnabled
            )

            switch choice {
            case .move:
                performMove(fileURL: fileURL, destination: destination, activityID: activityID)
            case .chooseFolder:
                if let folderURL = promptCoordinator.chooseFolder() {
                    performMove(
                        fileURL: fileURL,
                        destination: destination,
                        customFolderURL: folderURL,
                        activityID: activityID
                    )
                }
            case .leave:
                recordLeft(fileURL: fileURL, destination: destination, activityID: activityID)
            case .askLater:
                scheduleAskLater(fileURL, destination: destination, activityID: activityID)
            }
        }
    }

    private func recordFailed(fileURL: URL, destination: DestinationFolder?, activityID: UUID?) {
        let recordID = activityID ?? UUID()
        let record = ActivityRecord(
            id: recordID,
            message: "Could not move \(fileURL.lastPathComponent).",
            status: .failed,
            fileName: fileURL.lastPathComponent,
            sourcePath: fileURL.path,
            currentPath: fileURL.path,
            destinationID: destination?.id,
            destinationName: destination?.name
        )

        upsertActivity(record)
    }

    private func recordLeft(fileURL: URL, destination: DestinationFolder?, activityID: UUID?) {
        let recordID = activityID ?? UUID()
        let record = ActivityRecord(
            id: recordID,
            message: "Left \(fileURL.lastPathComponent) in \(watchedFolderURL.lastPathComponent).",
            status: .left,
            fileName: fileURL.lastPathComponent,
            sourcePath: fileURL.path,
            currentPath: fileURL.path,
            destinationID: destination?.id,
            destinationName: destination?.name
        )

        upsertActivity(record)
    }

    private func recordMissing(fileURL: URL, activityID: UUID) {
        let record = ActivityRecord(
            id: activityID,
            message: "Could not find \(fileURL.lastPathComponent).",
            status: .failed,
            fileName: fileURL.lastPathComponent,
            sourcePath: fileURL.path,
            currentPath: fileURL.path
        )

        upsertActivity(record)
    }

    private func recordMoved(
        originalURL: URL,
        movedURL: URL,
        destination: DestinationFolder,
        destinationFolderURL: URL,
        activityID: UUID?
    ) {
        let recordID = activityID ?? UUID()
        let destinationID = destinations.contains { $0.id == destination.id } ? destination.id : nil
        let record = ActivityRecord(
            id: recordID,
            message: "Moved \(originalURL.lastPathComponent) to \(destinationFolderURL.lastPathComponent).",
            status: .moved,
            fileName: originalURL.lastPathComponent,
            sourcePath: originalURL.path,
            currentPath: movedURL.path,
            destinationID: destinationID,
            destinationName: destinationFolderURL.lastPathComponent
        )

        upsertActivity(record)
    }

    private func upsertActivity(_ record: ActivityRecord) {
        var updatedActivities = activities.filter { $0.id != record.id }
        updatedActivities.insert(record, at: 0)
        activities = Array(updatedActivities.prefix(20))
    }

    private func refreshKnownFiles() {
        knownFilePaths = Set(
            currentTopLevelFiles()
                .filter { !IncompleteDownloadFilter.shouldIgnore($0) }
                .map(\.path)
        )
    }

    private func resolveFolderAccess() {
        if folderAccess?.didStartAccessing == true {
            folderAccess?.url.stopAccessingSecurityScopedResource()
        }

        folderAccess = FolderAccessResolver.resolve(settings: settings)
    }

    private func restartWatcher(resetKnownFiles: Bool) {
        watcher?.stop()
        watcher = nil
        scanTask?.cancel()

        guard settings.isSortingEnabled else {
            statusMessage = "Sorting is paused."
            return
        }

        guard settings.watchedFolderBookmark != nil else {
            statusMessage = "Choose a folder to start sorting."
            return
        }

        guard fileManager.fileExists(atPath: watchedFolderURL.path) else {
            statusMessage = "Choose a folder to start sorting."
            return
        }

        if resetKnownFiles {
            refreshKnownFiles()
        }

        watcher = FolderWatcher(url: watchedFolderURL) { [weak self] in
            self?.scheduleScan()
        }
        watcher?.start()
        statusMessage = "Watching \(watchedFolderURL.lastPathComponent)."
    }

    private func scanForNewFiles() {
        guard settings.isSortingEnabled else {
            return
        }

        let processableFiles = currentTopLevelFiles()
            .filter { !IncompleteDownloadFilter.shouldIgnore($0) }
        let newFiles = processableFiles.filter { !knownFilePaths.contains($0.path) }

        processableFiles.forEach { knownFilePaths.insert($0.path) }

        guard !newFiles.isEmpty else {
            statusMessage = "Watching \(watchedFolderURL.lastPathComponent)."
            return
        }

        newFiles.forEach { processFile($0) }
    }

    private func resumeWaitingActivities() {
        activities
            .filter { $0.status == .waiting }
            .forEach { activity in
                guard let fileURL = existingFileURL(for: activity) else {
                    if let path = activity.currentPath ?? activity.sourcePath {
                        recordMissing(fileURL: URL(fileURLWithPath: path), activityID: activity.id)
                    }
                    return
                }

                guard let snoozedUntil = activity.snoozedUntil,
                      snoozedUntil > Date()
                else {
                    processFile(fileURL, activityID: activity.id)
                    return
                }

                scheduleSnoozeTask(activityID: activity.id, fileURL: fileURL, snoozedUntil: snoozedUntil)
            }
    }

    private func scheduleAskLater(_ fileURL: URL, destination: DestinationFolder, activityID: UUID?) {
        let recordID = activityID ?? UUID()
        let snoozedUntil = Date().addingTimeInterval(settings.snoozeDelay)
        let record = ActivityRecord(
            id: recordID,
            message: "Asked later for \(fileURL.lastPathComponent).",
            status: .waiting,
            fileName: fileURL.lastPathComponent,
            sourcePath: fileURL.path,
            currentPath: fileURL.path,
            destinationID: destination.id,
            destinationName: destination.name,
            snoozedUntil: snoozedUntil
        )

        upsertActivity(record)
        scheduleSnoozeTask(activityID: recordID, fileURL: fileURL, snoozedUntil: snoozedUntil)
    }

    private func scheduleSnoozeTask(activityID: UUID, fileURL: URL, snoozedUntil: Date) {
        cancelSnooze(for: activityID)
        let delay = max(0, snoozedUntil.timeIntervalSinceNow)

        snoozeTasks[activityID] = Task { [weak self] in
            guard let self else {
                return
            }

            try? await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))

            guard !Task.isCancelled else {
                return
            }

            self.snoozeTasks[activityID] = nil
            self.processFile(fileURL, activityID: activityID)
        }
    }

    private func scheduleScan() {
        scanTask?.cancel()
        statusMessage = "Waiting \(delayLabel) before sorting."

        scanTask = Task { [weak self] in
            guard let self else {
                return
            }

            try? await Task.sleep(nanoseconds: UInt64(self.settings.actionDelay * 1_000_000_000))
            self.scanForNewFiles()
        }
    }

    private func updateLoginItem() {
        do {
            try LoginItemController.setEnabled(settings.runAtLogin)
        } catch {
            statusMessage = "Run at login could not be changed."
        }
    }
}
