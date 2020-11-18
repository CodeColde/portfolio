import styled from "styled-components";
import theme from "./theme";

const ContentWrapper = styled.section`
  padding: 80px 17%;
  height: auto;
  font-size: 1.2em
`;

export const UnorderedList = styled.ul`
  line-height: 35px;
  padding-left: 50px;
  text-indent: 25px;
  margin-bottom: 25px;
  list-style: disc !important;
`;

export const OrderedList = styled.ol`
  line-height: 35px;
  padding-left: 50px;
  text-indent: 25px;
  margin-bottom: 25px;
`;

export const Subheading = styled.h4`
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 50px;
`;

export const TinyHeading = styled.h5`
  text-transform: uppercase;
  font-weight: 800;
  margin: 10px 0;
`;

export const Paragraph = styled.p`
  line-height: 35px;
  margin-bottom: 25px;
  text-indent: 50px;
`;

export const Problem = styled(ContentWrapper)`
  padding-top: 70px;
`;

export const Process = styled(ContentWrapper)`
  background-color: black;
  color: ${theme.colors.white};
`;

const CaseImages = styled.div`
  width: 100%;
  display: block;
  position: relative;
  margin: 75px auto 75px;

  > img {
    position: relative;
    max-width: 100%;
    text-align: center;
  }
`;

export const CaseImagesLeft = styled(CaseImages)`
  text-align: left;
`;

export const CaseImagesCenter = styled(CaseImages)`
  text-align: center;

  > img {
    vertical-align: middle;
    display: inline-block;
    max-width: 45%;
    margin-left: 1.25%;
    margin-right: 1.25%;
  }
`;

export const CaseImageCenterLarge = styled(CaseImages)`
  text-align: center;
  margin: 25px auto 50px;

  > img {
    width: 100%;
  }
`;

export const CaseImagesRight = styled(CaseImages)`
  text-align: right;
`;

export const Results = styled(ContentWrapper)`
  z-index: 3;
`;