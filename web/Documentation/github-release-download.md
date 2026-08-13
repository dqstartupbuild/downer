# GitHub Release Download State

Last updated: 2026-08-13

## Purpose

The marketing page must not show a dead download button before SortDock ships.
It should switch from `Coming soon` to a real Mac download automatically when a
public release is ready.

## Behavior

- The home page asks GitHub for the latest published release on the server.
- SortDock stays in the non-interactive `Coming soon` state when there is no
  release, GitHub cannot be reached, or the release has no supported Mac asset.
- A release becomes downloadable only when its asset list contains a `.dmg`,
  `.pkg`, or `.zip` file with a secure URL.
- The first supported asset becomes the direct download used by the navigation,
  hero, and final action.
- Next.js caches the GitHub response for 15 minutes. The website therefore
  updates shortly after a release is published without checking GitHub on every
  visit or requiring another website deployment.
- GitHub's `releases/latest` endpoint excludes drafts and prereleases.

## Configuration

The default repository is `dqstartupbuild/downer`. It can be changed with:

```text
SORTDOCK_GITHUB_REPOSITORY=owner/repository
```

Public GitHub API access requires no secret. If rate limits become a problem,
set `GITHUB_RELEASE_TOKEN` to a fine-grained, read-only token in Vercel. The token
is server-only and must never use a `NEXT_PUBLIC_` prefix.

## Relevant Code

```text
web/src/lib/release/ReleaseState.ts
web/src/lib/release/MacReleaseAsset.ts
web/src/lib/release/isRecord.ts
web/src/lib/release/selectMacReleaseAsset.ts
web/src/lib/release/readReleaseVersion.ts
web/src/lib/release/getGitHubReleaseApiUrl.ts
web/src/lib/release/getReleaseState.ts
web/src/app/_components/marketing/ReleaseAction.tsx
web/src/app/page.tsx
```

## Release Steps

1. Build, sign, and notarize the Mac app.
2. Create a non-draft GitHub release in `dqstartupbuild/downer`.
3. Attach the distributable `.dmg`, `.pkg`, or `.zip` file to that release.
4. Publish the release.
5. Allow up to 15 minutes for the cached website state to refresh.

GitHub's automatically generated source archives do not appear in the release
asset list and therefore cannot accidentally activate the download action.

## Verification

Vitest covers a valid Mac asset, a missing release, a release without a Mac
asset, malformed data, unsafe URLs, and network failure. Browser verification
confirms that the current no-release state is visible and is not rendered as a
clickable download control.
