"use client";
import { animate } from "motion";
import { useRouter } from "next/navigation";
import { type RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BASE_S, EASE, FAST_S, HOLD_S, MOVE_S } from "../constants/motion";
import { useLenis } from "../contexts/LenisContext";
import type { BlogSummaryEntry } from "../types/blog.types";
import BlogPostHeader from "./BlogPostHeader";

interface Props {
  post: BlogSummaryEntry;
  rowRef: RefObject<HTMLElement | null>;
  titleRef: RefObject<HTMLElement | null>;
  excerptRef: RefObject<HTMLElement | null>;
}

// Share of the move spent on each half of the crossfade.
const CROSSFADE_PORTION = 0.4;

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const fadeOut = (elements: HTMLElement[]) => {
  if (elements.length === 0) {
    return Promise.resolve();
  }
  // The list fades in with a forwards-filling CSS animation, which would override the inline opacity.
  for (const el of elements) {
    el.style.animation = "none";
    el.style.opacity = "1";
  }
  return animate(elements, { opacity: 0 }, { duration: FAST_S, ease: EASE }).finished;
};

const lineWidths = (el: HTMLElement) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const lines = new Map<number, number>();
  for (const rect of Array.from(range.getClientRects())) {
    const top = Math.round(rect.top);
    lines.set(top, (lines.get(top) ?? 0) + rect.width);
  }
  return Array.from(lines.values());
};

const hasSameLineBreaks = (from: HTMLElement, to: HTMLElement, scale: number) => {
  const fromLines = lineWidths(from);
  const toLines = lineWidths(to);
  return fromLines.length === toLines.length && fromLines.every((width, i) => Math.abs(width / scale - toLines[i]) < 4);
};

// Moves `to` (its final spot in the overlay header) out from where `from` sits in the list row,
// crossfading with a copy of `from` so differing line wraps blend instead of jumping.
const morph = (from: HTMLElement, to: HTMLElement, layer: HTMLElement) => {
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();
  const scale = Number.parseFloat(getComputedStyle(from).fontSize) / Number.parseFloat(getComputedStyle(to).fontSize);
  const dx = fromRect.left - toRect.left;
  const dy = fromRect.top - toRect.top;

  const ghost = from.cloneNode(true) as HTMLElement;
  Object.assign(ghost.style, {
    position: "absolute",
    top: `${fromRect.top}px`,
    left: `${fromRect.left}px`,
    width: `${fromRect.width}px`,
    margin: "0",
    transformOrigin: "0 0",
  });
  layer.appendChild(ghost);
  to.style.transformOrigin = "0 0";

  // Same line breaks: fade the real element in beneath the ghost, then lift the ghost off, so the text never dips.
  // Different line breaks: fade the ghost out before the real element fades in, so the two never overlap.
  const sameWrap = hasSameLineBreaks(from, to, scale);
  const move = { duration: MOVE_S, ease: EASE };
  const fade = { duration: MOVE_S * CROSSFADE_PORTION, ease: EASE };
  const secondHalf = { ...fade, delay: MOVE_S * CROSSFADE_PORTION };
  return Promise.all([
    animate(to, { x: [dx, 0], y: [dy, 0], scale: [scale, 1] }, move).finished,
    animate(ghost, { x: [0, -dx], y: [0, -dy], scale: [1, 1 / scale] }, move).finished,
    animate(to, { opacity: [0, 1] }, sameWrap ? fade : secondHalf).finished,
    animate(ghost, { opacity: [1, 0] }, sameWrap ? secondHalf : fade).finished,
  ]).then(() => ghost.remove());
};

const BlogPostTransition = ({ post, rowRef, titleRef, excerptRef }: Props) => {
  const router = useRouter();
  const lenis = useLenis();
  const layerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }
    hasStarted.current = true;

    const href = `/blog/${post.slug}`;
    const row = rowRef.current;
    const layer = layerRef.current;
    const backdrop = backdropRef.current;
    const header = headerRef.current;

    if (!row || !layer || !backdrop || !header || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    const run = async () => {
      lenis?.stop();

      const item = row.closest("li");
      const otherItems = Array.from(item?.parentElement?.children ?? []).filter(el => el !== item) as HTMLElement[];
      const pageHeader = document.querySelector<HTMLElement>("main > header");
      await fadeOut(pageHeader ? [...otherItems, pageHeader] : otherItems);

      const rowRect = row.getBoundingClientRect();
      Object.assign(backdrop.style, {
        top: `${rowRect.top}px`,
        left: `${rowRect.left}px`,
        width: `${rowRect.width}px`,
        height: `${rowRect.height}px`,
      });

      const lateReveals = Array.from(header.querySelectorAll<HTMLElement>("[data-post-meta], [data-post-rule]"));
      for (const el of lateReveals) {
        el.style.opacity = "0";
      }

      const pairs: [HTMLElement | null, HTMLElement | null][] = [
        [titleRef.current, header.querySelector<HTMLElement>("[data-post-title]")],
        [excerptRef.current, header.querySelector<HTMLElement>("[data-post-excerpt]")],
      ];
      const morphs = pairs.flatMap(([from, to]) => (from && to ? [morph(from, to, layer)] : []));

      layer.style.opacity = "1";
      await Promise.all([
        animate(
          backdrop,
          { top: 0, left: 0, width: layer.clientWidth, height: layer.clientHeight },
          { duration: MOVE_S, ease: EASE },
        ).finished,
        ...morphs,
      ]);

      // Fully covered: reset the page underneath to the top, where the post page will start.
      backdrop.style.width = "100%";
      const main = document.querySelector("main");
      if (main) {
        main.style.opacity = "0";
      }
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);

      await wait(HOLD_S * 1000);
      await Promise.all([
        animate(backdrop, { height: header.offsetHeight }, { duration: MOVE_S, ease: EASE }).finished,
        lateReveals.length > 0
          ? animate(lateReveals, { opacity: 1 }, { duration: BASE_S, delay: MOVE_S - BASE_S, ease: EASE }).finished
          : Promise.resolve(),
      ]);

      lenis?.start();
      router.push(href);
    };

    run();
  }, [post.slug, router, lenis, rowRef, titleRef, excerptRef]);

  return createPortal(
    <div ref={layerRef} aria-hidden className="fixed inset-0 z-4 pointer-events-none" style={{ opacity: 0 }}>
      <div ref={backdropRef} className="absolute bg-yellow-800" />
      <div ref={headerRef} className="absolute inset-x-0 top-0">
        <BlogPostHeader post={post} isBackdrop={false} />
      </div>
    </div>,
    document.body,
  );
};

export default BlogPostTransition;
