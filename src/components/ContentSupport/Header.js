import React from 'react';
import styled from 'styled-components';
import { titleFadeIn, overlayFadeIn } from '../../animation/keyframes';

const Header = ({
  bgImage,
  imgSrc,
  imgSource,
  imgAuth,
  tag,
  title,
  postDate,
  readTime,
  children,
}) => {
  return (
    <ImageWrapper image={bgImage}>
      <Overlay>
        <Tab>
          <Tag>{tag}</Tag>
          <Title>{title}</Title>
          <MetaWrapper>
            <Data>
              {postDate} - {readTime} mins read
            </Data>
          </MetaWrapper>
          <SubTitle>
            {children}
          </SubTitle>
        </Tab>
        <Caption>Photo by <a href={imgSource} target="_blank" rel="noopener noreferrer">{imgAuth}</a></Caption>
      </Overlay>
    </ImageWrapper>
  )
}

export default Header;

const ImageWrapper = styled.section`
  height: 100vh;
  position: relative;
  ${({ image }) => `background-image: url(${image});`}
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const Overlay = styled.article`
  height: 100%;
  width: 100%;
  position: relative;
  background-color: rgba(45, 17, 21, 0.4);
  animation: ${overlayFadeIn} 0.3s ease-in-out 0s 1;
  animation-fill-mode: forwards;
`;

const Tab = styled.div`
  animation: ${titleFadeIn} 0.5s ease-in-out 0s 1;
  animation-fill-mode: forwards;
  background-color: rgba(0, 0, 0, 0.85);
  width: 55vw;
  left: 0;
  position: absolute;
  bottom: 12%;
  color: white;
  padding: 50px 75px 50px 75px;

  @media all and (max-width: 889px) {
    width: 100vw;
  }
`;

const Tag = styled.h3`
  font-size: 0.69em;
  font-weight: 700;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: 4.5em;
  width: 90%;
`;

const MetaWrapper = styled.div`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1em;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 16px 0 56px;
`;

const Data = styled.div`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1em;
`;

const SubTitle = styled.h4`
  margin-top: 16px;
  font-size: 1.1em;
  font-weight: 600;
`;

const Caption = styled.span`
  position: absolute;
  bottom: 20px;
  right: 40px;
  color: white;

  @media all and (max-width: 889px) {
    right: 0;
    left: 0;
    text-align: center;
  }

  > a {
    text-decoration: underline;
    color: white;
  }
`;