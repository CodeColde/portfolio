"use client";
import { useLenis } from "../contexts/LenisContext";

interface Props {
  data: {
    id: string;
    label: string;
  }[];
}

const CaseQuickBrowse = ({ data }: Props) => {
  const { lenis } = useLenis();

  const handleClick = (caseId: string) => {
    const target = document.getElementById(caseId);
    if (!lenis) {
      console.error("no lenis not found");
      return;
    }

    if (!target) {
      console.error(`Element with id ${caseId} not found`);
      return;
    }

    lenis.scrollTo(target, {
      offset: 0,
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // easeInOutQuad
    });
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(id);
    }
  }

  return (
    <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50 flex flex-col">
      {data.map(({id, label}, index) => (
        <div
          key={id}
          className={containerClasses}
          onClick={() => handleClick(id)}
          onKeyDown={(e) => onKeyPress(e, id)}
        >
          <button
            key={id}
            data-id={id}
            onClick={() => handleClick(id)}
            aria-label={'Scroll to case ' + (index + 1)}
            type="button"
            className={buttonClasses}
          >
            <span className="sr-only">Scroll to case {label}</span>
          </button>
          <p
            className={labelClasses}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  )
};

export default CaseQuickBrowse;

const containerClasses = `
  flex
  items-center
  hover:[&>p]:opacity-100
  hover:[&>p]:pl-3
  hover:[&>button]:bg-red-500
  hover:[&>button]:w-4
  hover:[&>button]:h-4
  hover:[&>button]:my-1
  hover:[&>button]:-ml-1
`;

const buttonClasses = `
  cursor-pointer
  h-2
  w-2
  my-2
  rounded-full
  transition-[height,width,background-color,margin]
  duration-200
  ease-in-out
  bg-white
`;

const labelClasses = `
  text-white
  font-light
  text-md
  mt-[2px]
  opacity-0
  transition-[opacity,padding]
  duration-200
  ease-in-out
  cursor-pointer
`;