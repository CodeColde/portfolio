import type { ReactNode } from "react"

interface Props {
  children: ReactNode;
  index: number;
  currentSlide: number;
}

const CarouselSlide = ({ currentSlide, index, children }: Props) => {
  return (
    <div
      className="flex w-full transition-transform ease-out duration-500"
      style={{
        transform: `translateX(-${currentSlide * 100}%)`
      }}
      aria-label={`Case number ${index}`}
    >
      <div className={`w-screen h-screen ${currentSlide !== index ? "aria-hidden" : ""}`}>
        {children}
      </div>
    </div>
  )
}

export default CarouselSlide;