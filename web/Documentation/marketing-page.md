# SortDock Marketing Page

Last updated: 2026-05-27

## Purpose

The web marketing page presents SortDock as a compact macOS utility for keeping Downloads clean. The page is static, fast to scan, and focused on one idea: new files can move to the right folders while the user stays in control.

## Source References

- `design-web.md`
- `project-brief.md`
- `coding-guidelines.md`
- `AGENTS.md`

## Implementation

The marketing page replaces the default Create T3 App home page at `web/src/app/page.tsx`. It stays in the Next.js App Router and uses server components by default. The page does not call tRPC because the current marketing experience has no dynamic data needs.

The layout metadata and fonts live in `web/src/app/layout.tsx`. The page uses `Fraunces` for display text and `IBM Plex Sans` for body text, matching the web design direction.

Brand icons are served from:

- `web/public/brand/icon.png`
- `web/public/brand/icon-dark.png`
- `web/public/brand/icon-glass.png`

Design tokens and base motion live in `web/src/styles/globals.css`. All page colors are expressed through CSS variables so light and dark appearances can share the same component markup.

## File Tree

```text
web/src/app/page.tsx
web/src/app/layout.tsx
web/src/styles/globals.css
web/src/app/_components/marketing/MarketingPage.tsx
web/src/app/_components/marketing/MarketingNav.tsx
web/src/app/_components/marketing/HeroSection.tsx
web/src/app/_components/marketing/HeroProductImage.tsx
web/src/app/_components/marketing/DownloadRail.tsx
web/src/app/_components/marketing/LandingStripSection.tsx
web/src/app/_components/marketing/BehaviorComparison.tsx
web/src/app/_components/marketing/RulesSection.tsx
web/src/app/_components/marketing/PrivacyProofSection.tsx
web/src/app/_components/marketing/MacFitSection.tsx
web/src/app/_components/marketing/FinalCtaSection.tsx
web/src/app/_components/marketing/MarketingFooter.tsx
web/src/app/_components/marketing/ProductSlice.tsx
web/src/app/_components/marketing/ProofPointRow.tsx
```

## Behavior

- The hero leads with the SortDock name, direct value copy, and an image-led product environment.
- The routing rail appears in the hero, landing strip, and rules sections.
- Ask First, Auto Move, delay, Ask Later, local preferences, no accounts, no cloud sync, and conflict-safe naming are all represented in plain copy.
- Below-fold product slices use lightweight HTML and CSS mockups instead of a heavy animation or screenshot library.
- Motion is limited to entrance and rail-draw effects and respects `prefers-reduced-motion`.

## Maintenance Notes

When a packaged Mac download exists, update the `Download for Mac` links in `HeroSection.tsx` and `FinalCtaSection.tsx` to point to the real artifact.

Run from `web/` after page changes:

```sh
npm run typecheck
npm run build
```
