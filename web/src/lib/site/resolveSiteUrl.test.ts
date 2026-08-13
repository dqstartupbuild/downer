import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "./resolveSiteUrl";

describe("resolveSiteUrl", () => {
  it("prefers the configured public URL", () => {
    expect(
      resolveSiteUrl("https://sortdock.example/", "sortdock.vercel.app"),
    ).toBe("https://sortdock.example");
  });

  it("uses Vercel's production URL when no custom URL exists", () => {
    expect(resolveSiteUrl(undefined, "sortdock.vercel.app")).toBe(
      "https://sortdock.vercel.app",
    );
  });

  it("uses localhost outside Vercel", () => {
    expect(resolveSiteUrl()).toBe("http://localhost:3000");
  });
});
