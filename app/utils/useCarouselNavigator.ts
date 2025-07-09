import { useState } from "react"

const useCarouselNavigator = (length: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === length - 1 ? 0 : prev + 1))
  }

  return {
    currentSlide,
    prevSlide,
    nextSlide,
    selectSlide: setCurrentSlide,
  }
}

export default useCarouselNavigator;