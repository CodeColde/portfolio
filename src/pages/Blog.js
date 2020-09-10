import React, { useState } from 'react';
import {
  Wrapper,
  SliderContainer,
  BlogTag,
  Relativer,
  BlogTagWrapper,
  ContentWrapper,
  ImageContainer,
  TitleContainer,
  // PaginationContainer,
  Slide,
  // Arrow,
  // Button,
  Title,
} from '../styles/Blog.styles';
import meta from "./blog/meta";

// import PrevIcon from "../assets/icons/right-chevron.png";
// import NextIcon from "../assets/icons/right-chevron.png";
import { HomeLink, TextLink } from '../styles/Work.styles';
import useDelayedLinking from '../utils/useDelayedLinking';

const Blog = () => {
  const [animateHome, setAnimateHome] = useState(false);
  const [animatePost, setAnimatePost] = useState("");

  useDelayedLinking(400, '/', animateHome);
  useDelayedLinking(1000, `/blog${animatePost}`, animatePost);

  const carousel = React.useRef(null);

  const settings = {
    accessibility: true,
    arrows: false,
    dots: false,
    draggable: true,
    swipe: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <HomeLink onClick={() => setAnimateHome(true)} animating={animateHome}>
        <TextLink>Home</TextLink>
      </HomeLink>
      <SliderContainer {...settings} ref={carousel}>
        {meta.map((page, i) => (
          <div key={i}>
            <Slide>
              <ImageContainer image={page.coverImg}>
                <BlogTagWrapper animating={!!animatePost && animatePost === page.link}>
                  <Relativer>
                    <BlogTag>{page.tag}</BlogTag>
                  </Relativer>
                </BlogTagWrapper>
                <ContentWrapper animating={!!animatePost && animatePost === page.link}>
                  <TitleContainer>
                    <Title onClick={() => setAnimatePost(page.link)}>
                      {page.title}
                    </Title>
                  </TitleContainer>
                  {/* <PaginationContainer>
                    <Arrow onClick={() => carousel.current.slickPrev()}>
                      <Button src={PrevIcon} alt="Previous case" />
                      <span>Prev</span>
                    </Arrow>
                    <Arrow onClick={() => carousel.current.slickNext()}>
                      <span>Next</span>
                      <Button src={NextIcon} alt="Next case" inverted />
                    </Arrow>
                  </PaginationContainer> */}
                </ContentWrapper>
              </ImageContainer>
            </Slide>
          </div>
        ))}
      </SliderContainer>
    </Wrapper>
  )
}

export default Blog;