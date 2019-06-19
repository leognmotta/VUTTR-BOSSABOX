import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0; 
  font-family: 'PT Mono', monospace;
}
body, html {
  background: #eee;
  font-size: 20px;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
}

h1, h2, h3, p, a, label, button {
  color: #170C3A;
}

h1 {
  font-size: 42px;
}

h2 {
  font-size: 36px;
}

h3 {
  font-size: 30px;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
`;

export default GlobalStyle;