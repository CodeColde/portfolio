import { type RefObject, useEffect, useState } from "react";

const DARK_BACKDROP_SELECTOR = "[data-dark-backdrop]";

const useIsOverDarkBackdrop = (ref: RefObject<HTMLElement | null>) => {
  const [isOverDark, setIsOverDark] = useState(true);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const element = ref.current;
      if (!element) {
        return;
      }

      const { top, left, width, height } = element.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const backdrops = Array.from(document.querySelectorAll(DARK_BACKDROP_SELECTOR));

      setIsOverDark(
        backdrops.some(backdrop => {
          const rect = backdrop.getBoundingClientRect();
          return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
        }),
      );
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [ref]);

  return isOverDark;
};

export default useIsOverDarkBackdrop;
