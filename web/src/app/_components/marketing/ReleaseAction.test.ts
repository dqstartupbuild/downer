import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ReleaseAction } from "./ReleaseAction";

describe("ReleaseAction", () => {
  it("renders coming soon as a non-interactive status", () => {
    const markup = renderToStaticMarkup(
      createElement(ReleaseAction, {
        placement: "hero",
        releaseState: { status: "coming-soon" },
      }),
    );

    expect(markup).toContain("Coming soon for Mac");
    expect(markup).toContain('role="status"');
    expect(markup).not.toContain("<a");
  });

  it("renders a direct download when a release is available", () => {
    const markup = renderToStaticMarkup(
      createElement(ReleaseAction, {
        placement: "hero",
        releaseState: {
          status: "available",
          version: "v1.0.0",
          downloadUrl:
            "https://github.com/dqstartupbuild/downer/releases/download/v1.0.0/SortDock.dmg",
        },
      }),
    );

    expect(markup).toContain("Download for Mac");
    expect(markup).toContain(
      'href="https://github.com/dqstartupbuild/downer/releases/download/v1.0.0/SortDock.dmg"',
    );
  });
});
