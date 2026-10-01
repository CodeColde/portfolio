"use client";
import { useServerInsertedHTML } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import playSiteIntro from "../utils/playSiteIntro";
import { siteIntroGateScript } from "../utils/siteIntroGate";

// The nav's page colours ripple out, then purple fills the screen.
const WAVE_COLORS = ["text-red-800", "text-yellow-800", "text-blue-800", "text-purple-800"];
const PURPLE_DELAY_MS = 260;
const WAVES = WAVE_COLORS.map((color, index) => ({
  color,
  delayMs: Math.round((PURPLE_DELAY_MS * index) / (WAVE_COLORS.length - 1)),
}));
const NAME_DELAY_MS = PURPLE_DELAY_MS + 170;

// html[data-intro] is set by the gate script and is the single source of truth.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-intro"] });
  return () => observer.disconnect();
};
const getSnapshot = () => document.documentElement.dataset.intro !== undefined;
const getServerSnapshot = () => true;

const blockScroll = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
};

const SiteIntro = () => {
  const isActive = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nameArrivalRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const isGateInserted = useRef(false);

  // Server-only, so it runs before first paint and React never re-creates it (which wouldn't execute).
  useServerInsertedHTML(() => {
    if (isGateInserted.current) {
      return null;
    }
    isGateInserted.current = true;
    // biome-ignore lint/security/noDangerouslySetInnerHtml: static script that must run before first paint
    return <script dangerouslySetInnerHTML={{ __html: siteIntroGateScript }} />;
  });

  useEffect(() => {
    const root = document.documentElement;
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    const nameArrival = nameArrivalRef.current;
    const name = nameRef.current;
    if (!isActive || !overlay || !stage || !nameArrival || !name || root.dataset.intro === undefined) {
      return;
    }

    const finish = () => {
      delete root.dataset.intro;
    };

    // Hydration took so long the CSS bail-out already hid the overlay.
    const { opacity, visibility } = getComputedStyle(overlay);
    if (visibility === "hidden" || Number(opacity) < 1) {
      finish();
      return;
    }

    root.dataset.intro = "running";
    // Swallow scrolling before Lenis (on window) sees it, so the reveal lands where the visitor arrived.
    overlay.addEventListener("wheel", blockScroll, { passive: false });
    overlay.addEventListener("touchmove", blockScroll, { passive: false });
    const cancel = playSiteIntro({ stage, nameArrival, name, onComplete: finish });

    return () => {
      cancel();
      overlay.removeEventListener("wheel", blockScroll);
      overlay.removeEventListener("touchmove", blockScroll);
    };
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <div ref={overlayRef} aria-hidden className="site-intro fixed inset-0 z-1000 overflow-hidden pointer-events-none">
      <div ref={stageRef} className="absolute inset-0 overflow-hidden pointer-events-auto">
        {WAVES.map(({ color, delayMs }) => (
          <div
            key={color}
            className={`absolute top-1/2 left-1/2 size-[200vmax] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,currentColor_74%,transparent)] animate-intro-wave ${color}`}
            style={{ animationDelay: `${delayMs}ms` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={nameArrivalRef}
          className="animate-intro-name-arrive"
          style={{ animationDelay: `${NAME_DELAY_MS}ms` }}
        >
          <p
            ref={nameRef}
            className="whitespace-nowrap text-white text-[max(3rem,14vw)] lg:text-[16vw] leading-none font-bold italic"
          >
            Hayo Friese
          </p>
        </div>
      </div>
    </div>
  );
};

export default SiteIntro;
