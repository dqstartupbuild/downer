export function getGitHubReleaseApiUrl(repository: string): string {
  return `https://api.github.com/repos/${repository}/releases/latest`;
}
