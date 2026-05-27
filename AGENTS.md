# Agent Instructions

## Project
- SortDock is a small SwiftUI macOS utility that watches a folder and routes new files into user-managed destination folders.
- Product rule: KISS. Keep the app compact, native-feeling, and understandable within seconds.
- Source references: `project-brief.md`, `coding-guidelines.md`, `design-app.md`, and `Download Sort Prompt Documentation.md`.

## Build
- Use the Xcode project at `app/mac/SortDock/SortDock.xcodeproj`.
- Build after Swift or asset changes:
```sh
xcodebuild -project app/mac/SortDock/SortDock.xcodeproj -scheme SortDock -configuration Debug -destination 'platform=macOS' build
```
- There is no package manager or file-scoped test command in this repo yet.

## Structure
- App source lives in `app/mac/SortDock/SortDock`.
- Keep files in the nearest focused folder: `Models/`, `Services/`, `State/`, `Views/Components/`, `Views/Main/`, `Views/MenuBar/`, or `Views/Sheets/`.
- Do not add implementation files at the repository root.
- The Xcode project uses a file-system synchronized source group; prefer adding Swift files under the source tree without unnecessary `.pbxproj` churn.
- Keep generated Xcode user state, build products, and local caches out of commits.

## Architecture
- Follow strict Atomic Code Splitting: one file, one clear purpose.
- One SwiftUI component per file; one model, service, helper, or focused type per file unless a type is exclusively coupled to that file's single export.
- Reuse focused abstractions instead of creating duplicate variants for each screen or use case.
- `SortDockStore` owns app state, settings, watching, prompts, activity, and move flow; extract behavior into focused services when it grows.
- Preserve sandbox-aware folder access through security-scoped bookmarks.
- Never overwrite user files; route moves through conflict-safe naming.

## UI And Copy
- Follow `design-app.md`: Blue Dock Utility, compact two-column utility layout, routing rail as the signature visual.
- Prefer native macOS controls and normal macOS appearance behavior for Light, Dark, and System modes.
- User-facing copy must be plain, human, short, and non-technical.
- Green is only for the tiny active status signal; blue is the routing and primary action color.

## Documentation
- Add a focused `.md` file for every new feature or capability.
- Update existing feature docs when behavior changes; keep docs aligned with code.

## Commit Attribution
AI commits MUST include:
```text
Co-Authored-By: (the agent model's name and attribution byline)
```
