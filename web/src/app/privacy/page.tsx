import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "SortDock privacy information." };

export default function PrivacyPage() {
  return <main className="mx-auto max-w-3xl px-6 py-16 text-[var(--ink)]"><h1 className="font-serif text-5xl">Privacy</h1><section className="mt-8 space-y-5"><p>SortDock processes filenames and files only on your Mac. It stores your selected folder paths, security-scoped bookmarks, rules, preferences, and activity history locally on your Mac.</p><p>SortDock can access only folders you select. It uses security-scoped bookmarks so macOS can restore access to those folders after you reopen the app.</p><p>The native SortDock app has no accounts, analytics, advertising, tracking, cloud sync, or network telemetry. It does not send your files, filenames, rules, or activity history to Follow Us AI.</p><p>You can clear visible activity history from SortDock. Removing SortDock’s local app data removes its stored settings and bookmarks.</p><p>This website may process standard hosting request logs. If you email support, your email provider and ours process the information you include so we can reply.</p><p>Questions: <a className="font-semibold text-[var(--accent-deep)]" href="mailto:dq@followusai.com">dq@followusai.com</a>.</p></section></main>;
}
