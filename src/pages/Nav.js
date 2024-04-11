import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Container,
  Body,
  Page,
  LinkTag,
  ContactContainer,
  SocialContainer,
  Spanner
} from "../styles/Navigation.styles";
import { SocialItem } from "../styles/Navigation.styles";
import {
  Instagram,
  Github,
  LinkedIn,
  Medium
} from "../components/Socials";
import { useNavigate } from "react-router";
import NavButton from "../components/NavButton";
import storeNavBg, { stgname } from "../utils/storeNavBg";

const NavigationMenu = () => {
  const [bg, setBg] = useState(!!sessionStorage.getItem(stgname));
  const [isOn, setState] = useState(false);
  const [shouldanimate, setShouldanimate] = useState(false);
  const [linking, setLink] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storageHandler = () => {
      if (bg !== !!sessionStorage.getItem(stgname)) {
        setBg(!!sessionStorage.getItem(stgname));
      }
    };
    window.addEventListener('scroll', storageHandler);

    return () => {
      window.removeEventListener('scroll', storageHandler)
    }
  }, [bg]);

  useEffect(() => {
    !!linking && setTimeout(() => {
      navigate(linking === "home" ? "/" : `/${linking}`);
      setState(false);
      setLink("");
      storeNavBg(false);
      window.scrollTo(0, 0);
    }, 300);
  }, [linking, navigate]);

  useEffect(() => {
    shouldanimate &&
      !isOn &&
      setTimeout(() => {
        setShouldanimate(false);
      }, 600);
  }, [shouldanimate, isOn]);

  const closeHandler = () => {
    setShouldanimate(true);
    setState(!isOn);
  };

  const setLinkHandler = text => {
    setTimeout(() => setShouldanimate(false), 300);
    setLink(text);
  };

  return (
    <Wrapper open={isOn} shouldanimate={shouldanimate ? shouldanimate : undefined}>
      <Container
        open={isOn}
        onClick={closeHandler}
        hasbackground={!!bg ? bg : undefined}
      >
        <NavButton open={isOn} />
      </Container>
      <Body open={isOn} shouldanimate={shouldanimate ? shouldanimate : undefined}>
        <Page variant="home" onClick={() => setLinkHandler("home")}>
          <LinkTag>Home</LinkTag>
          <Spanner opening={linking === "home" ? true : undefined} />
        </Page>
        <Page variant="about" onClick={() => setLinkHandler("about")}>
          <LinkTag>About</LinkTag>
          <Spanner opening={linking === "about" ? true : undefined} />
        </Page>
        <Page variant="work" onClick={() => setLinkHandler("work")}>
          <LinkTag>Work</LinkTag>
          <Spanner opening={linking === "work" ? true : undefined} />
        </Page>
        <Page variant="blog" onClick={() => setLinkHandler("blog")}>
          <LinkTag>Blog</LinkTag>
          <Spanner opening={linking === "blog" ? true : undefined} />
        </Page>
      </Body>
      <ContactContainer open={isOn}>
        <p>For business enquiries, <a href="mailto:hayo.web@gmail.com">email me</a>.</p>
      </ContactContainer>
      <SocialContainer open={isOn}>
        <SocialItem>
          <LinkedIn />
        </SocialItem>
        <SocialItem>
          <Instagram />
        </SocialItem>
        <SocialItem>
          <Github />
        </SocialItem>
        <SocialItem>
          <Medium />
        </SocialItem>
      </SocialContainer>
    </Wrapper>
  );
};

export default NavigationMenu;
