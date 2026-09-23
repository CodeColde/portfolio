import { animate } from "motion";

const STUCK_FALLBACK_MS = 8000;
const FADE_OUT_S = 0.25;

let container: HTMLDivElement | null = null;
let adopted: HTMLVideoElement | null = null;
let fallback: ReturnType<typeof setTimeout> | undefined;
let routeChangesSinceAdopt = 0;

const cleanup = () => {
  adopted?.remove();
  adopted = null;
  if (container) {
    container.style.display = "none";
    container.style.opacity = "";
  }
};

const release = () => {
  if (!adopted) {
    return;
  }
  clearTimeout(fallback);
  const stage = container;
  if (!stage) {
    cleanup();
    return;
  }
  animate(stage, { opacity: 0 }, { duration: FADE_OUT_S, ease: "easeOut" }).finished.then(cleanup);
};

export const coverVideoStage = {
  attach(el: HTMLDivElement | null) {
    container = el;
  },

  adopt(video: HTMLVideoElement, opacity: number): boolean {
    if (!container || adopted) {
      return false;
    }
    const wasPlaying = !video.paused;
    const stage = container as HTMLDivElement & { moveBefore?: (node: Node, child: Node | null) => void };
    if (typeof stage.moveBefore === "function") {
      stage.moveBefore(video, null);
    } else {
      stage.appendChild(video);
    }
    if (wasPlaying && video.paused) {
      void video.play().catch(() => {});
    }
    container.style.opacity = String(opacity);
    container.style.display = "block";
    adopted = video;
    routeChangesSinceAdopt = 0;
    fallback = setTimeout(release, STUCK_FALLBACK_MS);
    return true;
  },

  isActive() {
    return adopted !== null;
  },

  currentTime(): number | null {
    return adopted?.currentTime ?? null;
  },

  release,

  onRouteChange() {
    if (!adopted) {
      return;
    }
    routeChangesSinceAdopt += 1;
    if (routeChangesSinceAdopt > 1) {
      release();
    }
  },
};
