import React, { useState } from "react";
import "../assets/images/cover-img.jpg";
import {
  Wrapper,
  Article,
  Title,
  Caption,
  Emphasis,
  CoverSheet,
  CoverImg,
  WorkLink,
  WorkText,
  AboutLink,
  AboutText,
  WelcomeContent,
  HeroImage
} from "../styles/Home.styles";
import useDelayedLinking from "../utils/useDelayedLinking";

const Home = () => {
  const [animateWork, setAnimateWork] = useState(false);
  const [animateAbout, setAnimateAbout] = useState(false);

  useDelayedLinking(400, "/work", animateWork);
  useDelayedLinking(400, "/about", animateAbout);

  const background = require("../assets/images/cover-img.jpg");
  return (
    <Wrapper>
      <WorkLink onClick={() => setAnimateWork(true)} animating={!!animateWork ? animateWork : undefined}>
        <WorkText>Work</WorkText>
      </WorkLink>
      <AboutLink onClick={() => setAnimateAbout(true)} animating={!!animateAbout ? animateAbout : undefined}>
        <AboutText>About</AboutText>
      </AboutLink>
      <WelcomeContent>
        <Title>Hello There.</Title>
        <Caption>
          The name's <Emphasis>Hayo Friese</Emphasis>, web developer and student
          extraordinaire*.
        </Caption>
      </WelcomeContent>
      <HeroImage>
        <CoverSheet />
        <CoverImg src={background} alt="Hayo Cover Photo" />
      </HeroImage>
    </Wrapper>
  );
};

export default Home;
