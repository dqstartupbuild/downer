import "~/styles/globals.css";

import { siteMetadata } from "~/lib/site/siteMetadata";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
