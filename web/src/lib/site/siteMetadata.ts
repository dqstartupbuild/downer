import type { Metadata } from "next";

import { siteUrl } from "./siteUrl";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SortDock | Keep Downloads clean",
    template: "%s | SortDock",
  },
  description:
    "SortDock sorts new Mac downloads into the folders you choose. Ask first or let it move files automatically.",
  applicationName: "SortDock",
  keywords: [
    "Downloads organizer for Mac",
    "Mac file organizer",
    "automatic file sorting",
    "Downloads folder cleanup",
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
      "Choose the folders. Set a few rules. SortDock puts new Mac downloads where they belong.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SortDock",
    description: "Keep Downloads clean without babysitting every file.",
    images: ["/opengraph-image"],
  },
};
