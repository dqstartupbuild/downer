# SortDock macOS App Implementation

SortDock now lives in the Xcode project at `app/mac/SortDock`.

## What It Does

The app watches a user-selected folder, waits for new files to finish downloading, then routes each file to a destination folder based on extension rules. It can ask before moving or move automatically.

## Main Code

- `SortDockApp.swift` starts the SwiftUI window and menu bar extra.
- `Services/SortDockAppDelegate.swift` owns the shared store and starts watching at app launch, so sorting continues after the main window closes.
- `State/SortDockStore.swift` owns settings, rules, activity, folder watching, prompts, and move flow.
- `Models/` contains focused Codable models for settings, destinations, rules, and activity.
- `Services/` contains folder access, file watching, moving, conflict handling, login item control, and persistence.
- `Views/` contains one focused SwiftUI component per file.

## Main Window Layout

The main window keeps the status strip and latest activity line fixed. The two-column control area scrolls vertically, so routing rules, behavior controls, and appearance controls remain reachable when the window is compact or when the user has many folders and rules.

## Folder Access

The app is sandboxed. When the user picks a watch folder, SortDock stores a security-scoped app bookmark so it can keep watching that folder across launches.

## File Moving

Destination folders are created inside the watched folder. Existing files are never overwritten; SortDock chooses a safe name such as `example (1).pdf`.

## Build

Build from the repo root:

```sh
xcodebuild -project app/mac/SortDock/SortDock.xcodeproj -scheme SortDock -configuration Debug -destination 'platform=macOS' build
```
