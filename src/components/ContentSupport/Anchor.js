import React from 'react';
import styled from "styled-components";
import theme from '../../styles/theme';

const AnchorLink = ({ to, children }) => {
  return <Tag href={to} target="_blank" rel="noopener noreferrer">{children}</Tag>
}

export default AnchorLink;

const Tag = styled.a`
  font-size: 1.3em;
  text-transform: capitalize;
  font-weight: 600;
  text-decoration: none;
  color: ${theme.colors.red};
  line-height: 35px;
  margin-bottom: 25px;
  z-index: 3;
  position: relative;
`;