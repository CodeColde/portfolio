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

const Work = () => {
  const [carouselSet, setCarousel] = useState(false);
  const [currentSlide, setSlide] = useState(1);
  const [animateHome, setAnimeHome] = useState(false);
  const [toCase, setCase] = useState("");
  const [coord, setCoords] = useState();
  const carousel = useRef(null);

  useDelayedLinking(400, "/", animateHome);
  useDelayedLinking(1000, toCase, toCase);

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

  const CaseOne = require("../assets/cases/case-1-shuttershare/shuttershare-hero.jpg");
  const CaseTwo = require("../assets/cases/case-2-adscope/adscope-hero.jpg");
  const CaseThree = require("../assets/cases/case-3-tiptopmusic/tiptopmusic-hero.jpg");
  const CaseFour = require("../assets/cases/case-4-schoolforjustice/schoolforjustice-hero.jpg");
  const CaseFive = require("../assets/cases/case-5-ziggodamtotdamloop/damtotdamloop-hero.jpg");

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
            <div>
              <SlideWrapper>
                <LinkWrap coverImage={CaseOne} active={toCase === "/shuttershare"}>
                  <Overlay
                    active={!!toCase}
                    onMouseDown={e => setCoords(e.nativeEvent.x)}
                    onMouseUp={e => handleCaseSwap(e.nativeEvent, "/shuttershare")}
                  >
                    <ContentWrap>
                      <CaseTitle>
                        ShutterShare
                        <Spanner />
                      </CaseTitle>
                      <Subtitle>Back-End</Subtitle>
                      <Subtitle>Northumbria University</Subtitle>
                    </ContentWrap>
                  </Overlay>
                </LinkWrap>
              </SlideWrapper>
            </div>
            <div>
              <SlideWrapper>
                <LinkWrap coverImage={CaseTwo} active={toCase === "/adscope"}>
                  <Overlay
                    active={!!toCase}
                    onMouseDown={e => setCoords(e.nativeEvent.x)}
                    onMouseUp={e => handleCaseSwap(e.nativeEvent, "/adscope")}
                  >
                    <ContentWrap>
                      <CaseTitle>
                        Adscope
                        <Spanner />
                      </CaseTitle>
                      <Subtitle>UX . Back-End</Subtitle>
                      <Subtitle>Northumbria University</Subtitle>
                    </ContentWrap>
                  </Overlay>
                </LinkWrap>
              </SlideWrapper>
            </div>
            <div>
              <SlideWrapper>
                <LinkWrap coverImage={CaseThree} active={toCase === "/tiptopmusic"}>
                  <Overlay
                    active={!!toCase}
                    onMouseDown={e => setCoords(e.nativeEvent.x)}
                    onMouseUp={e => handleCaseSwap(e.nativeEvent, "/tiptopmusic")}
                  >
                    <ContentWrap>
                      <CaseTitle>
                        TipTop Music
                        <Spanner />
                      </CaseTitle>
                      <Subtitle>Front-End</Subtitle>
                      <Subtitle>Northumbria University</Subtitle>
                    </ContentWrap>
                  </Overlay>
                </LinkWrap>
              </SlideWrapper>
            </div>
            <div>
              <SlideWrapper>
                <LinkWrap coverImage={CaseFour} active={toCase === "/schoolforjustice"}>
                  <Overlay
                    active={!!toCase}
                    onMouseDown={e => setCoords(e.nativeEvent.x)}
                    onMouseUp={e => handleCaseSwap(e.nativeEvent, "/schoolforjustice")}
                  >
                    <ContentWrap>
                      <CaseTitle>
                        School For Justice
                        <Spanner />
                      </CaseTitle>
                      <Subtitle>Front-End</Subtitle>
                      <Subtitle>J. Walter Thompson Amsterdam</Subtitle>
                    </ContentWrap>
                  </Overlay>
                </LinkWrap>
              </SlideWrapper>
            </div>
            <div>
              <SlideWrapper>
                <LinkWrap coverImage={CaseFive} active={toCase === "/ziggodamtotdamloop"}>
                  <Overlay
                    active={!!toCase}
                    onMouseDown={e => setCoords(e.nativeEvent.x)}
                    onMouseUp={e => handleCaseSwap(e.nativeEvent, "/ziggodamtotdamloop")}
                  >
                    <ContentWrap>
                      <CaseTitle>
                        Ziggo Dam Tot Dam Loop
                        <Spanner />
                      </CaseTitle>
                      <Subtitle>Conceptualization</Subtitle>
                      <Subtitle>J. Walter Thompson Amsterdam</Subtitle>
                    </ContentWrap>
                  </Overlay>
                </LinkWrap>
              </SlideWrapper>
            </div>
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
