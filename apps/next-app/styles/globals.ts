import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    color: ${({ theme }) => theme.colors.text.default};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    background: ${({ theme }) => theme.colors.container.default};
    color: ${({ theme }) => theme.colors.text.default};
    min-height: 100vh;
  }

  input,
  textarea,
  button {
    font: 400 1rem 'Inter', sans-serif;
  }

  button {
    cursor: pointer;
    border-radius: 0.1rem;
  }

  .snackbar-style {
    margin-top: 3rem;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
`;
