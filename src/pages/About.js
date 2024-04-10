import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Wrapper,
  Heading,
  Subtitle,
  X,
  ExperienceContainer,
  ExperienceTitle,
  DetailBlock,
  DetailPoint,
  WorkLink,
  TextLink,
  HomeLink,
  HomeText,
  Hero,
  Body,
  ImageBackground,
  Overlay,
  Container,
  RoleTime,
  Role,
  Time,
  Client
} from "../styles/About.styles";
import useDelayedLinking from "../utils/useDelayedLinking";

const About = () => {
  const [animateWork, setAnimateWork] = useState(false);
  const [animateHome, setAnimateHome] = useState(false);

  useDelayedLinking(400, '/work', animateWork);
  useDelayedLinking(400, '/', animateHome);

  const canada = require("../assets/images/canada.jpg");

  return (
    <Wrapper>
      <HomeLink onClick={() => setAnimateHome(true)} animating={animateHome}>
        <HomeText>Home</HomeText>
      </HomeLink>
      <Body>
        <ImageBackground backgroundImage={canada}>
          <Overlay />
        </ImageBackground>
        <Container>
          <Hero>
            <Heading>Who am i?</Heading>
            <Subtitle>
              So I'm Hayo Friese, a <X>Dutch third culture kid</X>. I've lived
              in Japan, Belgium, Czech Republic, Netherlands, England, and
              briefly in Tanzania and Canada. I'm a former <X>dancer</X> and{" "}
              <X>sk8rboy</X>, <X>gamer</X>, and <X>hobbyist</X> (as in I know
              how to knit and stuff). In general, I'm just <X>always curious</X>
              . I'd like to think I'm a solid <X>web developer</X>, but I know I
              have much to learn, and I make it a mission to learn something new{" "}
              <X>every day</X>. I hope I get the chance to <X>grow</X> with{" "}
              <X>you</X>!
            </Subtitle>
          </Hero>
          <ExperienceContainer>
            <ExperienceTitle>EXPERIENCE</ExperienceTitle>
            <DetailBlock>
              <RoleTime>
                <Role>Junior UX Designer</Role>
                <Time>Summer 2015</Time>
              </RoleTime>
              <Client>J. Walter Thompson Amsterdam</Client>
              <DetailPoint>
                Worked on designing an unlaunched app for a car company and various other campaigns
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Concept Researcher &amp; Producer Intern</Role>
                <Time>Summer 2016</Time>
              </RoleTime>
              <Client>J. Walter Thompson Amsterdam</Client>
              <DetailPoint>
                See case studies for information of my tenure
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>PHP Intern &amp; Web Team Manager</Role>
                <Time>2018</Time>
              </RoleTime>
              <Client>D-TT</Client>
              <DetailPoint>
                Inspired my desire to pursue web development fulltime
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Junior Frontend Developer &amp; Squad Master</Role>
                <Time>2019</Time>
              </RoleTime>
              <Client>Oberon</Client>
              <DetailPoint>
                See case studies for information of my tenure
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Frontend Developer</Role>
                <Time>2020 (Current)</Time>
              </RoleTime>
              <Client>Newzoo</Client>
              <DetailPoint>
                Core team member developing the Newzoo Platform
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Software Engineer</Role>
                <Time>2021 - 2022</Time>
              </RoleTime>
              <Client>Native Instruments</Client>
              <DetailPoint>
                Core team member developing the Native Access software
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Product Manager</Role>
                <Time>2022 (Current)</Time>
              </RoleTime>
              <Client>Native Instruments</Client>
              <DetailPoint>
                Driving initiatives for catalog management, ownership, onboarding and usage.
              </DetailPoint>
            </DetailBlock>
          </ExperienceContainer>
          <ExperienceContainer>
            <ExperienceTitle>EDUCATION</ExperienceTitle>
            <DetailBlock>
              <RoleTime>
                <Role>IB Certificates</Role>
                <Time>2008 - 2012</Time>
              </RoleTime>
              <Client>American School of The Hague</Client>
              <DetailPoint />
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Bcs Games Design &amp; Production</Role>
                <Time>2013 - 2015</Time>
              </RoleTime>
              <Client>Northumbria University</Client>
              <DetailPoint>
                Accumulative Grade: 2:1. Quit to further pursue web development
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Bcs in Web Development &amp; Design</Role>
                <Time>2015 - 2017</Time>
              </RoleTime>
              <Client>Northumbria University</Client>
              <DetailPoint>
                Graduated with a first class honors degree, with a first
              </DetailPoint>
            </DetailBlock>
          </ExperienceContainer>
          <ExperienceContainer>
            <ExperienceTitle>EXTRA THINGS</ExperienceTitle>
            <DetailBlock>
              <RoleTime>
                <Role>Volunteer Fundi* - Engikaret</Role>
                <Time>2013</Time>
              </RoleTime>
              <Client>Projects Abroad - Tanzania</Client>
              <DetailPoint>
                *Swahili for Builder
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Level 1 Snowboard Instructor</Role>
                <Time>2013</Time>
              </RoleTime>
              <Client>Nonstop Snowboarding - Canada</Client>
              <DetailPoint>
                Qualified to teach beginners in Canada. Might need to renew my license :3
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Level 1 Dance Instructor</Role>
                <Time>2014</Time>
              </RoleTime>
              <Client>Amanda Nicole School of Dance - England</Client>
              <DetailPoint>
                Qualified to teach beginners
              </DetailPoint>
            </DetailBlock>
            <DetailBlock>
              <RoleTime>
                <Role>Society Marketer &amp; Promotions</Role>
                <Time>2014-2015</Time>
              </RoleTime>
              <Client>Northumbria Dance Society - England</Client>
              <DetailPoint>
              Awarded Highly Commended Society of the Year
              </DetailPoint>
            </DetailBlock>
          </ExperienceContainer>
        </Container>
      </Body>
      <WorkLink onClick={() => setAnimateWork(true)} animating={animateWork}>
        <TextLink>Take a look at some of my work!</TextLink>
      </WorkLink>
    </Wrapper>
  );
};

export default withRouter(About);
