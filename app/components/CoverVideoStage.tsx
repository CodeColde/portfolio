"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { coverVideoStage } from "../utils/coverVideoStage";

const CoverVideoStage = () => {
  const pathname = usePathname();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    coverVideoStage.attach(stageRef.current);
    return () => coverVideoStage.attach(null);
  }, []);

  useEffect(() => {
    coverVideoStage.onRouteChange();
    void pathname;
  }, [pathname]);

  return (
    <div
      ref={stageRef}
      aria-hidden
      className="absolute top-0 left-0 w-full h-[45vh] overflow-hidden pointer-events-none z-1 hidden"
    />
  );
};

export default CoverVideoStage;
