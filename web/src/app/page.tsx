import { MarketingPage } from "~/app/_components/marketing/MarketingPage";
import { getReleaseState } from "~/lib/release/getReleaseState";

export default async function Home() {
  const releaseState = await getReleaseState();

  return <MarketingPage releaseState={releaseState} />;
}
