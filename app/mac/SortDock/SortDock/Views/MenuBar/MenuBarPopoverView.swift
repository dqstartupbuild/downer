import SwiftUI

struct MenuBarPopoverView: View {
    @Environment(\.openWindow) private var openWindow
    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                StatusPillView()
                Spacer()
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(store.watchedFolderURL.lastPathComponent)
                    .font(.headline)
                Text(store.lastActivityText)
                    .font(.footnote)
                    .foregroundStyle(DesignTokens.mutedText)
                    .lineLimit(2)
            }

            Divider()

            Button("Open SortDock") {
                openSortDock()
            }

            Button("History") {
                openSortDock(showingHistory: true)
            }

            Button(store.settings.isSortingEnabled ? "Pause Sorting" : "Resume Sorting") {
                store.toggleSorting()
            }
        }
        .padding(12)
        .frame(width: 300)
    }

    private func openSortDock(showingHistory: Bool = false) {
        DockVisibilityCoordinator.showDockIcon()

        if showingHistory {
            store.showHistory()
        }

        openWindow(id: "main")
        DockVisibilityCoordinator.activate()
    }
}
