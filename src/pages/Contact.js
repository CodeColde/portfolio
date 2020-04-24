import React, { useState } from "react";
import { Wrapper, Container, Header } from "../styles/Contact.styles";
import { HomeLink, TextLink } from "../styles/Work.styles";
import useDelayedLinking from "../utils/useDelayedLinking";

const Contact = () => {
  const [animate, setAnimate] = useState(false);

  useDelayedLinking(400, "/", animate);

  return (
    <Wrapper>
      <HomeLink onClick={() => setAnimate(true)} animating={animate}>
        <TextLink>Home</TextLink>
      </HomeLink>
      <Container>
        <Header>hayo.friese@gmail.com</Header>
        <Header>+31 (0) 6 1334 54 31</Header>
      </Container>
    </Wrapper>
  );
};

export default Contact;
