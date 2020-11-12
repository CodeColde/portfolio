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
  CaseImagesLeft,
  NextLink,
  NextCaseTitle,
  OrderedList,
} from "../../styles/Case.styles";
import { withRouter } from "react-router";
import BackButton from "../../components/BackButton";
import storeNavBg from "../../utils/storeNavBg";

// Has a scroll function to detect if the body is a black background and therefore
// Has to switch the backbutton to a black background

class Adscope extends Component {
  constructor(props) {
    super(props);
    this.introRef = createRef();

    this.state = {
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
    if (this.state.animateCase) {
      setTimeout(() => {
        storeNavBg(false);

        this.props.history.push(`/work${this.state.animateCase}`);
        window.scrollTo(0, 0);
      }, 400);
    }
  }

  render() {
    const hero = require("../../assets/cases/case-2-adscope/adscope-hero.jpg");
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
                <Title>Adscope</Title>
                <TechniqueTitle>
                Micromanaging, transparency, efficiency, output; with a world so busy, organization has priority above all else for smooth operations
                </TechniqueTitle>
              </TitleTab>
            </div>
          </Hero>
          <Introduction ref={this.introRef}>
            <QuickInfo>
              <InfoText>
                <InfoClient>Northumbria University</InfoClient>
                <InfoTitle>Adscope</InfoTitle>
                <InfoSubtitle>
                  Micromanaging, transparency, efficiency, output; with a world so busy, organization has priority above all else for smooth operations
                </InfoSubtitle>
                <Paragraph>
                  For my dissertation I took a deeper dive into the complex nature behind advertising industries, inspired by my two terms at J. Walter Thompson Amsterdam. The goal was to create a system that illustrated the research I delved into regarding some real world issue the advertising industry has, and to evaluate how user experience can tackle certain problems they may have.
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
                    <InfoContent>UX / Back-End</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoSubject>Date</InfoSubject>
                    <InfoContent>April 2017</InfoContent>
                  </InfoItem>
                </InfoList>
              </InfoListContainer>
            </QuickInfo>
            <Problem>
              <Subheading>Problem</Subheading>
              <Paragraph>
                My research found three core problems the advertising industry had that this project would hammer into. These were:
              </Paragraph>
              <OrderedList>
                <li>Lack of Transparency</li>
                <li>Maximizing Productivity</li>
                <li>Lasting Clientele</li>
              </OrderedList>
              <Paragraph>
                The lack of transparency is a frequent complain clients have with advertising agencies, though this seems to tackle the financial aspect the most: What is it we're paying for?
              </Paragraph>
              <Paragraph>
                Maximizing productivity is the goal for any agency. Each has their own method that works best, applying elements like scrum or waterfall productivity methods or structuring their workforce a certain way, to name a few. To see this occur, one would want to tackle the ability to track their workforce. 
              </Paragraph>
              <Paragraph>
              	For a consistent revenue stream, lasting clientele creates definite business. But most clients tend to leave after a campaign is over or when they found another. This problem ties into most of the others; efficient productivity and complete transparency are some of the things that clients love. How does an agency keep a client.
              </Paragraph>
            </Problem>
          </Introduction>
          <Process>
            <Subheading>Process</Subheading>
            <TinyHeading>Branding</TinyHeading>
            <Paragraph>
              The platform is in its essence focused on the data, clients, and the content, and rather than applying Adscope's own brand image to it, the base color of white with a reddish accent creates a company's own interest in taking part in the platform without making use of a heavily branded platform. The font is also legible and simplistic. Below the full guide.
            </Paragraph>
            <CaseImagesLeft>
              <img src={require("../../assets/cases/case-2-adscope/asbranding.png")} alt="branding" />
            </CaseImagesLeft>
            <Paragraph>
              The development of the prototype of the productivity platform was already seeming too large, and so the project was cut down to the bare minimum to tackle the three important features. The product had the following core features.
            </Paragraph>
            <TinyHeading>Communication</TinyHeading>
            <Paragraph>
              The project had several different methods to communicate. To set it up, I created a contact system that showed client information, colleague information, or resource information for quick easy access. This information is granted to all or selected colleagues on the platform.
            </Paragraph>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-2-adscope/addressbook.png")} alt="Address Book" />
              <img src={require("../../assets/cases/case-2-adscope/contactcard.png")} alt="Contact Card" />
            </CaseImagesCenter>
            <Paragraph>
              The card and user system is applied to the rest of the system as well.
            </Paragraph>
            <TinyHeading>Projects &amp; Clients</TinyHeading>
            <Paragraph>
              Creating a hub for the project and a hub for new/existing clients is what allows the system to organize everything. In order to practice transparency, the system allows anything to be logged on the basis of who's involved in the process, and hence a company gets full insight as to who attended and worked on what, if they want to see the breakdown of the costs.
            </Paragraph>
            <CaseImagesLeft>
              <img src={require("../../assets/cases/case-2-adscope/ashome.png")} alt="Home Page" />
            </CaseImagesLeft>
            <Paragraph>
              Clicking on a project will link the user to the first image below. Clicking on a client would like them to the second. The hubs look the same, but one is divided for client information and the other for a project.
            </Paragraph>
            <CaseImagesLeft>
              <img src={require("../../assets/cases/case-2-adscope/asprojects.png")} alt="Projects List" />
            </CaseImagesLeft>
            <CaseImagesLeft>
              <img src={require("../../assets/cases/case-2-adscope/asclients.png")} alt="Clients List" />
            </CaseImagesLeft>
            <Paragraph>
              Each project has the following functionality that can be ammended at any time. The clients have less, but similar features.
            </Paragraph>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-2-adscope/project1.png")} alt="Projects One" />
              <img src={require("../../assets/cases/case-2-adscope/project2.png")} alt="Projects Two" />
            </CaseImagesCenter>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-2-adscope/project3.png")} alt="Projects Three" />
              <img src={require("../../assets/cases/case-2-adscope/project4.png")} alt="Projects Four" />
            </CaseImagesCenter>
            <TinyHeading>Hour Logging</TinyHeading>
            <Paragraph>
              The most important feature in a project hub is the tasks section. This is where a project manager can delegate tasks to colleagues, and this will allow colleagues to work on them and track them in their own available time. Tracking the time that colleagues work on a project is key to transparent billing. There are 2 ways they log their hours. The first is through events:
            </Paragraph>
            <CaseImagesLeft>
              <img src={require("../../assets/cases/case-2-adscope/events.png")} alt="Events" />
            </CaseImagesLeft>
            <Paragraph>
              By setting up a calendar event, either for meetings or a scheduled workblock, either alone or with others, the user creates a timeslot that delegates their salary and calculates the amount of time human resources are needed to be put to work in a given time period. These events will be placed on the invoice for more detail to the client, but will omit the individuals involved, as well as their salaries, for privacy. One feature missing here is to toggle between billable and non-billable, such as for time spent on brainstorming a project to pitch to a client, for example.
            </Paragraph>
            <Paragraph>
              The second way one can log their hours is via their tasks, and a built-in timer that runs passively.
            </Paragraph>
            <CaseImagesLeft>
              <img src={require("../../assets/cases/case-2-adscope/timer.png")} alt="Timer" />
            </CaseImagesLeft>
            <TinyHeading>Invoice</TinyHeading>
            <Paragraph>
              A generated invoice would look something like below:
            </Paragraph>
            <CaseImagesCenter>
              <img src={require("../../assets/cases/case-2-adscope/invoice.png")} alt="Invoice" />
            </CaseImagesCenter>
            <Paragraph>
              As stated in the previous section, the invoice is currently missing details that are equally important, but was ommitted to convey the basics within the available timeframe.
            </Paragraph>
          </Process>
          <Results>
            <Subheading>Result</Subheading>
            <Paragraph>
              As I had recently come out of a job experience working as a project management intern, I took this opportunity to get to know the industry better through this project. Although that goal was accomplished, there was a lot more I wanted to do with this program.
            </Paragraph>
            <Paragraph>
              The program feels incredibly incomplete, and despite the available functionality working well, and user tests proving users learn to use the system quickly, there are still some UX flaws, mainly surrounding generating project invoices, that need fixing, and a lot of functionality that needs implementing. 
            </Paragraph>
            <Paragraph>
              Additionally, after doing more research, a framework named Laravel would have solved a ton of development issues I came across and had to fix, which decreased the amount of time I had available. It sparked the need to prepare more, launching my own catalogue of frameworks and what they do, to allow me to be more prepared in the future.
            </Paragraph>
            <Paragraph>
              Despite the clear flaws, the project was a massive learning experience, and the generation of the invoice and the system as it stands at this point works, including the timer and the calendar, meshing alongside key components within the system.
            </Paragraph>
          </Results>
          <NextCase
            onClick={() => this.setState({ animateCase: "/tiptopmusic" })}
            animating={!!this.state.animateCase}
          >
            <NextLink>
              Next: <NextCaseTitle>Tip Top Music</NextCaseTitle>
            </NextLink>
          </NextCase>
        </CaseWrapper>
      </Fragment>
    );
  }
}

export default withRouter(Adscope);
