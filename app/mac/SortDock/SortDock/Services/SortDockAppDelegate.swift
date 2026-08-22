import AppKit

final class SortDockAppDelegate: NSObject, NSApplicationDelegate {
    let store = SortDockStore()
    let presentation = AppPresentationCoordinator()
    private var windowObserver: NSObjectProtocol?

    func applicationDidFinishLaunching(_ notification: Notification) {
        presentation.beginLaunch(needsOnboarding: store.needsOnboarding)
        store.start()
        let presentation = presentation
        windowObserver = NotificationCenter.default.addObserver(
            forName: NSWindow.willCloseNotification,
            object: nil,
            queue: .main
        ) { notification in
            guard let window = notification.object as? NSWindow,
                  window.title == "SortDock"
            else {
                return
            }
            Task { @MainActor in presentation.returnToMenuBar() }
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        ProcessInfo.processInfo.environment["XCTestConfigurationFilePath"] != nil
    }

    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        presentation.showFullApp()
        return true
    }
}
