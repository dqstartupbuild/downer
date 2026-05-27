# SortDock App Design

Last updated: 2026-05-27

## Purpose

SortDock is a small macOS utility for keeping a watched folder clean. The app should let a non-technical user understand and control the whole sorting system in a few seconds:

- Is sorting on?
- Which folder is watched?
- Where will each file type go?
- Will SortDock ask first or move automatically?
- How long will it wait before acting?

The interface is functional, not promotional. It should feel like a quiet tool that belongs on the Mac, with one distinctive routing visual that makes the product recognizable.

## Design Direction Summary

**Aesthetic name:** Blue Dock Utility

**Dominant tone:** Industrial / Utilitarian

**Secondary tone:** Native macOS polish

**Conceptual inspiration:** macOS Finder, clean download trays, glossy blue folder icons, compact preference panes, white/light-gray dock surfaces, and graphite dark-mode utilities.

**DFII score:** 14 / 15

| Dimension | Score | Rationale |
| --- | ---: | --- |
| Aesthetic Impact | 4 | The app stays native and simple, but the blue routing rail and folder-dock treatment give it a recognizable signature. |
| Context Fit | 5 | The cool Finder-blue system matches the app icon and suits a tiny macOS sorting app better than a large dashboard. |
| Implementation Feasibility | 5 | The design can be built with standard SwiftUI/AppKit controls and a small custom routing component. |
| Performance Safety | 5 | Static layout, sparse animation, and lightweight visuals keep the app fast. |
| Consistency Risk | 5 | The visual language is narrow enough to maintain across windows, sheets, and prompts. |

## Design Thinking

### Primary action

The app should help users set up reliable file sorting and quickly change rules without touching scripts or automation settings.

### Interface type

Functional. It should prioritize clarity, trust, and fast setup.

### Differentiation anchor

If the logo were removed, SortDock should still be recognizable by the **routing rail**: a slim vertical track where file extension tags visually connect to destination folder rows. It should look like a tiny sorting dock rather than a table or spreadsheet.

### Generic UI avoidance

This avoids generic UI by using a compact blue routing rail and folder-dock composition instead of a dashboard made of large cards, charts, or template settings rows.

## Design System Snapshot

### Typography

Use bundled open-source fonts so the app has identity while still feeling calm.

- **Display:** `Fraunces`
  - Use for the app name, status number, and major section labels only.
  - Keep weights controlled: 500 for headings, 650 for the main status phrase.
- **Body:** `IBM Plex Sans`
  - Use for controls, labels, prompts, and settings.
  - It is clear, compact, and less generic than default SaaS typography.

If a native macOS control forces the system font internally, accept it for that control. Do not fight OS accessibility behavior for the sake of typography.

### Color Tokens

Use semantic tokens rather than hard-coded colors. The app supports Light, Dark, and System appearance.

```css
:root {
  --window: #f7faff;
  --panel: #ffffff;
  --panel-raised: #f1f6ff;

  --ink: #142033;
  --ink-muted: #6b7a90;

  --line: #dce8f7;
  --line-strong: #bfd8ff;

  --accent: #2f7bff;
  --accent-deep: #1554e8;
  --accent-soft: #eaf3ff;
  --accent-glow: #4e9efa;

  --routing-rail: #2f7bff;
  --routing-rail-soft: #bfd8ff;
  --routing-rail-dark: #1554e8;

  --tag-bg: #eaf3ff;
  --tag-border: #bfd8ff;
  --tag-text: #1554e8;

  --button-primary-start: #4e9efa;
  --button-primary-end: #2f6ded;
  --button-primary-pressed: #1554e8;

  --dock: #e8edf3;
  --dock-shadow: rgba(34, 78, 145, 0.16);

  --active: #2ebe73;
  --warning: #f2b84b;
  --danger: #ef5350;
}

[data-theme="dark"] {
  --window: #050718;
  --panel: #0d1324;
  --panel-raised: #151d33;

  --ink: #eaf3ff;
  --ink-muted: #8fa4c1;

  --line: #25314a;
  --line-strong: #344669;

  --accent: #2f6ded;
  --accent-deep: #0733ba;
  --accent-soft: #132c66;
  --accent-glow: #4e9efa;

  --routing-rail: #2f6ded;
  --routing-rail-soft: #4e9efa;
  --routing-rail-dark: #0733ba;

  --tag-bg: #132c66;
  --tag-border: #344669;
  --tag-text: #eaf3ff;

  --button-primary-start: #4e9efa;
  --button-primary-end: #2f6ded;
  --button-primary-pressed: #0733ba;

  --dock: #101522;
  --dock-shadow: rgba(0, 0, 0, 0.42);

  --active: #35d486;
  --warning: #f2b84b;
  --danger: #ff6262;
}
```

The dominant story comes from the icon: electric blue, soft icy blue, white, light gray, graphite, and dark navy. Blue is the brand color. Green is reserved for the tiny active status dot only.

### Brand Assets

Use the repository icon set as the source of truth for color and material direction:

- `assets/brand/icon/icon.png` for light-mode and default product references.
- `assets/brand/icon/icon-dark.png` for dark-mode references.
- `assets/brand/icon/icon-glass.png` for marketing or high-polish contexts where a glossy icon is useful.

The app UI should feel like it belongs with these icons: blue folders, white or light-gray dock surfaces in light mode, and graphite/dark navy tray surfaces in dark mode.

### Color Application Rules

- The routing rail is the strongest branded element and always uses blue.
- Primary buttons use the blue gradient tokens.
- Secondary buttons stay white/light-gray in light mode and graphite in dark mode.
- Extension pills use soft blue backgrounds and blue text.
- Destination folder icons stay blue across all categories.
- Selected destination rows use a thin blue edge and a small blue folder icon, not a filled blue row.
- Green appears only as the tiny active status dot.

### Shape and spacing

- Base spacing unit: `4px`.
- Window padding: `16px`.
- Section gap: `12px`.
- Control height: `28px` for compact controls, `34px` for primary actions.
- Corner radius: `8px` maximum for panels, `6px` for buttons, `999px` only for extension pills.
- Border width: `1px`, with stronger borders reserved for active sorting and selected rows.

### Texture and depth

Use clean dock-surface shading rather than decorative texture. The app can borrow the icon's glossy clarity, but panels should stay readable and utility-like.

Depth should come from tray and folder layers:

- Flat window background.
- Slightly raised rule rows.
- One stronger shadow only for sheets and prompts.

### Motion

Motion should be sparse and purposeful.

- On launch, the status strip and routing rail settle in over `180ms`.
- When sorting turns on, the rail receives a short blue glow and the tiny active dot turns green.
- When a new rule is saved, its extension tags slide into the rail over `140ms`.
- Respect Reduce Motion by replacing movement with opacity changes.

## Main Window

### Size

Default window size: `680 x 520`.

Minimum window size: `620 x 460`.

The app should not feel resizable like a dashboard. Resizing can be allowed, but content should remain compact and centered.

### Layout

```text
+--------------------------------------------------------------+
| SortDock                         Sorting active  [Pause]     |
| Downloads -> 8 rules -> Ask first after 10 sec               |
+-------------------------+------------------------------------+
| WATCH FOLDER            | ROUTING                            |
| ~/Downloads             | .pdf .doc .md      | PDFs          |
| [Change...]             | .png .jpg .heic    | Images        |
|                         | .mp4 .mov          | Videos        |
| DESTINATIONS            | .zip .rar .7z      | Archives      |
| PDFs                    | + Add Rule                         |
| Images                  |                                    |
| Videos                  | BEHAVIOR                           |
| Archives                | Ask before moving  Auto move       |
| Projects                | Wait: 10 sec       Ask Later: On   |
|                         | Theme: System      Run at login: On|
+-------------------------+------------------------------------+
| Last moved: example.pdf to PDFs                              |
+--------------------------------------------------------------+
```

### Composition rules

- The window uses two main columns, not stacked dashboard cards.
- The left column is the folder dock: watched folder and destination folders.
- The right column is the sorting logic: routing rail, behavior, and compact settings.
- The bottom activity line is a single quiet status strip, not a full activity feed.

## Signature Routing Rail

The routing rail is the main visual anchor.

### Appearance

- A narrow vertical blue line sits between extension tags and folder names.
- Extension tags sit on the left of the rail.
- Destination folders sit on the right of the rail.
- The selected row gets a brighter blue node on the rail, like an active file path.
- Unknown file behavior appears at the bottom as a muted "Other files" row.

### Interaction

- Click a rule row to edit it.
- Drag extension tags within a row to reorder them.
- Drag a rule row to reorder the list.
- Hovering a destination folder previews the tags that route there.
- Keyboard users can tab through rows, press Return to edit, and Delete to remove after confirmation.

### Empty state

Use one sentence:

`Add your first rule. Start with PDFs, images, or anything you download often.`

Primary action:

`Add Rule`

## App Sections

### Status Strip

Purpose: tell the user whether sorting is working.

Content:

- App name.
- Active, Paused, or Needs Permission.
- Current watched folder name.
- Rule count.
- Current behavior mode.
- Pause or Resume button.

Copy examples:

- `Sorting active`
- `Paused`
- `Needs folder access`
- `Downloads -> 8 rules -> Ask first after 10 sec`

### Watch Folder

Purpose: show and change the folder being monitored.

Controls:

- Current folder path.
- `Change...` button.
- Permission explanation only when needed.

Permission copy:

`SortDock needs access to Downloads so it can move files you choose.`

Avoid technical terms like security-scoped bookmarks in the UI.

### Destination Folders

Purpose: manage the folder names users can route files into.

Behavior:

- Users can add, rename, remove, and choose destinations.
- Folder names are user-defined.
- When saving a rule to a missing destination, SortDock creates it automatically.

Visual treatment:

- Destination folders look like compact Finder-blue folder rows.
- Use a folder icon from the native symbol set.
- All destination folders stay blue. Do not assign random category colors to PDFs, Images, Videos, Archives, or other folders.
- Selected destination gets a thin blue left edge, not a filled blue background.

### Rules

Purpose: map file extensions to destinations.

Row anatomy:

- Extension tags: `.pdf`, `.png`, `.jpg`
- Destination: `PDFs`
- More menu: edit, duplicate, remove

Rule rows should be scannable and dense. Avoid explanatory text inside every row.

### Behavior

Purpose: choose how SortDock acts when new files arrive.

Controls:

- Segmented control: `Ask First` / `Auto Move`
- Delay selector: `3 sec`, `10 sec`, `30 sec`, `1 min`, `Custom`
- Ask Later toggle.
- Ask Later duration selector when enabled.

Recommended defaults:

- Ask First: on
- Delay: 10 sec
- Ask Later: on
- Ask Later duration: 10 min

### Appearance and Startup

Purpose: keep secondary preferences available without turning the main window into a settings wall.

Controls:

- Theme segmented control: `System`, `Light`, `Dark`
- Toggle: `Run at login`

Keep these in the lower-right behavior area or a compact settings sheet. They should not dominate the main window.

## Rule Editor Sheet

Use a small sheet, not a full page.

Default size: `420 x 260`.

Fields:

- File extensions
- Destination folder
- Preview sentence

Example preview:

`Files ending in .pdf or .docx will move to Documents.`

Actions:

- `Save Rule`
- `Cancel`

Validation:

- Extensions can be entered with or without a leading dot.
- Empty extension field disables save.
- Duplicate extensions show a plain warning:

`PDFs already handles .pdf.`

## Prompt Dialogs

Prompts should be app dialogs, not notification-only prompts.

### One file

Title:

`Move "example.pdf" to PDFs?`

Supporting text:

`SortDock found this in Downloads.`

Actions:

- `Move`
- `Choose Folder...`
- `Leave`
- `Ask Later` when enabled

### Multiple files

Title:

`Move 5 new items to their folders?`

Supporting text:

`SortDock matched them to your saved rules.`

Actions:

- `Move All`
- `Review`
- `Leave All`
- `Ask Later` when enabled

Batch details should show up to 12 file-to-folder matches in a compact list.

## Menu Bar Design

The menu bar item should feel like a small control surface, not a second app.

Popover width: `300px`.

Content:

- Status: `Sorting active` or `Paused`
- Watched folder: `Downloads`
- Last action: `Moved screenshot.png to Images`
- Button: `Open SortDock`
- Button: `Pause Sorting` or `Resume Sorting`

Do not include the full rule editor in the menu bar popover.

## Activity History

Keep activity deliberately small.

Main window:

- Show only the latest action in the bottom strip.

Optional sheet:

- Last 20 actions.
- Plain sentences.
- No analytics charts.

Examples:

- `Moved example.pdf to PDFs.`
- `Left screenshot.png in Downloads.`
- `Asked later for 3 items.`

## Visual States

### Active

- Status mark is green.
- Routing rail has normal blue accent with one tiny green status dot.
- Pause button is visible.

### Paused

- Status mark is muted.
- Routing rail is gray.
- Resume button is primary.

### Needs Permission

- Status mark is warning gold.
- Show one permission sentence and one action button:

`Give Folder Access`

### Moving Files

- Row-level progress should be subtle.
- Do not show a blocking spinner for quick moves.
- If a move fails, show the failed file row and a plain-language reason.

### Conflict

Use simple copy:

`A file with that name already exists. SortDock will save this one as "example (1).pdf".`

## Accessibility

- All controls must be reachable by keyboard.
- Extension tags need accessible names such as `PDF extension`.
- Rule rows need accessible summaries such as `.pdf moves to PDFs`.
- Status color must never be the only signal; include text.
- Respect Reduce Motion.
- Support Dynamic Type where the native framework allows it.
- Maintain at least WCAG AA contrast for text and controls.

## Implementation Notes For The Future Build

The repo requires atomic code splitting. Keep every component or helper in one focused file.

Suggested SwiftUI file responsibilities:

```text
SortDockApp.swift
MainWindowView.swift
StatusStripView.swift
WatchFolderPanel.swift
DestinationListView.swift
DestinationRowView.swift
RoutingRailView.swift
RoutingRuleRowView.swift
ExtensionTagView.swift
BehaviorSettingsView.swift
AppearanceSettingsView.swift
RuleEditorSheet.swift
MovePromptView.swift
BatchPromptView.swift
MenuBarPopoverView.swift
ActivityStatusLine.swift
DesignTokens.swift
```

Each listed file should have one reason to change. Shared constants belong in a focused token file only when they represent one design concept.

## Acceptance Checklist

- The whole app can be understood in under 10 seconds.
- The main window does not look like a dashboard.
- The routing rail is visible on the default main window.
- Ask First and Auto Move are obvious.
- Delay and Ask Later are easy to find.
- Permissions are explained in plain language.
- Light, Dark, and System appearances all preserve contrast.
- The menu bar popover controls status only.
- The UI has no purple SaaS gradients, decorative blobs, or template card stacks.
