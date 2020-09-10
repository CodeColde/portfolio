import React, { Component, createRef, Fragment } from "react";
import {
  Hero,
  TitleTab,
  Title,
  TechniqueTitle,
  Introduction,
  InfoTitle,
  InfoText,
  QuickInfo,
  InfoClient,
  Paragraph,
  InfoList,
  InfoListContainer,
  InfoItem,
  InfoSubject,
  InfoContent,
  InfoSubtitle,
  ClientHeader,
  CaseWrapper,
  Problem,
  Process,
  Results,
  NextCase,
  Anchor,
  Subheading,
  TinyHeading,
  CaseImagesCenter,
  NextLink,
  NextCaseTitle,
  CaseImageCenterLarge
} from "../../styles/Case.styles";
import { withRouter } from "react-router";
import BackButton from "../../components/BackButton";
import storeNavBg from "../../utils/storeNavBg";

// Has a scroll function to detect if the body is a black background and therefore
// Has to switch the backbutton to a black background

class TiptopMusic extends Component {
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

        this.props.history.push(this.state.animateCase);
        window.scrollTo(0, 0);
      }, 400);
    }
  }

  render() {
    const hero = require("../../assets/cases/case-3-tiptopmusic/tiptopmusic-hero.jpg");
    return (
      <Fragment>
        <BackButton
          bgRef={this.introRef}
        />
        <CaseWrapper>
          <Hero image={hero}>
            <div>
              <TitleTab>
                <ClientHeader>Northumbria University</ClientHeader>
                <Title>Tip Top Music</Title>
                <TechniqueTitle>
                  North Eastern Indie Bands don't get the attention they deserve. It's time to bring you the best that the North East has to offer
                </TechniqueTitle>
              </TitleTab>
            </div>
          </Hero>
          <Introduction ref={this.introRef}>
            <QuickInfo>
              <InfoText>
                <InfoClient>Northumbria University</InfoClient>
                <InfoTitle>Tip Top Music</InfoTitle>
                <InfoSubtitle>
                  North Eastern Indie Bands don't get the attention they deserve. It's time to bring you the best that the North East has to offer
                </InfoSubtitle>
                <Paragraph>
                As part of any website for consumers, API plays a vital role in developing the user experience, facilitating certain functions, and accessing certain information. API exists to provide information that already exists, and the providers of this API are specialized in maintaining its security, data, and functionalities. This assignment for Northumbria University aimed to experiment with that.
                </Paragraph>
              </InfoText>
              <InfoListContainer>
                <InfoList>
                  <InfoItem>
                    <InfoSubject>Project Client</InfoSubject>
                    <InfoContent>Northumbria University</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoSubject>Focus</InfoSubject>
                    <InfoContent>Front-end</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoSubject>Date</InfoSubject>
                    <InfoContent>May 2017</InfoContent>
                  </InfoItem>
                </InfoList>
              </InfoListContainer>
            </QuickInfo>
            <Problem>
              <Subheading>Problem</Subheading>
              <Paragraph>
                As part of the brief, the task was to build a platform for visitors to get to know information of a North Eastern indie scene in the UK. This meant creating a platform with the ability to add more information to it in the future.
              </Paragraph>
              <Paragraph>
                The track I went with is to go in depth surrounding what such a site could look like, while developing the functionality necessary for the passing mark. The site would include the ability to go to events, get information and community buzz around certain bands, and to offer them more involvement in their music scene, as well as information about the magazing and the ability to support it.
              </Paragraph>
              <Paragraph>
              The main struggle with this assignment was the inexperience surrounding API's, and thus it was nervewrecking to understand the potential power an API can have, and some technological restraints. Additionally, design-wise the platform would draw inspiration from other sources, but I wanted to experiment with a different colorset I haven't seen often yet, finally dabbling in the color green after investing time in understanding the effects of red and yellow earlier in the year.
              </Paragraph>
            </Problem>
          </Introduction>
          <Process>
            <Subheading>Process</Subheading>
            <TinyHeading>Designs</TinyHeading>
            <Paragraph>
              The designs were initially experimenting with a shade of dark/light green as the typography accents, with the background accents being some shades of beige. The goal was to create a welcoming sensation.
            </Paragraph>
            <CaseImageCenterLarge>
              <img src={require("../../assets/cases/case-3-tiptopmusic/Landing.png")} alt="Landing" />
            </CaseImageCenterLarge>
            <Paragraph>
              As seen on the landing page, the beige was instead used as an accent to break apart sections of information, a rule which I would conform the rest of the site to as well. During the development of the design however, I became attracted to separating the content with a darker shade as the background accent accompanied by white text. This would maintain the branding guide below, with minimal use of colors while drawing the user to the information.
            </Paragraph>
            <CaseImageCenterLarge>
              <img src={require("../../assets/cases/case-3-tiptopmusic/Branding.png")} alt="Branding" />
            </CaseImageCenterLarge>
            <Paragraph>
              The above result was strictly adhered to for the remainder of the site, throughout its available functionality as adhered to by the assignment brief.
            </Paragraph>
            <TinyHeading>Development</TinyHeading>
            <Paragraph>
              The development saw it easy to adhere to the guidelines the branding document sought to set, and thus the front end development side was very simple to do.
            </Paragraph>
            <Paragraph>
              The issues started to appear when the band pages saw the results provided by the API and the code adhering to it. For the twitter feed, I wanted to showcase a twitter-like feel, and had to hardcode the design of a twitter tag for each individual's tweet. Additionally, the band Girl Band saw a lot of profanity and pornographic tweets, and thus had to experiment with the API's logic to mitigate that.
            </Paragraph>
            <Paragraph>
              The Google Maps API was by far the easiest to manage, the only desire I had being to make custom markers to identify gig locations. The design was very simple, but adhered to the color scheme.
            </Paragraph>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-3-tiptopmusic/gmicon.png")} alt="Icon" />
            </CaseImagesCenter>
          </Process>
          <Results>
            <Subheading>Result</Subheading>
            <Paragraph>
              Despite some API hardcoding issues and the fact that the twitter account associated with the site has been deleted, the result adhered to the site nicely. The green color scheme I experimented with showed a nice design, but whether it fit well with the indie scene would require a survey to garner results. 
            </Paragraph>
            <Paragraph>
              The user experience of the site, if it would go into full development, shows potential to work seemlessly, and harmony between text and other content would go well with the site's overall design. 
            </Paragraph>
            <Paragraph>
              I plan to use this style of design for a magazine site I'm currenty starting development on. Stay tuned to see that site's design.
            </Paragraph>
            <Anchor href="http://ec2-34-214-154-202.us-west-2.compute.amazonaws.com/Final/index.php">View Live Here</Anchor>
          </Results>
          <NextCase
            onClick={() => this.setState({ animateCase: "/schoolforjustice" })}
            animating={!!this.state.animateCase}
          >
            <NextLink>
              Next: <NextCaseTitle>School For Justice</NextCaseTitle>
            </NextLink>
          </NextCase>
        </CaseWrapper>
      </Fragment>
    );
  }
}

export default withRouter(TiptopMusic);
