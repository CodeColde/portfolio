
import useCarouselNavigator from "../utils/useCarouselNavigator";

interface Props {
  length: number;
  currentSlide: number;
}

const CarouselNavigation = ({
  length,
  currentSlide
}: Props) => {
  const { selectSlide } = useCarouselNavigator(length);
  console.log(currentSlide);
  const childCount = [...Array(length)]
  return (
    <div className="flex justify-center mt-2 space-x-2">
        {childCount.map((_, idx) => (
          <button
            type="button"
            key={`slide-${idx}`}
            onClick={() => selectSlide(idx)}
            className={`w-2 h-2 rounded-full ${currentSlide === idx ? "bg-blue-500" : "bg-gray-300"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
  )
}

export default CarouselNavigation;