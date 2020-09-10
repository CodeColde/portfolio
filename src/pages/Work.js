import React, { useRef, useState } from "react";
import {
  Wrapper,
  NumberList,
  Current,
  SliderContainer,
  SlideWrapper,
  LinkWrap,
  Overlay,
  ContentWrap,
  CaseTitle,
  Button,
  SlickSwitch,
  Section,
  Spanner,
  Subtitle,
  HomeLink,
  TextLink
} from "../styles/Work.styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useDelayedLinking from "../utils/useDelayedLinking";
import meta from "./cases/meta";

const Work = () => {
  const [carouselSet, setCarousel] = useState(false);
  const [currentSlide, setSlide] = useState(1);
  const [animateHome, setAnimeHome] = useState(false);
  const [toCase, setCase] = useState("");
  const [coord, setCoords] = useState();
  const carousel = useRef(null);

  useDelayedLinking(400, "/", animateHome);
  useDelayedLinking(1000, `/work${toCase}`, toCase);

  if (!carouselSet) {
    setCarousel(true);
  }

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
    beforeChange: (old, next) => setSlide(next + 1)
  };

  const PreviousIcon = require("../assets/icons/left-arrow.png");
  const NextIcon = require("../assets/icons/right-arrow.png");

  const handleCaseSwap = (e, uri) =>
    e.x < coord + 15 && e.x > coord - 15 && setCase(uri);

  return (
    <>
      <Wrapper>
        <HomeLink onClick={() => setAnimeHome(true)} animating={animateHome}>
          <TextLink>Home</TextLink>
        </HomeLink>
        <Section>
          <SliderContainer {...settings} ref={carousel} toCase={!!toCase}>
            {meta.map(el => (
              <div key={el.link}>
                <SlideWrapper>
                  <LinkWrap coverImage={el.coverImg} active={toCase === el.link}>
                    <Overlay
                      active={!!toCase}
                      onMouseDown={e => setCoords(e.nativeEvent.x)}
                      onMouseUp={e => handleCaseSwap(e.nativeEvent, el.link)}
                    >
                      <ContentWrap>
                        <CaseTitle>
                          {el.title}
                          <Spanner />
                        </CaseTitle>
                        <Subtitle>{el.tools.join(" . ")}</Subtitle>
                        <Subtitle>{el.location}</Subtitle>
                      </ContentWrap>
                    </Overlay>
                  </LinkWrap>
                </SlideWrapper>
              </div>
            ))}
          </SliderContainer>
          <NumberList navigating={!!toCase}>
            <SlickSwitch onClick={() => carousel.current.slickPrev()}>
              <Button src={PreviousIcon} alt="Previous case" />
            </SlickSwitch>
            <Current>
              <p>0{currentSlide} / 05</p>
            </Current>
            <SlickSwitch onClick={() => carousel.current.slickNext()}>
              <Button src={NextIcon} alt="Next case" />
            </SlickSwitch>
          </NumberList>
        </Section>
      </Wrapper>
    </>
  );
};

export default Work;
