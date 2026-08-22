# Submission report

Status: build 1.0 (3) uploaded and processing; listing configured in App Store Connect; screenshot changes left to the owner; not submitted for review.

## Source and product

- Branch: `main`; starting/current HEAD: `c847a249d59071e46680550e0900410bc455bdf9`.
- Final state: release work remains uncommitted; existing work was preserved.
- Added versioned onboarding, explicit Dock/menu-bar presentation state, FIFO prompt handling, privacy manifest, legal/support pages, and the App Store package.
- Security-scoped bookmarks, keyword precedence, file-type fallback, and conflict-safe naming remain in place.

## Testing

- Debug build, Release generic build, Release analyze, website checks, and metadata validation: passed.
- Unit tests: passed, 2 tests in 1 suite (keyword precedence and prompt FIFO/exact-once).
- UI tests: no UI-test target exists. The broader requested unit/UI matrix remains incomplete.
- The Mac-only screenshot editor production build passed.
- Screenshot validation passed for all five 2880 x 1800 JPEGs. Each is readable, opaque, and uses the actual SortDock development UI.
- Personal path and activity text were replaced with generic fixture text before export. The final images contain `/Demo/Downloads` and `No files moved yet.` rather than personal data.
- Icon validation passed for all 48 generated web/release-package PNGs and all 10 legacy Mac icon slots. Every file has the expected dimensions, is readable PNG, and has no alpha channel.
- The Next.js production build passed with webpack. Generated metadata contains the dark favicon media queries, and the generated web manifest contains the standard and maskable glass install icons.
- The final universal Release build and unit tests passed after the adaptive icon was added. `assetutil` verified Aqua, Dark Aqua, and tintable appearances in the built `Assets.car`; the bundle contains `AppIcon.icns`.

## Release configuration

- Bundle ID: `com.followusai.SortDock` (registered in Apple Developer on 2026-08-21)
- Team: `525ZD896G4`; version/build: `1.0 (3)`; deployment: macOS 14.0
- Architectures: Intel and Apple Silicon
- Sandbox: enabled with app-scope bookmarks and user-selected read/write folders
- Privacy manifest: bundled; UserDefaults reason `CA92.1`; tracking false
- Export compliance: `ITSAppUsesNonExemptEncryption=NO`
- Copyright: `© 2026 FollowUs AI LLC`
- App icon: Icon Composer source with Default, Dark, and tintable Mono/glass appearances; legacy Mac sizes remain populated for earlier supported systems. Build 3 replaces the unwanted automatic blue fill with System Light for Default and System Dark for Dark while leaving Mono system-rendered.

## Website

- Production: `https://sortdock.vercel.app`
- Support: `https://sortdock.vercel.app/support`
- Privacy: `https://sortdock.vercel.app/privacy`
- Terms: `https://sortdock.vercel.app/terms`
- Acknowledgements: `https://sortdock.vercel.app/acknowledgements`
- All were verified in Safari over HTTPS on 2026-08-21.

## App Store Connect

- Apple App ID: `6804060639`; macOS version 1.0 is Prepare for Submission.
- Name: `SortDock: Downloads Organizer`; subtitle/category/copyright/content rights saved.
- Age questionnaire completed; Apple calculated 4+.
- Privacy-policy URL saved; “Data Not Collected” response published.
- Version metadata, review contact, and review notes saved.
- Build 1.0 (3), containing the neutral Default adaptive icon, uploaded successfully at about 21:18 and is processing. Build 2 remains selected until build 3 is available.
- Screenshots: five stylized Mac screenshots from the earlier upload are currently present. No screenshot was added, replaced, reordered, or deleted after the owner chose to manage them manually. Pricing and territories were not changed.

## Screenshots

- Count: 5
- Dimensions: 2880 x 1800 each
- Format: JPEG
- Alpha: none
- Source: actual development UI composed in `AppStore/screenshot-editor`, the app-store-screenshots skill editor adapted to Mac-only use
- Final path: `app/mac/SortDock/AppStore/screenshots/final/2880x1800`
- App Store Connect: 5 of 10 screenshots currently present; five matching validated files are ready locally for the owner to keep or replace manually

## Archive and upload

- Archive: `/Users/starship/Library/Developer/Xcode/Archives/2026-08-21/SortDock 8-21-26, 9.16 PM.xcarchive`
- Created 2026-08-21 21:16 America/Detroit; Intel and Apple Silicon; version 1.0 build 3.
- Xcode validation passed all checks. App Store Connect upload succeeded at about 21:18; Organizer shows “Uploaded to Apple.” No delivery warning was shown during upload.

## Remaining blockers

1. Implement the remainder of the requested unit-test matrix and stable UI-test target.
2. The owner must decide price and territory availability; no value was guessed.
3. Wait for build 1.0 (3) to finish processing, select it, and verify the version page after reload.
4. The owner may keep or replace the five screenshots currently present using `AppStore/screenshots/final/2880x1800`.

`Add for Review`, `Submit for Review`, and release controls were not used.
