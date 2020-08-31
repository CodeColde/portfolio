import styled from "styled-components";
import theme from "./theme";

export const Wrapper = styled.main`
  position: relative;
  display: block;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.colors.black};
`;

export const ContentContainer = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: auto;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${theme.colors.white}
`;

export const ErrorCode = styled.h1`
  font-size: 300px;
  font-weight: 600;
`;

export const Break = styled.div`
  height: 6px;
  width: 300px;
  background-color: ${theme.colors.white};
  margin: 20px auto 56px;
`;

export const Anchor = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding: 12px 32px;
  border-radius: 28px;
  border: 2px solid ${theme.colors.blue};
  background-color: ${theme.colors.blue};
  margin-top: 48px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: transparent;
  }
`