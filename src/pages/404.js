import React from 'react';
import {
  Wrapper,
  ContentContainer,
  ErrorCode,
  Break,
  Anchor,
} from "../styles/404.styles";

const NotFound = () => {
  return (
    <Wrapper>
      <ContentContainer>
        <ErrorCode>
          404
        </ErrorCode>
        <Break />
        <p>Oops! That page doesn't seem to exist! Let's get ourselves back to business.</p>
        <Anchor href="/">Go Back</Anchor>
      </ContentContainer>
    </Wrapper>
  )
}

export default NotFound;