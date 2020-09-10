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
  Twitch,
  Twitter,
  Github,
  LinkedIn,
  Medium
} from "../components/Socials";
import { withRouter } from "react-router";
import NavButton from "../components/NavButton";
import storeNavBg, { stgname } from "../utils/storeNavBg";

const NavigationMenu = ({ history }) => {
  const [bg, setBg] = useState(!!sessionStorage.getItem(stgname));
  const [isOn, setState] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [linking, setLink] = useState("");

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
    !!linking &&
      setTimeout(() => {
        switch (linking) {
          case "home":
            history.push("/");
            setState(false);
            setLink("");
            break;
          case "about":
            history.push("/about");
            setState(false);
            setLink("");
            break;
          case "work":
            history.push("/work");
            setState(false);
            setLink("");
            break;
          case "blog":
            history.push("/blog");
            setState(false);
            setLink("");
            break;
          default:
            setLink("");
        }
        storeNavBg(false);
        window.scrollTo(0, 0);
      }, 300);
  }, [linking, history]);

  useEffect(() => {
    shouldAnimate &&
      !isOn &&
      setTimeout(() => {
        setShouldAnimate(false);
      }, 600);
  }, [shouldAnimate, isOn]);

  const closeHandler = () => {
    setShouldAnimate(true);
    setState(!isOn);
  };

  const setLinkHandler = text => {
    setTimeout(() => setShouldAnimate(false), 300);
    setLink(text);
  };

  return (
    <Wrapper open={isOn} shouldAnimate={shouldAnimate}>
      <Container
        open={isOn}
        onClick={closeHandler}
        hasBackground={bg}
      >
        <NavButton open={isOn} />
      </Container>
      <Body open={isOn} shouldAnimate={shouldAnimate}>
        <Page variant="home" onClick={() => setLinkHandler("home")}>
          <LinkTag>Home</LinkTag>
          <Spanner opening={linking === "home"} />
        </Page>
        <Page variant="about" onClick={() => setLinkHandler("about")}>
          <LinkTag>About</LinkTag>
          <Spanner opening={linking === "about"} />
        </Page>
        <Page variant="work" onClick={() => setLinkHandler("work")}>
          <LinkTag>Work</LinkTag>
          <Spanner opening={linking === "work"} />
        </Page>
        <Page variant="blog" onClick={() => setLinkHandler("blog")}>
          <LinkTag>Blog</LinkTag>
          <Spanner opening={linking === "blog"} />
        </Page>
      </Body>
      <ContactContainer open={isOn}>
        <p>For business enquiries, <a href="mailto:hayo.web@gmail.com">email me</a>.</p>
      </ContactContainer>
      <SocialContainer open={isOn}>
        <SocialItem>
          <Twitch />
        </SocialItem>
        <SocialItem>
          <Twitter />
        </SocialItem>
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

export default withRouter(NavigationMenu);
