import type { useRouter } from "next/navigation";
import gsap from "gsap";
import type Lenis from "lenis";

interface AnimateOptions {
  caseItemId: string;
  slug: string;
  router: ReturnType<typeof useRouter>;
  lenis: Lenis | null;
  onComplete: () => void;
}

function animateCaseTransition({ caseItemId, slug, router, lenis, onComplete }: AnimateOptions) {
  const caseEl = document.getElementById(caseItemId);
  const body = document.body;

  if (!caseEl) {
    return;
  }
  lenis?.stop();
  body.style.overflow = "hidden";

  const scrollTop = window.scrollY;
  const rect = caseEl.getBoundingClientRect();
  const absoluteTop = scrollTop + rect.top;
  const siblings = Array.from(document.querySelectorAll("main > section")).filter(
    (el) => el.id !== caseItemId
  );

  // 🔥 Step 1 & 2: Scroll + expand section simultaneously
  const timeline = gsap.timeline({
    defaults: { ease: "power2.inOut" },
  });

  timeline.to(window, {
    scrollTo: { y: absoluteTop },
    duration: 0.4,
  }, 0); // start at time 0

  timeline.to(caseEl, {
    height: "100vh",
    duration: 0.3
  }, "<"); // also start at time 0

  timeline.to(siblings, {
    opacity: 0,
    duration: 0.4,
  }, "<");

  timeline.to({}, { duration: 0.5 });

  timeline.call(() => {
    const siblings = Array.from(document.querySelectorAll("main > section")).filter(
      (el) => el.id !== caseItemId
    );
    siblings.forEach((el) => el.remove());
  });

  timeline.to(caseEl, {
    height: "45vh",
    duration: 0.6,
    onComplete: () => {
      body.style.overflow = "";
      lenis?.start();
      lenis?.scrollTo(window.scrollY, { immediate: true });
      setTimeout(() => {
        router.push(`/work/${slug}`);
      }, 600);
      onComplete();
    }
  });
}

export default animateCaseTransition;