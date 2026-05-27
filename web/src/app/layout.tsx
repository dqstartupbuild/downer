import "~/styles/globals.css";

import { type Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "SortDock - Keep Downloads clean",
  description:
    "SortDock is a small Mac app that keeps Downloads tidy while you stay in control.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/brand/icon.png" },
  ],
  openGraph: {
    title: "SortDock",
    description:
      "Keep Downloads clean without babysitting every file. Ask first or move automatically.",
  },
};

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
