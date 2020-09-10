import React from 'react';
import styled, { css } from "styled-components";
import Arrow from "../assets/icons/back.png";
import { disappear, postToBlog, caseToWork } from '../animation/keyframes';
import { useHistory } from 'react-router';
import theme from '../styles/theme';
import storeNavBg from '../utils/storeNavBg';

const BackButton = ({ bgRef }) => {
  const [hasBackground, setHasBackground] = React.useState(false);
  const [toBack, setToBack] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const handleScroll = () => {
      if (!!bgRef && bgRef.current) {
        if (bgRef.current.getBoundingClientRect().top < 40) {
          setHasBackground(true)
          storeNavBg(true);
        } else {
          setHasBackground(false)
          storeNavBg(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (toBack) {
        window.scrollTo(0, 0);
      }
      window.removeEventListener("scroll", handleScroll);
    }
  }, [bgRef, hasBackground, storeNavBg]);

  React.useEffect(() => {
    if (toBack) {
      setTimeout(() => {
        history.push(`/${history.location.pathname.split("/")[1]}`);
      }, 400);
    }
  }, [toBack, storeNavBg, history]);

  const bgColor = history.location.pathname.split("/")[1] === "work" ? theme.colors.red : theme.colors.black;
  const animation = history.location.pathname.split("/")[1] === "work" ? caseToWork : postToBlog;
  return (
    <Wrapper
      onClick={() => {
        storeNavBg(false);
        setToBack(true);
        setHasBackground(false);
      }}
      toBack={toBack}
      hasBackground={hasBackground}
      animation={animation}
      bgColor={bgColor}
    >
      <BackArrow src={Arrow} alt="Back to work" />
    </Wrapper>
  )
};

export default BackButton;

const Wrapper = styled.div`
  z-index: 3;
  left: 2%;
  padding: 19px;
  top: 2%;
  height: 75px;
  width: 75px;
  position: fixed;
  float: left;
  transition: background-color 0.1s ease-in-out, border-radius 0.1s ease-in-out, opacity 0.3s ease-in-out;

  ${({ toBack }) =>
    toBack && css`
      z-index: 10;
      animation: ${({ animation }) => animation} 0.2s ease-in-out 0s 1;
      animation-fill-mode: forwards;

      > img {
        animation: ${disappear} 0.2s ease-in-out 0s 1;
        animation-fill-mode: forwards;
      }
  `}
  background-color: ${({ hasBackground }) => hasBackground && theme.colors.black};

  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background-color: ${({ bgColor }) => bgColor};
  }
`;

const BackArrow = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: relative;
`;
