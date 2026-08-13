import type { Metadata } from "next";

import { siteUrl } from "./siteUrl";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SortDock | Keep Downloads clean",
    template: "%s | SortDock",
  },
  description:
    "SortDock sorts new Mac downloads by file type or words in the filename, then moves them to folders you choose.",
  applicationName: "SortDock",
  keywords: [
    "Downloads organizer for Mac",
    "Mac file organizer",
    "automatic file sorting",
    "Downloads folder cleanup",
    "keyword file routing",
  ],
  alternates: { canonical: "/" },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/brand/icon.png" },
  ],
  openGraph: {
    type: "website",
    siteName: "SortDock",
    url: "/",
    title: "Keep Downloads clean without babysitting every file.",
    description:
      "Route Mac downloads by file type or words like invoice and receipt, then send them to folders you choose.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SortDock",
    description: "Sort Mac downloads by file type or words in the filename.",
    images: ["/opengraph-image"],
  },
};
