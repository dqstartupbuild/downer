import { env } from "~/env";

import { resolveSiteUrl } from "./resolveSiteUrl";

export const siteUrl = resolveSiteUrl(
  env.SITE_URL,
  env.VERCEL_PROJECT_PRODUCTION_URL,
);
