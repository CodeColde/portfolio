import { animate, cubicBezier } from "motion";

type Bezier = [number, number, number, number];

// The burst and the name's arrival are CSS (globals.css); this decides when the name leaves.
const DRIFT_OFFSET_PX = 20;
// Caps the hold while hero media loads, measured from when the intro appears.
const LATEST_EXIT_MS = 3200;
const NAME_EXIT_S = 0.55;
const WIPE_S = 0.65;

const EXIT_EASE: Bezier = [0.32, 0, 0.67, 0];
const WIPE_EASE: Bezier = [0.76, 0, 0.24, 1];

const CRITICAL_MEDIA_SELECTOR = "[data-intro-critical]";

interface Options {
  stage: HTMLElement;
  nameArrival: HTMLElement;
  name: HTMLElement;
  onComplete: () => void;
}

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

// Time through a (monotonic) ease at which it reaches `progress`.
const invertEase = (ease: (t: number) => number, progress: number) => {
  let low = 0;
  let high = 1;
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    if (ease(mid) < progress) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
};

// Every burst wave shares one start time: when the intro first painted.
const introElapsedMs = (stage: HTMLElement) => {
  const startTime = stage.getAnimations({ subtree: true })[0]?.startTime;
  return startTime == null ? 0 : Number(document.timeline.currentTime) - Number(startTime);
};

const translateX = (el: HTMLElement) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41;

const isPlaying = (video: HTMLVideoElement) => !video.paused && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;

// Failures count as ready so a broken asset never holds the intro.
const whenShowable = (el: Element) => {
  if (el instanceof HTMLImageElement) {
    return el.decode().catch(() => undefined);
  }
  // No source on phones; and autoplay can sit on a still frame while buffering, so wait for "playing".
  if (el instanceof HTMLVideoElement && el.currentSrc && !isPlaying(el) && !el.error) {
    return new Promise<void>(resolve => {
      el.addEventListener("playing", () => resolve(), { once: true });
      el.addEventListener("error", () => resolve(), { once: true });
    });
  }
  return Promise.resolve();
};

const playSiteIntro = ({ stage, nameArrival, name, onComplete }: Options) => {
  let cancelled = false;
  let animations: ReturnType<typeof animate>[] = [];

  const hasDrifted = async () => {
    do {
      await nextFrame();
    } while (!cancelled && translateX(nameArrival) > -DRIFT_OFFSET_PX);
  };

  const isShowable = () => {
    // Skip media that isn't rendered, e.g. the about portrait on phones.
    const media = [...document.querySelectorAll(CRITICAL_MEDIA_SELECTOR)].filter(el => el.getClientRects().length);
    return Promise.all([document.fonts.ready, ...media.map(whenShowable)]);
  };

  const exit = () => {
    for (const animation of nameArrival.getAnimations()) {
      animation.pause();
    }
    const from = translateX(nameArrival);

    // Offsets are from the centred position of the name.
    const halfStage = stage.clientWidth / 2;
    const halfName = name.offsetWidth / 2;
    const offscreen = halfStage + halfName;
    const leftEdgeAtScreenEdge = -(halfStage - halfName);
    const exitProgressAtEdge = Math.max(0, (from - leftEdgeAtScreenEdge) / (from + offscreen));
    const wipeStart = NAME_EXIT_S * invertEase(cubicBezier(...EXIT_EASE), exitProgressAtEdge);

    const nameAnimation = animate(
      name,
      { transform: ["translateX(0px)", `translateX(${-offscreen - from}px)`] },
      { duration: NAME_EXIT_S, ease: EXIT_EASE },
    );
    const wipeAnimation = animate(
      stage,
      { transform: ["translateX(0%)", "translateX(-100%)"] },
      { delay: wipeStart, duration: WIPE_S, ease: WIPE_EASE },
    );
    animations = [nameAnimation, wipeAnimation];
    return Promise.all([nameAnimation.finished, wipeAnimation.finished]);
  };

  const run = async () => {
    const deadline = wait(Math.max(0, LATEST_EXIT_MS - introElapsedMs(stage)));
    const ready = (async () => {
      await hasDrifted();
      await isShowable();
    })();
    await Promise.race([ready, deadline]);
    if (cancelled) {
      return;
    }
    await exit();
    if (!cancelled) {
      onComplete();
    }
  };

  void run();

  return () => {
    cancelled = true;
    for (const animation of animations) {
      animation.stop();
    }
  };
};

export default playSiteIntro;
