# Project Brief

Last updated: 2026-05-27

## App Name

SortDock

SortDock is a simple macOS app that watches a folder, sorts new files, and lets the user control where each file type goes.

## Purpose

The app should make download cleanup simple.

Instead of editing scripts or manually moving files, the user should be able to open a small macOS app, choose which folder to watch, create destination folders, assign file types to those folders, and decide whether files should move automatically or ask first.

The current `Download Sort Prompt` Folder Action proves the workflow. This project should turn that idea into a real Mac app with a simple interface and user-controlled settings.

## Core Goals

- Let the user choose the folder being watched, such as `Downloads`.
- Let the user create and manage destination folders.
- Let the user decide where each file type should be sent.
- Let the user choose between asking before moving files or moving them automatically.
- Let the user control how long the app waits before prompting or moving files.
- Let the user enable or disable the `Ask Later` snooze option.
- Support light, dark, and system appearance modes.
- Keep the interface extremely simple.

## Product Principle

KISS: keep it stupid simple.

The app should feel like a small utility, not a dashboard. The user should be able to understand the whole app in a few seconds.

## Target User

The target user downloads files often and wants their Mac to stay organized without building custom automation.

They should not need to know AppleScript, Folder Actions, file extensions, launch agents, or macOS automation internals to use the app.

## MVP Scope

The first version should include:

- A watched folder picker.
- A destination folder list.
- File type routing rules.
- Prompt versus automatic move setting.
- Delay before action setting.
- `Ask Later` setting.
- Theme setting.
- Run at login setting.
- Basic conflict handling when a file already exists.
- A simple status indicator showing whether sorting is active.

## Main Settings

### Watched Folder

The user can choose the folder the app monitors.

Default:

`~/Downloads`

The app should make it clear which folder is currently being watched.

### Destination Folders

The user can create, rename, remove, and choose destination folders.

Examples:

- Images
- PDFs
- Videos
- Audio
- Archives
- Documents
- Data
- Apps
- Projects

The app should not force these names. The user should be able to use their own folder names.

When the user saves a rule for a destination folder that does not exist yet, the app should create that folder automatically.

### File Type Routing

The user can map file types to destination folders.

Example:

| File Type | Destination |
| --- | --- |
| `.pdf` | PDFs |
| `.png`, `.jpg`, `.heic` | Images |
| `.mp4`, `.mov` | Videos |
| `.zip`, `.rar` | Archives |
| `.dmg`, `.pkg` | Apps |

The app should support adding, editing, and removing file type rules.

Unknown file types should use a user-selected default destination or remain in place if no default is set.

### Move Behavior

The user can choose one of two modes:

- Ask before moving files.
- Move files automatically.

In ask mode, the app should show a simple prompt before moving detected files.

In automatic mode, the app should move files based on the saved routing rules without asking.

### Delay Before Action

The user can control how long the app waits before it prompts or moves files.

This matters because downloads often appear as temporary files before they are finished.

The delay should be easy to understand, such as:

- 3 seconds
- 10 seconds
- 30 seconds
- 1 minute
- Custom

### Ask Later

The user can enable or disable the `Ask Later` snooze control.

When enabled, prompts can include `Ask Later`.

When disabled, prompts should only show immediate choices, such as move, choose folder, or leave.

The user should also be able to control the snooze duration.

Example options:

- 5 minutes
- 10 minutes
- 30 minutes
- 1 hour
- Custom

### Appearance

The app should support:

- Light
- Dark
- System

Default:

System

The app should follow normal macOS appearance behavior and not invent a custom visual style unless needed.

### Run At Login

Sorting should run at login by default.

The user should be able to turn this on or off in settings.

## Prompt Behavior

When asking before moving, prompts should be short and obvious.

Prompts should be app dialogs, not notification-only prompts.

For one file:

`Move "example.pdf" to "PDFs"?`

Suggested actions:

- Move
- Choose Folder
- Leave
- Ask Later, if enabled

For multiple files:

`Move 5 new items to their folders?`

Suggested actions:

- Move All
- Review
- Leave All
- Ask Later, if enabled

If the prompt times out, the app should follow the user's saved timeout behavior. The simplest default is to ask again later.

## Automatic Move Behavior

When automatic moving is enabled:

1. The app notices new files in the watched folder.
2. The app waits for the configured delay.
3. The app ignores temporary or incomplete downloads.
4. The app finds matching routing rules.
5. The app moves each file to the correct destination.
6. The app records the action in a simple activity list.

The app should never overwrite existing files.

If a matching file already exists, the app should create a safe name like:

`example (1).pdf`

## Simple UI Structure

The app should support both a menu bar presence and a normal windowed app.

The main experience should use one small window with a very small number of sections.

Suggested structure:

- Status
- Watch Folder
- Rules
- Behavior
- Appearance

The UI should avoid deep menus, large onboarding screens, marketing copy, and complex dashboards.

## Suggested Screens

### Menu Bar

The menu bar item should show simple sorting controls:

- Sorting status.
- Open app.
- Pause or resume sorting.

### Main Window

The main window should show:

- Sorting status: on or off.
- Watched folder.
- A short list of file routing rules.
- A button to add a rule.
- Current behavior mode.

### Rule Editor

The rule editor should let the user choose:

- One or more file extensions.
- Destination folder.

The rule editor should stay small and direct.

### Settings

Settings should include:

- Ask or auto move.
- Delay before action.
- Ask Later enabled or disabled.
- Ask Later snooze duration.
- Theme.
- Run at login enabled or disabled.

## Data The App Needs To Store

The app should store user preferences locally.

Settings:

- Watched folder path.
- Destination folders.
- File type routing rules.
- Default destination for unknown files.
- Ask before moving or auto move.
- Delay before action.
- Ask Later enabled or disabled.
- Ask Later duration.
- Theme preference.
- Run at login preference.

Activity history can be simple and limited.

Examples:

- Moved `example.pdf` to `PDFs`.
- Left `screenshot.png` in `Downloads`.
- Asked later for 3 files.

## Important macOS Behavior

The app should request only the permissions it needs.

Likely permissions:

- Access to the watched folder.
- Access to destination folders.
- Permission to run in the background or at login.

The app should explain permissions in plain language.

## Non-Goals For MVP

The first version should not include:

- Cloud sync.
- Accounts.
- Sharing rules between users.
- Complex automation scripting.
- Regex-based rule builders.
- Full file manager features.
- Analytics dashboards.
- Multi-step workflows.

## Success Criteria

The app is successful when a user can:

1. Open the app.
2. Pick a folder to watch.
3. Create or choose destination folders.
4. Assign file types to those folders.
5. Choose ask mode or automatic mode.
6. Set the delay before action.
7. Enable or disable `Ask Later`.
8. Choose light, dark, or system theme.
9. Control whether sorting runs at login.
10. Save a rule and have the needed destination folder created automatically.
11. Trust that new files are moved correctly without surprise behavior.

## Product Decisions

- The app name is SortDock.
- The app should support both menu bar and windowed use.
- Prompts should be app dialogs.
- Sorting should run at login by default.
- The user should be able to control run at login in settings.
- Destination folders should be created automatically when the user saves a rule.
