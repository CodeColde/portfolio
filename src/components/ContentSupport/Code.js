import React from 'react';
import styled from 'styled-components';

const Code = ({ children }) => {
  return (
    <Block>
      <TextWrap>
        {children}
      </TextWrap>
    </Block>
  )
}

export default Code;

const Block = styled.div`
  background-color: #F2F2F2;
  padding: 25px 50px;
  margin: 25px 0;
`;

const TextWrap = styled.pre`
  line-height: 1.5;
  font-family: Menlo, Monaco, "Courier New", Courier, monospace;
  white-space: pre-wrap;
`;