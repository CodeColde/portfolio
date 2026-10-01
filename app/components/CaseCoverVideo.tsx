"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { coverVideoStage } from "../utils/coverVideoStage";

// The browser picks the source, so phones and reduced-motion visitors never download the video.
const VIDEO_MEDIA_QUERY = "(min-width: 891px) and (prefers-reduced-motion: no-preference)";
// Close enough to buffer while scrolling towards it, far enough not to compete with the first screen.
const LOAD_AHEAD_MARGIN = "50% 0px";

interface Props {
  src: string;
  // Above the fold: loads from the HTML and holds the landing intro until it plays.
  critical?: boolean;
  className?: string;
}

const CaseCoverVideo = ({ src, critical = false, className = "" }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHandoff] = useState(() => coverVideoStage.isActive());
  const [isPlaying, setIsPlaying] = useState(isHandoff);
  const [shouldLoad, setShouldLoad] = useState(critical);

  const handlePlaying = () => {
    setIsPlaying(true);
    if (isHandoff) {
      coverVideoStage.release();
    }
  };

  // A critical video can start playing before hydration, when React isn't listening yet.
  useEffect(() => {
    const video = videoRef.current;
    if (video && !video.paused && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (shouldLoad || !video) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin: LOAD_AHEAD_MARGIN },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad]);

  // Sources are only picked once, so pick again when e.g. the window crosses the desktop breakpoint.
  useEffect(() => {
    const query = window.matchMedia(VIDEO_MEDIA_QUERY);
    const reselect = () => videoRef.current?.load();
    query.addEventListener("change", reselect);
    return () => query.removeEventListener("change", reselect);
  }, []);

  const syncToStage = () => {
    const video = videoRef.current;
    const time = coverVideoStage.currentTime();
    if (!video || time === null || !Number.isFinite(video.duration) || time >= video.duration) {
      return;
    }
    video.currentTime = time;
  };

  return (
    <motion.video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover object-center ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden
      data-intro-critical={critical || undefined}
      initial={{ opacity: isHandoff ? 1 : 0 }}
      animate={{ opacity: isPlaying ? 1 : 0 }}
      transition={{ duration: isHandoff ? 0 : 0.5, ease: "easeOut" }}
      onLoadedMetadata={isHandoff ? syncToStage : undefined}
      onPlaying={handlePlaying}
    >
      {shouldLoad && <source src={src} media={VIDEO_MEDIA_QUERY} />}
    </motion.video>
  );
};

export default CaseCoverVideo;
