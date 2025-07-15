"use client";
import { useState } from "react";
import useSmartBack from "../utils/useSmartBack";
import { usePathname } from "next/navigation";
import Image from "next/image";

const BackButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const isWorkSection = pathname.startsWith("/work");
  const handleBack = useSmartBack(isWorkSection ? "/" : "/blog/");

  const handleClick = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      handleBack();
    }, 500);
  }

  return (
    <div
      className={`${buttonStyles}${isAnimating ? " top-[0%] left-[0%] h-full w-full bg-red-800 rounded-[0px]" : " top-[2%] left-[2%] hover:rounded-[56px]"}`}
      style={{
        transition: "background-color 0.1s ease-in-out, border-radius 0.15s ease-in, top 0.2s ease-in-out, left 0.2s ease-in-out, width 0.4s ease-in-out, height 0.4s ease-in-out",
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer h-full w-full p-[12px]"
      >
        <Image
          src="/back.png"
          alt="Back to my work"
          width={50}
          height={50}
          className={`${isAnimating ? "opacity-0" : "opacity-100"} transition-[opacity] duration-100 ease-in-out`}
        />
        <span className="sr-only">Back</span>
      </button>
    </div>
  );
}
export default BackButton;

const buttonStyles= `
  z-3
  fixed
  h-[56px]
  w-[56px]
  rounded-[0px]
  cursor-pointer
  hover:bg-red-800
`;