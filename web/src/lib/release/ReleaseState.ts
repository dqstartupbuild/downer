export type ReleaseState =
  | { status: "coming-soon" }
  | {
      status: "available";
      downloadUrl: string;
      version: string;
    };
