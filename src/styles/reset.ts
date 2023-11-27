import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 1.4;
  }

  html {
    font-size: 16px;
  }

  body {
    font-size: 1rem;
    color: #000;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol,
  ul,
  li {
    list-style: none;
  }
`;
