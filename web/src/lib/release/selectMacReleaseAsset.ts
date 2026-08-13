import { isRecord } from "./isRecord";
import type { MacReleaseAsset } from "./MacReleaseAsset";

const supportedAssetExtension = /\.(?:dmg|pkg|zip)$/i;

export function selectMacReleaseAsset(
  release: unknown,
): MacReleaseAsset | null {
  if (!isRecord(release) || !Array.isArray(release.assets)) {
    return null;
  }

  for (const asset of release.assets) {
    if (!isRecord(asset)) {
      continue;
    }

    const name = asset.name;
    const downloadUrl = asset.browser_download_url;

    if (
      typeof name !== "string" ||
      !supportedAssetExtension.test(name) ||
      typeof downloadUrl !== "string"
    ) {
      continue;
    }

    try {
      const parsedUrl = new URL(downloadUrl);
      if (parsedUrl.protocol === "https:") {
        return { downloadUrl: parsedUrl.toString(), name };
      }
    } catch {
      continue;
    }
  }

  return null;
}
