import { animate, type MotionValue } from "motion";
import type Lenis from "lenis";
import type { useRouter } from "next/navigation";
import { coverVideoStage } from "./coverVideoStage";

interface AnimateOptions {
  caseItemId: string;
  slug: string;
  router: ReturnType<typeof useRouter>;
  lenis: Lenis | undefined;
  settleParallax?: MotionValue<number>;
  onSettle?: () => void;
  onComplete: () => void;
}

const HERO_HEIGHT = "45vh";
const HERO_MEDIA_OPACITY = 0.7;
const SHRINK_DURATION_S = 0.6;

const EASE: [number, number, number, number] = [0.45, 0, 0.55, 1];
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const scrollWindowTo = (top: number, lenis: Lenis | undefined, duration: number) => {
  if (lenis) {
    return new Promise<void>(resolve => {
      lenis.scrollTo(top, { duration, easing: easeInOut, force: true, lock: true, onComplete: () => resolve() });
    });
  }
  return animate(window.scrollY, top, {
    duration,
    ease: EASE,
    onUpdate: value => window.scrollTo(0, value),
  }).finished.then(() => undefined);
};

async function animateCaseTransition({
  caseItemId,
  slug,
  router,
  lenis,
  settleParallax,
  onSettle,
  onComplete,
}: AnimateOptions) {
  const caseEl = document.getElementById(caseItemId);
  if (!caseEl) {
    return;
  }

  const href = `/${slug}`;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    router.push(href);
    onComplete();
    return;
  }

  const siblings = Array.from(document.querySelectorAll<HTMLElement>("main > section")).filter(
    el => el.id !== caseItemId,
  );
  const absoluteTop = window.scrollY + caseEl.getBoundingClientRect().top;

  lenis?.stop();

  await Promise.all([
    scrollWindowTo(absoluteTop, lenis, 0.4),
    animate(caseEl, { height: "100vh" }, { duration: 0.3, ease: EASE }).finished,
    animate(siblings, { opacity: 0 }, { duration: 0.4, ease: EASE }).finished,
  ]);
  await wait(500);

  for (const el of siblings) {
    el.style.display = "none";
  }
  window.scrollTo(0, 0);

  const layer = caseEl.querySelector<HTMLElement>("[data-cover-layer]");
  const layerStartPct = layer ? (layer.offsetHeight / caseEl.offsetHeight) * 100 : 100;
  const layerStartOpacity = layer ? Number.parseFloat(getComputedStyle(layer).opacity) : HERO_MEDIA_OPACITY;
  const shrink = { duration: SHRINK_DURATION_S, ease: EASE };

  onSettle?.();
  await Promise.all([
    animate(caseEl, { height: HERO_HEIGHT }, shrink).finished,
    animate(0, 1, {
      ...shrink,
      onUpdate: progress => {
        caseEl.style.backgroundColor = `color-mix(in oklab, black ${progress * 100}%, var(--color-gray-500))`;
        if (!layer) {
          return;
        }
        layer.style.height = `${layerStartPct + (100 - layerStartPct) * progress}%`;
        layer.style.opacity = String(layerStartOpacity + (HERO_MEDIA_OPACITY - layerStartOpacity) * progress);
      },
    }).finished,
    settleParallax ? animate(settleParallax, 1, shrink).finished : Promise.resolve(),
  ]);

  lenis?.start();
  lenis?.scrollTo(0, { immediate: true, force: true });

  const video = caseEl.querySelector("video");
  if (video) {
    coverVideoStage.adopt(video, HERO_MEDIA_OPACITY);
  }

  router.push(href);
  onComplete();
}

export default animateCaseTransition;
