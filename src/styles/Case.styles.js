import styled, { css } from "styled-components";
import { titleFadeIn, toWork } from "../animation/keyframes";
import theme from './theme';

export const ContentWrapper = styled.section`
  padding: 0 17%;
  height: auto;
`;

export const CaseWrapper = styled.main`
  position: relative;
  height: auto;
  width: 100%;
  padding-bottom: 80px;
  opacity: 1;
`;

export const Hero = styled.section`
  height: 100vh;
  position: relative;
  ${({ image }) => `background-image: url(${image});`}
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

export const TitleTab = styled.div`
  animation: ${titleFadeIn} 0.5s ease-in-out 0s 1;
  animation-fill-mode: forwards;
  background-color: rgba(0, 0, 0, 0.8);
  width: 52%;
  left: 0;
  position: absolute;
  bottom: 12%;
  color: white;
  padding: 25px 50px 25px 75px;
`;

export const Title = styled.h1`
  font-size: 4.65em;
  width: 80%;
  text-transform: uppercase;
`;

export const ClientHeader = styled.h3`
  font-size: 0.69em;
  text-transform: capitalize;
`;

export const TechniqueTitle = styled.h4`
  font-size: 1.1em;
`;

export const Introduction = styled(ContentWrapper)`
  padding-top: 80px;
`;

export const QuickInfo = styled.div`
  padding: 70px 0;
  display: flex;
`;

export const InfoText = styled.div`
  width: 70%;
  vertical-align: bottom;
`;

export const InfoTitle = styled.h1`
  font-size: 6.9em;
  text-transform: uppercase;
  margin-bottom: 15px;
`;

export const InfoClient = styled.h3`
  text-transform: uppercase;
  font-size: 0.9em;
`;

export const InfoSubtitle = styled.h2`
  margin-bottom: 40px;
  font-size: 1.45em;
`;

export const InfoListContainer = styled.div`
  width: 30%;
  float: right;
  position: relative;
`;

export const InfoList = styled.ul`
  line-height: 35px;
  padding-left: 50px;
  text-indent: 25px;
  margin-bottom: 25px;
  list-style: disc !important;
  top: 10em;
  position: absolute;
  right: 0;
  font-size: 1.2em;
`;

export const InfoItem = styled.li`
  margin-bottom: 24px;

  &:nth-child(4) {
    margin-bottom: 0;
  }
`;

export const InfoSubject = styled.h4`
  font-size: 1.1em;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const InfoContent = styled.h5`
  font-size: 1.15em;
  font-weight: 600;
`;

export const NextCase = styled.div`
  width: 100%;
  text-align: center;
  height: 80px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
  z-index: 5;
  transition: background-color 0.1s ease-in-out, height 0.3s ease-in-out,
    top 0.3s ease-in-out;
  ${({ animating }) =>
    animating &&
    css`
      z-index: 999;
      animation: ${toWork} 0.4s ease-in-out 0s 1;
      animation-fill-mode: forwards;
      > p {
        position: relative;
        color: ${theme.colors.red};
      }
      background-color: ${theme.colors.red};
    `}

  &:hover {
    background-color: ${theme.colors.red};
    cursor: pointer;

    > p {
      color: ${theme.colors.white};
      top: 50%;
      font-weight: 600;

      > span {
        font-weight: 900;
      }
    }
  }
`;

export const NextLink = styled.p`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: capitalize;
  color: black;
  font-weight: 300;
  transition: top 0.1s ease-in-out, color 0.1s ease-in-out,
    font-weight 0.1s ease-in-out;
`;

export const NextCaseTitle = styled.span`
  font-weight: 700;
`;