import styled, { css } from "styled-components";
import Slider from "react-slick";

import theme from "./theme";
import { loadIn, contentBlogToPost, tagBlogToPost } from "../animation/keyframes";

export const Wrapper = styled.section`
  animation: ${loadIn} 0.3s ease-in 0s forwards;
  position: relative;
  display: block;
  background-color: ${theme.colors.peach};

  .slick-slider {
    user-select: initial;
  }
`;

export const SliderContainer = styled(Slider)`
  z-index: ${({ toCase }) => (toCase ? 3 : 10)};
  display: block;
  position: absolute !important;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  transition: opacity 0.1s ease-in-out, height 0.3s ease-in-out;
  width: 100%;
  height: 100%;

  > div {
    height: 100%;
    > div {
      height: 100%;
      > div {
        height: 100%;
        > div {
          height: 100%;
          > div {
            height: 100%;
          }
        }
      }
    }
  }
  div {
    &:focus {
      outline: none;
    }
  }

  &:hover {
    cursor: grab, -webkit-grab;
  }
`;

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
  z-index: 5;
`;

export const ImageContainer = styled.div`
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  flex: 7;
  position: relative;
`;

export const BlogTagWrapper = styled.div`
  background-color: ${theme.colors.black};
  width: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  ${({ animating }) =>
    animating &&
    css`
      left: -15vw;
      animation: ${tagBlogToPost} 0.6s ease-in-out 0s 1;
    `
  }
`;

export const Relativer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const BlogTag = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  color: white;
  font-weight: 900;
  font-size: 12rem;
  text-align: center;
  text-transform: uppercase;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 15vw;
  right: 0;
  bottom: 0;
  ${({ animating }) =>
    animating &&
    css`
      animation: ${contentBlogToPost} 0.6s ease-in-out 0s 1;
      animation-fill-mode: forwards;
    `
  }
`;

export const TitleContainer = styled.div`
  padding: 20px 60px;
  width: 100%;
  height: 250px;
  margin-bottom: -2px;
  background-color: ${theme.colors.white};
`;

export const Title = styled.h2`
  font-size: 4.5rem;

  &:hover {
    cursor: pointer;
  }
`;

export const PaginationContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.peach};
  padding: 20px 40px;
`;

export const Arrow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > span {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0 16px;
    position: relative;

    &:before {
      content: "";
      clear: both;
      height: 5px;
      width: 0;
      position: absolute;
      top: 50%;
      background-color: black;
      transform: translateY(-50%);
      transition: width 0.2s ease-in-out;
    }
  }
  &:hover {
      cursor: pointer;
      font-style: italic;

      > span:before {
        width: 110%;
      }
    }
`;

export const Button = styled.img`
  height: 35px;
  ${({ inverted }) => inverted ? "transform: rotate(180deg);" : ""}
`;