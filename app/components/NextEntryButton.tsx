"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, FAST_S, MOVE_S } from "../constants/motion";
import { usePageTransition } from "../contexts/PageTransitionContext";

interface Props {
  href: string;
  title: string;
  label: string;
  bgClass: string;
}

interface Origin {
  top: number;
  left: number;
  width: number;
  height: number;
  viewportWidth: number;
  viewportHeight: number;
}

const FILL_RADIUS_PX = 32;

const NextEntryButton = ({ href, title, label, bgClass }: Props) => {
  const router = useRouter();
  const { cover } = usePageTransition();
  const reduceMotion = useReducedMotion();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [isLeaving, setIsLeaving] = useState(false);
  const [origin, setOrigin] = useState<Origin | null>(null);

  useEffect(
    () => () => {
      for (const timer of timers.current) {
        clearTimeout(timer);
      }
    },
    [],
  );

  const navigate = () => {
    cover(bgClass);
    router.push(href);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLeaving) {
      return;
    }

    setIsLeaving(true);

    if (reduceMotion) {
      navigate();
      return;
    }

    timers.current.push(
      setTimeout(() => {
        const rect = linkRef.current?.getBoundingClientRect();
        if (!rect) {
          navigate();
          return;
        }

        setOrigin({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
        });

        timers.current.push(setTimeout(navigate, MOVE_S * 1000));
      }, FAST_S * 1000),
    );
  };

  return (
    <div className={wrapperClasses}>
      <span className={`${eyebrowClasses} ${isLeaving ? "opacity-0" : "opacity-60"}`}>{label}</span>
      <Link
        ref={linkRef}
        href={href}
        prefetch
        onClick={handleClick}
        aria-label={`${label}: ${title}`}
        className={`${linkClasses} ${isLeaving ? "border-transparent" : "border-black hover:text-white"}`}
      >
        <span aria-hidden className={`${fillClasses} ${bgClass} ${isLeaving ? activeFillClasses : hoverFillClasses}`} />
        <span className={`${labelClasses} ${isLeaving ? "opacity-0" : "opacity-100"}`}>{title}</span>
      </Link>
      {origin && (
        <motion.div
          aria-hidden
          className={`fixed z-4 pointer-events-none ${bgClass}`}
          initial={{
            top: origin.top,
            left: origin.left,
            width: origin.width,
            height: origin.height,
            borderRadius: FILL_RADIUS_PX,
          }}
          animate={{
            top: 0,
            left: 0,
            width: origin.viewportWidth,
            height: origin.viewportHeight,
            borderRadius: 0,
          }}
          transition={{ duration: MOVE_S, ease: EASE }}
        />
      )}
    </div>
  );
};

export default NextEntryButton;

const wrapperClasses = `
  mt-24
  max-md:mt-20
  flex
  flex-col
  items-center
`;

const eyebrowClasses = `
  mb-4
  text-xs
  max-sm:text-[10px]
  uppercase
  tracking-[0.2em]
  transition-opacity
  duration-(--motion-fast)
  ease-in-out
`;

const linkClasses = `
  group
  relative
  border-2
  max-sm:border
  px-6
  py-3
  max-md:px-5
  max-md:py-2
  font-bold
  rounded-4xl
  text-md
  max-md:text-sm
  max-sm:text-xs
  uppercase
  inline-block
  overflow-hidden
  transition-[color,border-color]
  duration-(--motion-fast)
  ease-in-out
`;

const fillClasses = `
  absolute
  left-0
  right-0
  rounded-4xl
  transition-[opacity,top,bottom]
  ease-in-out
`;

const hoverFillClasses = `
  duration-(--motion-fast)
  top-1/2
  bottom-1/2
  opacity-0
  group-hover:top-0
  group-hover:bottom-0
  group-hover:opacity-100
  group-focus-visible:top-0
  group-focus-visible:bottom-0
  group-focus-visible:opacity-100
`;

const activeFillClasses = `
  duration-(--motion-fast)
  top-0
  bottom-0
  opacity-100
`;

const labelClasses = `
  relative
  z-1
  transition-opacity
  duration-(--motion-fast)
  ease-in-out
`;
