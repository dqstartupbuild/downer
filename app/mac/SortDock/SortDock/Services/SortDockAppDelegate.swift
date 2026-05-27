import AppKit

final class SortDockAppDelegate: NSObject, NSApplicationDelegate {
    let store = SortDockStore()

    func applicationDidFinishLaunching(_ notification: Notification) {
        store.start()
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        false
    }
}
