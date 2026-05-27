import AppKit

enum DockVisibilityCoordinator {
    static func activate() {
        NSApp.activate(ignoringOtherApps: true)
    }

    static func hideDockIcon() {
        NSApp.setActivationPolicy(.accessory)
    }

    static func showDockIcon() {
        NSApp.setActivationPolicy(.regular)
    }
}
