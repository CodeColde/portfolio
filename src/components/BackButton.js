import React from 'react';
import styled, { css } from "styled-components";
import Arrow from "../assets/icons/back.png";
import { disappear, postToBlog, caseToWork } from '../animation/keyframes';
import { useNavigate, useLocation } from 'react-router';
import theme from '../styles/theme';
import storeNavBg from '../utils/storeNavBg';

const BackButton = ({ bgRef }) => {
  const [hasbackground, setHasbackground] = React.useState(false);
  const [toback, setToback] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      if (!!bgRef && bgRef.current) {
        if (bgRef.current.getBoundingClientRect().top < 40) {
          setHasbackground(true)
          storeNavBg(true);
        } else {
          setHasbackground(false)
          storeNavBg(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (toback) {
        window.scrollTo(0, 0);
      }
      window.removeEventListener("scroll", handleScroll);
    }
  }, [bgRef, hasbackground, storeNavBg]);

  React.useEffect(() => {
    if (toback) {
      setTimeout(() => {
        navigate(`/${location.pathname.split("/")[1]}`);
      }, 400);
    }
  }, [toback, storeNavBg, navigate, location]);

  const bgcolor = location.pathname.split("/")[1] === "work" ? theme.colors.red : theme.colors.black;
  // const navigationAnimation = location.pathname.split("/")[1] === "work" ? caseToWork : postToBlog;
  const navigationAnimation = location.pathname.split("/")[1] === "work";

  return (
    <Wrapper
      onClick={() => {
        storeNavBg(false);
        setToback(true);
        setHasbackground(false);
      }}
      toback={toback ? toback : undefined}
      hasbackground={hasbackground ? true : undefined}
      navanimation={!navigationAnimation ? false : undefined}
      bgcolor={bgcolor}
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

  ${({ toback, navanimation }) =>
    toback && css`
      z-index: 10;
      animation: ${navanimation ? caseToWork : postToBlog} 0.2s ease-in-out 0s 1;
      animation-fill-mode: forwards;

      > img {
        animation: ${disappear} 0.2s ease-in-out 0s 1;
        animation-fill-mode: forwards;
      }
  `}
  background-color: ${({ hasbackground }) => hasbackground && theme.colors.black};

  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background-color: ${({ bgcolor }) => bgcolor};
  }
`;

const BackArrow = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: relative;
`;
