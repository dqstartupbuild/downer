import { isRecord } from "./isRecord";

export function readReleaseVersion(release: unknown): string {
  if (!isRecord(release) || typeof release.tag_name !== "string") {
    return "Latest release";
  }

  const version = release.tag_name.trim().slice(0, 32);
  return version || "Latest release";
}
