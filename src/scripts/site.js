import { setCookie, getCookie } from './modules/cookies.js';
import { prettyConsole, gaInit } from './modules/utils.js';

/*
  Initialize below here;
*/
prettyConsole(
  "Hey, thanks for checking out my site. If you want to see more code of mine, please see: https://github.com/harrymckillen",
  "#000",
  "#FFBF00",
  "20px",
  "monospace"
);

gaInit();
