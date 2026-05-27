# Download Sort Prompt Folder Action

Last updated: 2026-05-27

## Purpose

This Folder Action watches the `~/Downloads` folder and helps keep new downloads organized.

When new files or folders arrive, it suggests where they should go based on file type or folder name. You can move them automatically, review them one by one, leave individual files alone, or ask the script to remind you later.

## Installed Files

Source script:

`~/Library/Scripts/Folder Action Scripts/Download Sort Prompt.applescript`

Compiled script attached to Downloads:

`~/Library/Scripts/Folder Action Scripts/Download Sort Prompt.scpt`

Folder being watched:

`~/Downloads`

The compiled `.scpt` file is what macOS runs. The `.applescript` file is the editable source.

## How It Is Attached

The script is attached through macOS Folder Actions.

Current registration:

- Folder Actions are enabled.
- The `Downloads` folder has `Download Sort Prompt.scpt` attached.
- The script runs whenever macOS reports that items were added to `~/Downloads`.

## What Happens When Something Is Downloaded

1. macOS notices new items in `~/Downloads`.
2. The Folder Action waits 3 seconds so multiple files downloaded together can be grouped.
3. The script scans only the top level of `~/Downloads`.
4. It ignores hidden files, temporary browser download files, and the existing category folders.
5. It detects all unsorted top-level items.
6. If one item is found, it shows the individual prompt.
7. If multiple items are found, it shows the batch prompt.

## Batch Prompt

When multiple items are detected, the prompt shows a summary like:

`filename.ext -> Suggested Folder`

Buttons:

- `Move All`: moves every detected item to its suggested folder.
- `Review`: shows the individual prompt for each detected item.
- `Ask Later`: leaves the items where they are and schedules the sorter to run again later.

The batch prompt shows up to 12 items, then summarizes the remaining count.

## Individual Prompt

When one item is detected, or when you choose `Review`, the script asks:

`Move "filename.ext" to "Suggested Folder"?`

Buttons:

- `Move`: moves the item to the suggested folder.
- `Choose Folder...`: lets you manually choose a destination.
- `Leave`: leaves the item in Downloads and marks it so the script does not keep prompting for that same item.

If the prompt times out after 120 seconds, the script treats that like `Ask Later`.

## Ask Later

`Ask Later` schedules the compiled script to run again after 10 minutes.

The delay is controlled by this script property:

```applescript
property askLaterDelaySeconds : 600
```

Important behavior:

- `Ask Later` does not permanently ignore files.
- It simply delays the decision.
- If the files are still in the top level of Downloads after 10 minutes, the prompt appears again.
- If the files are moved before then, the later run finds nothing and exits.

## Leave Behavior

The `Leave` button is different from `Ask Later`.

When you choose `Leave`, the script writes an extended attribute to that file or folder:

`com.starship.download-sort-prompt.decision = leave`

That marker tells the script not to prompt for that item again.

To make the script notice a left item again, remove the marker:

```bash
xattr -d com.starship.download-sort-prompt.decision "/path/to/item"
```

## Ignored Items

The script ignores:

- Hidden files, including names that start with `.`
- Browser or app temporary downloads
- Existing top-level category folders
- Items previously marked with `Leave`

Temporary extensions currently ignored:

- `.crdownload`
- `.download`
- `.part`
- `.tmp`
- `.opdownload`
- `.filepart`
- `.icloud`

## Category Folders

These top-level folders are treated as managed category folders:

- `Archives`
- `Audio`
- `Config Files`
- `Data`
- `Developer Keys`
- `Disk Images`
- `Documents`
- `Images`
- `PDFs`
- `Projects`
- `System Files`
- `Videos`

The script does not prompt for these folders themselves.

## File Routing Rules

Video files go to `Videos`:

`.mp4`, `.mov`, `.m4v`, `.avi`, `.mkv`, `.webm`

Audio files go to `Audio`:

`.mp3`, `.wav`, `.m4a`, `.aac`, `.flac`, `.ogg`

Images go to `Images`:

`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.heic`, `.tiff`, `.bmp`, `.svg`

PDFs go to `PDFs`:

`.pdf`

Archives go to `Archives`:

`.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.bz2`, `.xz`

Disk images and installers go to `Disk Images`:

`.dmg`, `.pkg`, `.app`

Documents go to `Documents`:

`.doc`, `.docx`, `.md`, `.txt`, `.rtf`

Data files go to `Data`:

`.csv`, `.tsv`, `.json`, `.xlsx`, `.xls`

Developer keys and certificates go to `Developer Keys`:

`.p8`, `.key`, `.pem`, `.cer`, `.crt`

Config files go to `Config Files`:

`.plist`, `.mobileconfig`, `.xml`, `.yaml`, `.yml`, `.env`

Unknown files default to `Projects`.

## Folder Routing Rules

Folders are routed by name:

- Names containing `app-store`, `appstore`, `browser-store`, or `screenshot` go to `Images/App Store Screenshots`.
- Names containing `carousel` go to `Images/Social Carousels`.
- Names containing `-system`, `layers`, or `asset` go to `Images/Design Assets`.
- Names containing `seo` or starting with `http` go to `Data/SEO Exports`.
- Names containing `audio` or `voice` go to `Audio`.
- Other folders go to `Projects`.

## Name Conflicts

The script does not overwrite existing files.

If the destination already contains a file or folder with the same name, it appends a number:

`example.pdf`

becomes:

`example (1).pdf`

then:

`example (2).pdf`

and so on.

## Editing The Rules

Edit this file:

`~/Library/Scripts/Folder Action Scripts/Download Sort Prompt.applescript`

After editing, recompile it:

```bash
osacompile -o "$HOME/Library/Scripts/Folder Action Scripts/Download Sort Prompt.scpt" "$HOME/Library/Scripts/Folder Action Scripts/Download Sort Prompt.applescript"
```

The Folder Action is already attached to the compiled `.scpt`, so recompiling in place updates the behavior.

## Manually Running The Sorter

You can run the sorter manually:

```bash
osascript "$HOME/Library/Scripts/Folder Action Scripts/Download Sort Prompt.scpt"
```

This scans the top level of `~/Downloads` and shows the same prompt behavior.

## Checking Folder Action Status

Run:

```bash
osascript -e 'set targetFolder to (path to downloads folder as text)' -e 'tell application "System Events" to return {folder actions enabled, enabled of folder action (name of folder targetFolder), name of scripts of folder action (name of folder targetFolder)}'
```

Expected result:

```text
true, true, Download Sort Prompt.scpt
```

## Disabling The Folder Action

To disable all Folder Actions:

```bash
osascript -e 'tell application "System Events" to set folder actions enabled to false'
```

To re-enable them:

```bash
osascript -e 'tell application "System Events" to set folder actions enabled to true'
```

## Removing This Folder Action

To detach only this script from Downloads:

```bash
osascript <<'OSA'
set targetFolder to (path to downloads folder as text)
tell application "System Events"
	set folderName to name of folder targetFolder
	try
		delete script "Download Sort Prompt.scpt" of folder action folderName
	end try
end tell
OSA
```

The script files will still exist after detaching. Delete them manually if you no longer want them:

```bash
rm "$HOME/Library/Scripts/Folder Action Scripts/Download Sort Prompt.applescript"
rm "$HOME/Library/Scripts/Folder Action Scripts/Download Sort Prompt.scpt"
```

## Notes And Limitations

- Folder Actions depend on macOS delivering folder-change events. In normal Downloads usage this works well, but it is still a macOS automation feature rather than a dedicated background service.
- Some apps create temporary files before the final download name appears. The script ignores common temporary extensions.
- `Ask Later` schedules a one-time run 10 minutes later. It is not a full task queue.
- If you choose `Leave`, the item is marked with an extended attribute and will not be prompted again unless that marker is removed.
- If macOS asks for automation permissions, allow them for this workflow to keep working.
