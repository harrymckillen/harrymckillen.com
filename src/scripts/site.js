import { setCookie, getCookie } from './modules/cookies.js';
import { prettyConsole, gaInit } from './modules/utils.js';


Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})

var app = new Vue({
  el: '#console',
  data: {
    cli: '',
    pastCmds: [
      { text: 'cd /var/www' },
      { text: 'launch cv' },

    ]
  },
  methods: {
    runCmd: function (value) {
      console.log(value);
      this.pastCmds.push({ text: value });
      this.cli = '';
    }
  }
})

/*
  Initialize below here;
*/
prettyConsole(
  'Hey, thanks for checking out my site. If you want to see more code of mine, please see: https://github.com/harrymckillen',
  '#111',
  '#0f0',
  '20px',
  'monospace'
);
