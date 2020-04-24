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
  AboutText
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
      <WorkLink onClick={() => setAnimateWork(true)} animating={animateWork}>
        <WorkText>Work</WorkText>
      </WorkLink>
      <AboutLink onClick={() => setAnimateAbout(true)} animating={animateAbout}>
        <AboutText>About</AboutText>
      </AboutLink>
      <Article>
        <Title>Hello There.</Title>
        <Caption>
          The name's <Emphasis>Hayo Friese</Emphasis>, web developer and student
          extraordinaire*.
        </Caption>
      </Article>
      <Article>
        <CoverSheet />
        <CoverImg src={background} alt="Hayo Cover Photo" />
      </Article>
    </Wrapper>
  );
};

export default Home;
