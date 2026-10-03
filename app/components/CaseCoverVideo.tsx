"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BASE_S } from "../constants/motion";
import { coverVideoStage } from "../utils/coverVideoStage";
import whenMediaShowable from "../utils/whenMediaShowable";

const VIDEO_MEDIA_QUERY = "(min-width: 891px) and (prefers-reduced-motion: no-preference)";
const LOAD_AHEAD_MARGIN = "50% 0px";
const CRITICAL_VIDEO_SELECTOR = "video[data-intro-critical]";
const CRITICAL_VIDEO_WAIT_MS = 4000;

interface Props {
  src: string;
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
    let observer: IntersectionObserver | undefined;
    let isCancelled = false;
    const criticalVideo = document.querySelector(CRITICAL_VIDEO_SELECTOR);
    const criticalReady = criticalVideo ? whenMediaShowable(criticalVideo) : Promise.resolve();
    const fallback = new Promise<void>(resolve => setTimeout(resolve, CRITICAL_VIDEO_WAIT_MS));

    void Promise.race([criticalReady, fallback]).then(() => {
      if (isCancelled) {
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setShouldLoad(true);
          }
        },
        { rootMargin: LOAD_AHEAD_MARGIN },
      );
      observer.observe(video);
    });

    return () => {
      isCancelled = true;
      observer?.disconnect();
    };
  }, [shouldLoad]);

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
      transition={{ duration: isHandoff ? 0 : BASE_S, ease: "easeOut" }}
      onLoadedMetadata={isHandoff ? syncToStage : undefined}
      onPlaying={handlePlaying}
    >
      {shouldLoad && <source src={src} media={VIDEO_MEDIA_QUERY} />}
    </motion.video>
  );
};

export default CaseCoverVideo;
