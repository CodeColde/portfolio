"use client";
import { useRef, useState } from 'react';
import Slider from 'react-slick';

interface CarouselProps {
  length: number;
  children: React.ReactNode;
}

const Carousel = ({
  length,
  children
}: CarouselProps) => {
  const [currentSlide, setSlide] = useState(1);

  const carousel = useRef<Slider>(null)

  const settings = {
    accessibility: true,
    arrows: false,
    dots: false,
    draggable: true,
    swipe: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setSlide(next + 1)
  }

  return (
    <>
      <Slider
        {...settings}
        ref={carousel}
        className={sliderStyles}
      >
        {children}
      </Slider>
      <div className="absolute bottom-[3%] left-1/2 translate-x-[-50%] text-white flex flex-row">
        <button
          type="button"
          onClick={() => carousel.current?.slickPrev()}
          className="mx-2 hover:cursor-pointer"
        >
          Previous
        </button>
        <p className="font-bold text-xl">{currentSlide} / {length}</p>
        <button
          type="button"
          onClick={() => carousel.current?.slickNext()}
          className="mx-2 hover:cursor-pointer"
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Carousel;

const sliderStyles = `
  z-3
  block
  absolute
  top-[45%]
  left-1/2
  translate-x-[-50%]
  translate-y-[-45%]
  w-full
  h-full
  [&_div]:h-full
  hover:cursor-grab
`;