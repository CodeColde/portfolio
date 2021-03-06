import React from "react";
import {
  Paragraph,
  Problem,
  Process,
  Results,
  Subheading,
  CaseImagesCenter,
  OrderedList,
  CaseImageCenterLarge
} from "../../styles/CaseContent.styles";
import Case from "../../components/Case";

const SchoolForJustice = () => {
  return (
    <Case
      subtitle=""
      IntroParagraphs={() => (
        <Paragraph>
          School for Justice is an education facility opened in Mumbai India to
          tackle the injustice child prostitution has in the country. Research
          conducted by JWT Amsterdam and Free a Girl Movement showed a shocking
          lack of punishment for those charged with child punishment. With a bold
          aim, this school will plan to create the most driven lawyers with the
          opportunity to take down the criminals that once owned them.
        </Paragraph>
      )}
    >
      <Problem>
        <Subheading>Problem</Subheading>
        <Paragraph>
          As a Project Manager intern, I was task to take charge of the website, managing the project under supervision of my mentor. My tasks were to create a one-page business site and oversee the general design and development process of both our agency and an external agency.
        </Paragraph>
        <Paragraph>
          The goal was to create a site that implements an Indian and academic vibe. The most important element of this site is to tell the story of these girls, their history, and their upcoming journey, then using presentation to emphasize it.
        </Paragraph>
      </Problem>
      <Process>
        <Subheading>Process</Subheading>
        <Paragraph>
          My job consisted of four tasks:
          <OrderedList>
            <li>Keeping tabs with the external agency we're working with</li>
            <li>Keep up to date with the online platform's progress</li>
            <li>Gain a complete understanding of the projects through client meetings and minutes</li>
            <li>Learn as much as possible on the process and the execution</li>
          </OrderedList>
        </Paragraph>
        <Paragraph>
          The blue print for the online campaign site was trying to create an element of story telling of Indian girls going to school. Ultimately we decided on a yearbook-style platform, with Indian colors and a scholarly vibe surrounding both the branding and the presentation of the students.
        </Paragraph>
        <Paragraph>
          For the first version to present to the clients, we tried to present the campaign in a one-page format, with external links to delve deeper through the browsing of each student. The UX of the site worked to enable this type of story telling, introducing the public to the campaign through a video on the first section, then the movement in written format on the next, the student section after, and then the place to donate.
        </Paragraph>
        <CaseImagesCenter>
          <img src={require("../../assets/cases/schoolforjustice/page1.jpg")} alt="Page Section One" />
          <img src={require("../../assets/cases/schoolforjustice/page2.jpg")} alt="Page Section Two" />
        </CaseImagesCenter>
        <CaseImagesCenter>
          <img src={require("../../assets/cases/schoolforjustice/page3hover1.jpg")} alt="Page Section Three Hovered" />
          <img src={require("../../assets/cases/schoolforjustice/page41.jpg")} alt="Page Section Four" />
        </CaseImagesCenter>
        <CaseImagesCenter>
          <img src={require("../../assets/cases/schoolforjustice/page6.jpg")} alt="Page Section Six" />
        </CaseImagesCenter>
        <Paragraph>
          Although the external agency did a fantastic job, some final ammendments were made at the office via our in-house developer and myself, and I was also tasked to reformat the screens for a presentation to the clients, outlining how the branding was chosen, the colors, the layout, and the organization of events. I additionally made an animation last minute to illustrate the manner in which the user would scroll on the site.
        </Paragraph>
        <CaseImageCenterLarge>
          <img src={require("../../assets/cases/schoolforjustice/animate.gif")} alt="Page Animation" />
        </CaseImageCenterLarge>
        <Paragraph>
          I was also tasked with creating a simplified one page template, to present to companies as an attempt to garner sponsorship for the act. Through this, I maintained the element of the original through the use of a screen-scrolling framework. The goal was for the page to be simple and filled with the information necessary to present to the potential sponsors what the act will do. After a few days this was the result:
        </Paragraph>
        <CaseImagesCenter>
          <img src={require("../../assets/cases/schoolforjustice/sfj1.png")} alt="One Pager Section One" />
          <img src={require("../../assets/cases/schoolforjustice/sfj2.png")} alt="One Pager Section Two" />
        </CaseImagesCenter>
        <CaseImagesCenter>
          <img src={require("../../assets/cases/schoolforjustice/sfj3.png")} alt="One Pager Section Three" />
          <img src={require("../../assets/cases/schoolforjustice/sfj4.png")} alt="One Pager Section Four" />
        </CaseImagesCenter>
        <CaseImagesCenter>
          <img src={require("../../assets/cases/schoolforjustice/sfj5.png")} alt="One Pager Section Five" />
        </CaseImagesCenter>
      </Process>
      <Results>
        <Subheading>Result</Subheading>
        <Paragraph>
          Although the project didn't end alongside my tenure, the time spent working with it was a memorable one. It was a process I had never done before, and I finally saw how group work functions in a professional setting compared to the expectations assumed within a scholarly environment.
        </Paragraph>
        <Paragraph>
          It took a while to adjust, but the results we're staggering. I made more of an effort to communicate important changes, understood the style we were going for to the extent that I could suggest adjustments or changes, and learnt a lot about how to think outside of the box about a project.
        </Paragraph>
        <Paragraph>
          I have a lot more to learn, but this project was my most thrilling experience to kickstart my journey to this career path.
        </Paragraph>
      </Results>
    </Case>
  )
}

export default SchoolForJustice;