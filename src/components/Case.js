import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Hero,
  TitleTab,
  Title,
  TechniqueTitle,
  Introduction,
  InfoTitle,
  InfoText,
  InfoClient,
  InfoList,
  InfoListContainer,
  InfoItem,
  InfoSubject,
  InfoContent,
  InfoSubtitle,
  QuickInfo,
  ClientHeader,
  CaseWrapper,
  ContentWrapper,
  NextCase,
  NextCaseTitle,
  NextLink,
} from "../styles/Case.styles";
import { Anchor } from "./ContentSupport";
import BackButton from "./BackButton";
import storeNavBg from "../utils/storeNavBg";
import meta from "../pages/cases/meta";

const Case = ({ IntroParagraphs, subtitle, children }) => {
  const [animateCase, useAnimateCase] = useState("");

  const navigate = useNavigate();
  const introRef = useRef();
  const routeLocation = useLocation();

  const currentCase = meta.find(el => el.link === `/${routeLocation.pathname.split("/")[2]}`);
  const { title, tools, location, coverImg, date, live } = currentCase;
  const nextIndex = meta.findIndex(el => el.title === title)+1;
  const nextCase =  meta[nextIndex > meta.length-1 ? 0 : nextIndex];

  useEffect(() => {
    if (animateCase) {
      setTimeout(() => {
        storeNavBg(false);
        navigate(`/work${animateCase}`);
        window.scrollTo(0, 0);
      }, 400);
    }
  }, [animateCase, navigate]);

  return (
    <>
      <BackButton
        bgRef={introRef}
      />
      <CaseWrapper>
        <Hero image={coverImg}>
          <div>
            <TitleTab>
              <ClientHeader>{location}</ClientHeader>
              <Title>{title}</Title>
              <TechniqueTitle>{subtitle}</TechniqueTitle>
            </TitleTab>
          </div>
        </Hero>
        <Introduction ref={introRef}>
          <QuickInfo>
            <InfoText>
              <InfoClient>{location}</InfoClient>
              <InfoTitle>{title}</InfoTitle>
              <InfoSubtitle>{subtitle}</InfoSubtitle>
              <IntroParagraphs />
            </InfoText>
            <InfoListContainer>
              <InfoList>
                <InfoItem>
                  <InfoSubject>Project Client</InfoSubject>
                  <InfoContent>{location}</InfoContent>
                </InfoItem>
                <InfoItem>
                  <InfoSubject>Focus</InfoSubject>
                  <InfoContent>{tools.join(" / ")}</InfoContent>
                </InfoItem>
                <InfoItem>
                  <InfoSubject>Date</InfoSubject>
                  <InfoContent>{date}</InfoContent>
                </InfoItem>
                <InfoItem>
                  <InfoSubject>Live</InfoSubject>
                  <InfoContent>{!!live ? <Anchor to={live}>Yes</Anchor> : "No"}</InfoContent>
                </InfoItem>
              </InfoList>
            </InfoListContainer>
          </QuickInfo>
        </Introduction>
        {children}
        {!!live && (
          <ContentWrapper>
            <Anchor to={live}>View Live Here</Anchor>
          </ContentWrapper>
        )}
        <NextCase
          onClick={() => useAnimateCase(nextCase.link)}
          animating={!!animateCase ? true : undefined}
        >
          <NextLink>
            Next: <NextCaseTitle>{nextCase.title}</NextCaseTitle>
          </NextLink>
        </NextCase>
      </CaseWrapper>
    </>
  )
}

export default Case;