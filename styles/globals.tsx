import React from "react";
import { Platform } from "react-native";
import { createGlobalStyle } from "styled-components";
let GlobalStyle: React.FC;
if (Platform.OS !== "web") {
  GlobalStyle = function Teste() {
    return null;
  };
} else {
  GlobalStyle = createGlobalStyle`
  
  
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Open Sans', sans-serif;
    }
  
    a {
      color: inherit;
      text-decoration: none;
    }
  
    body {
      min-height: 100vh;
    }
  
    input,
    textarea,
    button {
      font: 400 1rem 'Open Sans', sans-serif;
    }
  
    button {
      cursor: pointer;
      border-radius: 0.1rem;
    }
  
  `;
}

export { GlobalStyle };
