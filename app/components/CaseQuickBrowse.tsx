"use client";
import { useEffect, useState } from "react";
import { useLenis } from "../contexts/LenisContext";

const ACTIVE_LINE_ROOT_MARGIN = "-50% 0px -50% 0px";

interface Props {
  data: {
    id: string;
    label: string;
  }[];
}

const CaseQuickBrowse = ({ data }: Props) => {
  const lenis = useLenis();
  const [activeId, setActiveId] = useState(data[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: ACTIVE_LINE_ROOT_MARGIN },
    );

    for (const { id } of data) {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    }

    return () => observer.disconnect();
  }, [data]);

  const scrollToCase = (caseId: string) => {
    const target = document.getElementById(caseId);
    if (!target) {
      return;
    }

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => 1 - (1 - t) ** 4,
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="Cases" className="fixed top-1/2 left-4 -translate-y-1/2 z-4 flex flex-col">
      {data.map(({ id, label }) => {
        const isActive = id === activeId;

        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollToCase(id)}
            aria-current={isActive ? "true" : undefined}
            className={itemClasses}
          >
            <span aria-hidden className={`${dotClasses} ${isActive ? activeDotSizeClasses : dotSizeClasses}`} />
            <span className={labelClasses}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default CaseQuickBrowse;

const itemClasses = `
  group
  flex
  items-center
  cursor-pointer
  text-left
`;

const dotSizeClasses = `
  h-2
  w-2
  my-2
`;

const activeDotSizeClasses = `
  h-3
  w-3
  my-1.5
  -ml-0.5
`;

const dotClasses = `
  rounded-full
  bg-white
  transition-[height,width,background-color,margin]
  duration-(--motion-fast)
  ease-in-out
  group-hover:bg-red-500
  group-hover:w-4
  group-hover:h-4
  group-hover:my-1
  group-hover:-ml-1
  group-focus-visible:bg-red-500
  group-focus-visible:w-4
  group-focus-visible:h-4
  group-focus-visible:my-1
  group-focus-visible:-ml-1
`;

const labelClasses = `
  text-white
  font-light
  text-md
  mt-[2px]
  opacity-0
  transition-[opacity,padding]
  duration-(--motion-fast)
  ease-in-out
  group-hover:opacity-100
  group-hover:pl-3
  group-focus-visible:opacity-100
  group-focus-visible:pl-3
`;
