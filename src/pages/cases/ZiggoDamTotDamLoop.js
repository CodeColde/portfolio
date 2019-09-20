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
  Subheading,
  TinyHeading,
  CaseImagesCenter,
  NextLink,
  NextCaseTitle,
  BackButton,
  BackArrow,
  OrderedList
} from "../../styles/Case.styles";
import { withRouter } from "react-router";
import {  } from "../../styles/Case.styles";

// Has a scroll function to detect if the body is a black background and therefore
// Has to switch the backbutton to a black background

class ZiggoDamTotDamLoop extends Component {
  constructor(props) {
    super(props);
    this.introRef = createRef();

    this.state = {
      toBack: false,
      introTop: 0,
      hasBackground: false,
      animateCase: ""
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      introTop: this.introRef.current.getBoundingClientRect().top - 40
    });
  }

  componentDidUpdate() {
    if (this.state.toBack) {
      setTimeout(() => {
        this.props.setNavBackground(false);
        this.props.history.push("/work");
      }, 400);
    }
    if (this.state.animateCase) {
      setTimeout(() => {
        this.props.setNavBackground(false);

        this.props.history.push(this.state.animateCase);
        window.scrollTo(0, 0);
      }, 400);
    }
  }

  componentWillUnmount() {
    if (this.state.toBack) {
      window.scrollTo(0, 0);
    }
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const introTop = this.introRef.current.getBoundingClientRect().top;
    if (introTop < 40) {
      this.setState({
        hasBackground: true
      });
      this.props.setNavBackground(true);
    } else {
      this.setState({
        hasBackground: false
      });
      this.props.setNavBackground(false);
    }
  };

  render() {
    const hero = require("../../assets/cases/case-5-ziggodamtotdamloop/damtotdamloop-hero.jpg");
    const backButton = require("../../assets/icons/back.png");
    return (
      <Fragment>
        <BackButton
          onClick={() => this.setState({ toBack: true, hasBackground: false })}
          toBack={this.state.toBack}
          hasBackground={this.state.hasBackground}
        >
          <BackArrow src={backButton} alt="Back to work" />
        </BackButton>
        <CaseWrapper>
          <Hero image={hero}>
            <div>
              <TitleTab>
                <ClientHeader>J. Walter Thompson Amsterdam</ClientHeader>
                <Title>Ziggo Dam To Dam Loop</Title>
                <TechniqueTitle>
                  The future has come. Ziggo's streaming is so efficient that you can watch anything anywhere, even while running a marathon
                </TechniqueTitle>
              </TitleTab>
            </div>
          </Hero>
          <Introduction ref={this.introRef}>
            <QuickInfo>
              <InfoText>
                <InfoClient>J. Walter Thompson Amsterdam</InfoClient>
                <InfoTitle>Ziggo Dam To Dam Loop</InfoTitle>
                <InfoSubtitle>
                  The future has come. Ziggo's streaming is so efficient that you can watch anything anywhere, even while running a marathon
                </InfoSubtitle>
                <Paragraph>
                  To showcase the power of Ziggo's ability to provide on-demand watching in any situation, J. Walter Thompson was prepared to give Ziggo a demo that they were even prepared for the weirdest ones. To do this, we proposed to create a campaign film that presents the idea "Anywhere, Anytime" in combination with Dutch culture, by using the annual Dam-tot-Dam marathon. With Ziggo, you can truly watch anywhere, anytime.
                </Paragraph>
              </InfoText>
              <InfoListContainer>
                <InfoList>
                  <InfoItem>
                    <InfoSubject>Project Client</InfoSubject>
                    <InfoContent>Ziggo</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoSubject>Focus</InfoSubject>
                    <InfoContent>Concept Development</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoSubject>Date</InfoSubject>
                    <InfoContent>none</InfoContent>
                  </InfoItem>
                </InfoList>
              </InfoListContainer>
            </QuickInfo>
            <Problem>
              <Subheading>Problem</Subheading>
              <Paragraph>
                Within the agency, people were joking around about some cool ideas surrounding the slogan "Anywhere, Anytime". Naturally, one of the employees ran around the office with an iPad on his back. This sparked the concept.
              </Paragraph>
              <Paragraph>
                The issue was how a team of us could present this idea effectively, considering budget, audience, reach, impact, and difficulty of completion. The plan was risky, required a lot of coordination and consideration for potential mishaps, would require on-the-spot recovery, and could backfire quite significantly if it failed. 
              </Paragraph>
            </Problem>
          </Introduction>
          <Process>
            <Subheading>Process</Subheading>
            <Paragraph>
              I was added to a team that would work on developing the concept and seeing what is possible with the time constraints. We considered the following elements:
              <OrderedList>
                <li>Where are there potential risks of losing connection to Ziggo's services?</li>
                <li>What kind of shots could we get, and where can we film?</li>
                <li>How can we get people involved in watching Ziggo's shows during the Marathon?</li>
                <li>How can we run with an iPad on our backs without it bouncing?</li>
                <li>Can we keep the budget small?</li>
              </OrderedList>
            </Paragraph>
            <TinyHeading>Location Spotting</TinyHeading>
            <Paragraph>
              The process required a bikeride along the marathon route to test the connection. Additionally, the ride enabled some scouting opportunities to find good shots to shoot at, and where we could potentially provide checkpoints to make up for any mishaps. This information was presented to the team via a map and some shots of the area compiled in a powerpoint presentation. A further album of images was sent to influence weather as well.
            </Paragraph>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-5-ziggodamtotdamloop/Slide2.jpg")} alt="Route Analysis 1" />
              <img src={require("../../assets/cases/case-5-ziggodamtotdamloop/Slide3.jpg")} alt="Route Analysis 2" />
            </CaseImagesCenter>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-5-ziggodamtotdamloop/Slide4.jpg")} alt="Route Analysis 3" />
              <img src={require("../../assets/cases/case-5-ziggodamtotdamloop/Slide5.jpg")} alt="Route Analysis 4" />
            </CaseImagesCenter>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-5-ziggodamtotdamloop/Slide6.jpg")} alt="Route Analysis 5" />
            </CaseImagesCenter>
            <Paragraph>
              Alongside this, we had gotten in touch with an individual from the US who has a specialty in creating a cheap but stable harness that would allow a runner to run with an iPad on the back. We made a deal with her to produce a few of them so that we could keep our budget low. Additionally, she would want to work with us to create a harness that would suit our exact needs, which was precisely our goal.
            </Paragraph>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-5-ziggodamtotdamloop/harness1.png")} alt="Harness Front" />
              <img src={require("../../assets/cases/case-5-ziggodamtotdamloop/harness2.png")} alt="Harness Back" />
            </CaseImagesCenter>
            <Paragraph>
              After getting all the components sorted to get the campaign going, we only needed one last thing: the company's approval to execute it.
            </Paragraph>
          </Process>
          <Results>
            <Subheading>Result</Subheading>
            <Paragraph>
              Unfortunately, due to a combination of time constrains, uncertainty, and some budgetting issues, we weren't able to execute the campaign, and the filming never occurred. Had we acted earlier, maybe there would've been a chance to make the budget work more efficiently, and discuss the campaign with more leisure and space. But due to the close deadline we had, we decided it would be smart not to continue while in this position.
            </Paragraph>
          </Results>
          <NextCase
            onClick={() => this.setState({ animateCase: "/shuttershare" })}
            animating={!!this.state.animateCase}
          >
            <NextLink>
              Next: <NextCaseTitle>ShutterShare</NextCaseTitle>
            </NextLink>
          </NextCase>
        </CaseWrapper>
      </Fragment>
    );
  }
}

export default withRouter(ZiggoDamTotDamLoop);
