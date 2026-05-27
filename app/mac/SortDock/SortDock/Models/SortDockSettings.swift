import Foundation

struct SortDockSettings: Codable, Equatable {
    var watchedFolderPath: String
    var watchedFolderBookmark: Data?
    var isSortingEnabled: Bool
    var moveBehavior: MoveBehavior
    var delayOption: DelayOption
    var customDelaySeconds: Double
    var askLaterEnabled: Bool
    var snoozeOption: SnoozeOption
    var customSnoozeMinutes: Double
    var appearanceMode: AppearanceMode
    var runAtLogin: Bool
    var defaultDestinationID: UUID?

    init(
        watchedFolderPath: String = SortDockSettings.defaultWatchedFolderPath(),
        watchedFolderBookmark: Data? = nil,
        isSortingEnabled: Bool = true,
        moveBehavior: MoveBehavior = .askFirst,
        delayOption: DelayOption = .tenSeconds,
        customDelaySeconds: Double = 10,
        askLaterEnabled: Bool = true,
        snoozeOption: SnoozeOption = .tenMinutes,
        customSnoozeMinutes: Double = 10,
        appearanceMode: AppearanceMode = .system,
        runAtLogin: Bool = true,
        defaultDestinationID: UUID? = nil
    ) {
        self.watchedFolderPath = watchedFolderPath
        self.watchedFolderBookmark = watchedFolderBookmark
        self.isSortingEnabled = isSortingEnabled
        self.moveBehavior = moveBehavior
        self.delayOption = delayOption
        self.customDelaySeconds = customDelaySeconds
        self.askLaterEnabled = askLaterEnabled
        self.snoozeOption = snoozeOption
        self.customSnoozeMinutes = customSnoozeMinutes
        self.appearanceMode = appearanceMode
        self.runAtLogin = runAtLogin
        self.defaultDestinationID = defaultDestinationID
    }

    var actionDelay: Double {
        delayOption.seconds(customValue: customDelaySeconds)
    }

    var snoozeDelay: Double {
        snoozeOption.seconds(customMinutes: customSnoozeMinutes)
    }

    static func defaultWatchedFolderPath() -> String {
        FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask).first?.path
            ?? NSHomeDirectory() + "/Downloads"
    }
}
