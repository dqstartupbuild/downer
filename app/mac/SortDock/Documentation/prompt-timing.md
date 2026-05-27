# Prompt Timing

## What It Does

SortDock waits for the selected delay before it prompts or moves a new file. If the watched folder keeps changing during a download, SortDock resets the pending scan and waits again so the user sees one prompt after the file is ready.

Ask Later uses its own snooze timer. When that timer ends, SortDock brings its prompt forward again so the user can choose what to do.

## Behavior

- New files are scanned only after the configured `Wait` duration.
- Repeated folder events cancel the old pending scan without processing immediately.
- Ask First prompts activate SortDock before showing the dialog.
- If the main window is closed, a prompt can still appear because the watcher is owned by the app lifecycle, not the window.
- After a prompt closes, SortDock hides the Dock icon again when no main window is visible.

## Implementation

- `SortDockStore.scheduleScan()` returns immediately when a pending scan task is canceled.
- `SortDockStore.scheduleSnoozeTask()` keeps Ask Later work alive while the app continues running.
- `PromptCoordinator.askForMove()` restores the regular app activation policy and activates SortDock before showing `NSAlert`.
- `SortDockAppDelegate` starts `SortDockStore` at app launch so watching continues after the main window closes.

## Source References

- `project-brief.md`: the app waits for the configured delay before prompting or moving files.
- `design-app.md`: prompts are app dialogs, not notification-only prompts.
- `coding-guidelines.md`: timing and lifecycle changes are documented with the relevant implementation files.
