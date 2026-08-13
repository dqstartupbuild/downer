const localSiteUrl = "http://localhost:3000";

export function resolveSiteUrl(
  configuredUrl?: string,
  vercelProductionUrl?: string,
): string {
  const candidate = configuredUrl ?? vercelProductionUrl;

  if (!candidate) {
    return localSiteUrl;
  }

  const absoluteCandidate = candidate.startsWith("http")
    ? candidate
    : `https://${candidate}`;

  return absoluteCandidate.replace(/\/$/, "");
}
