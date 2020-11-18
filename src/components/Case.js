import React, { Component, createRef, Fragment } from "react";
import { withRouter } from "react-router";
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

// Has a scroll function to detect if the body is a black background and therefore
// Has to switch the backbutton to a black background

class Case extends Component {
  constructor(props) {
    super(props);
    this.introRef = createRef();
    this.state = {
      animateCase: ""
    };
  }

  componentDidUpdate() {
    if (this.state.animateCase) {
      setTimeout(() => {
        storeNavBg(false);

        this.props.history.push(`/work${this.state.animateCase}`);
        window.scrollTo(0, 0);
      }, 400);
    }
  }

  render() {
    const { IntroParagraphs, subtitle, children } = this.props;
    const currentCase = meta.find(el => el.link === `/${this.props.location.pathname.split("/")[2]}`);
    const { title, tools, location, coverImg, date, live } = currentCase;
    const nextIndex = meta.findIndex(el => el.title === title)+1;
    const nextCase =  meta[nextIndex > meta.length-1 ? 0 : nextIndex];
    return (
      <Fragment>
        <BackButton
          bgRef={this.introRef}
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
          <Introduction ref={this.introRef}>
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
            onClick={() => this.setState({ animateCase: nextCase.link })}
            animating={!!this.state.animateCase}
          >
            <NextLink>
              Next: <NextCaseTitle>{nextCase.title}</NextCaseTitle>
            </NextLink>
          </NextCase>
        </CaseWrapper>
      </Fragment>
    );
  }
}

export default withRouter(Case);