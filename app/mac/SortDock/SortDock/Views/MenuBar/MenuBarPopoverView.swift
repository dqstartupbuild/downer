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
                openWindow(id: "main")
                NSApp.activate(ignoringOtherApps: true)
            }

            Button("History") {
                store.showHistory()
                openWindow(id: "main")
                NSApp.activate(ignoringOtherApps: true)
            }

            Button(store.settings.isSortingEnabled ? "Pause Sorting" : "Resume Sorting") {
                store.toggleSorting()
            }
        }
        .padding(12)
        .frame(width: 300)
    }
}
