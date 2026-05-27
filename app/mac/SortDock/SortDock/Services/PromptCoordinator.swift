import AppKit

final class PromptCoordinator {
    func askForMove(
        fileName: String,
        destinationName: String,
        watchedFolderName: String,
        askLaterEnabled: Bool
    ) -> MovePromptChoice {
        let alert = NSAlert()
        alert.messageText = "Move \"\(fileName)\" to \(destinationName)?"
        alert.informativeText = "SortDock found this in \(watchedFolderName)."
        alert.alertStyle = .informational
        alert.addButton(withTitle: "Move")
        alert.addButton(withTitle: "Choose Folder...")
        alert.addButton(withTitle: "Leave")

        if askLaterEnabled {
            alert.addButton(withTitle: "Ask Later")
        }

        switch alert.runModal() {
        case .alertFirstButtonReturn:
            return .move
        case .alertSecondButtonReturn:
            return .chooseFolder
        case .alertThirdButtonReturn:
            return .leave
        default:
            return askLaterEnabled ? .askLater : .leave
        }
    }

    func chooseFolder() -> URL? {
        let panel = NSOpenPanel()
        panel.allowsMultipleSelection = false
        panel.canChooseDirectories = true
        panel.canChooseFiles = false
        panel.message = "Choose where this file should go."
        panel.prompt = "Choose"

        guard panel.runModal() == .OK else {
            return nil
        }

        return panel.url
    }

    func chooseWatchedFolder() -> URL? {
        let panel = NSOpenPanel()
        panel.allowsMultipleSelection = false
        panel.canChooseDirectories = true
        panel.canChooseFiles = false
        panel.message = "Choose the folder SortDock should watch."
        panel.prompt = "Watch This Folder"

        guard panel.runModal() == .OK else {
            return nil
        }

        return panel.url
    }
}
