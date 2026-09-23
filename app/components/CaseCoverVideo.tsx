"use client";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import useMediaQuery from "../utils/useMediaQuery";
import { coverVideoStage } from "../utils/coverVideoStage";

const DESKTOP_MEDIA_QUERY = "(min-width: 891px)";

interface Props {
  src: string;
  preload?: "auto" | "metadata";
  className?: string;
}

const CaseCoverVideo = ({ src, preload = "metadata", className = "" }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHandoff] = useState(() => coverVideoStage.isActive());
  const [isReady, setIsReady] = useState(isHandoff);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const reduceMotion = useReducedMotion();

  if (!isDesktop || reduceMotion) {
    return null;
  }

  const syncToStage = () => {
    const video = videoRef.current;
    const time = coverVideoStage.currentTime();
    if (!video || time === null || !Number.isFinite(video.duration) || time >= video.duration) {
      return;
    }
    video.currentTime = time;
  };

  const handlePlaying = () => {
    if (isHandoff) {
      coverVideoStage.release();
    }
  };

  return (
    <motion.video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover object-center ${className}`}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      disablePictureInPicture
      aria-hidden
      initial={{ opacity: isHandoff ? 1 : 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{ duration: isHandoff ? 0 : 0.5, ease: "easeOut" }}
      onLoadedMetadata={isHandoff ? syncToStage : undefined}
      onCanPlay={() => setIsReady(true)}
      onPlaying={handlePlaying}
    />
  );
};

export default CaseCoverVideo;
