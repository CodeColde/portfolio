const INTRO_HOST = "hayofriese.dev";
const SEEN_KEY = "hf:intro-seen";

// Serialised into an inline script, so it may only use its arguments and browser globals.
function gate(host: string, seenKey: string) {
  try {
    const forced = new URLSearchParams(location.search).has("intro");
    const onSubdomain = location.hostname.endsWith(`.${host}`) && location.hostname !== `www.${host}`;
    const skip =
      onSubdomain || sessionStorage.getItem(seenKey) !== null || matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip && !forced) {
      return;
    }
    sessionStorage.setItem(seenKey, "1");
    document.documentElement.dataset.intro = "pending";
  } catch {
    // Storage is blocked: skip the intro rather than replay it on every page load.
  }
}

// Append ?intro to any URL to force a replay.
export const siteIntroGateScript = `(${gate})(${JSON.stringify(INTRO_HOST)},${JSON.stringify(SEEN_KEY)})`;
