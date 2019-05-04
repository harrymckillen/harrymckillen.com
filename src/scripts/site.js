// defaults

let themes = {
  default: '#111',
  theme1: '#00a',
  theme1alt: '#ccc'
};

// js utils

// basic cookie management

function setCookie(name, value, expiry) {
  var d = new Date();
  d.setTime(d.getTime() + (expiry*24*60*60*1000));
  var expires = 'expires='+ d.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

function getCookie(name) {
  var cookie = name + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for(var i = 0; i < cookieArray.length; i++) {
    var c = cookieArray[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookie) == 0) {
      return c.substring(cookie.length, c.length);
    }
  }
  return '';
}


// if a cookie exists, sets that style, if not, sets the default style
function themeCookie() {
  var themeColorMeta = document.querySelectorAll('[name="theme-color"]');
  var theme = getCookie('theme');
  if (theme != '') {
    document.querySelector('body').setAttribute('class', theme);
    themeColorMeta[0].setAttribute('content', themes[theme]);
    var activeButton = document.querySelectorAll('[data-themeid="'+theme+'"]');
    activeButton[0].classList.add('active');
  } else {
    themeColorMeta[0].setAttribute('content', themes.default);
    var activeButton = document.querySelectorAll('[data-themeid="default"]');
    activeButton[0].classList.add('active');
    setCookie('theme', 'default', 30);
  }
}

// theme changer extraordinaire
var changeTheme = function() {
    var themeColorMeta = document.querySelectorAll('[name="theme-color"]');
    var theme = getCookie('theme');
    var attribute = this.getAttribute('data-themeid');
    var activeButton = document.getElementsByClassName('theme-button active');

    if(activeButton[0].classList.contains('active')){
      activeButton[0].classList.remove('active');
    }

    this.setAttribute('class', 'theme-button active');
    document.querySelector('body').setAttribute('class', attribute);
    themeColorMeta[0].setAttribute('content', themes[theme]);
    setCookie('theme', attribute, 30);

    // total hack to try and fix the theme switcher
    window.location.reload();
};

// binds to any element with the class theme-button
var classname = document.getElementsByClassName('theme-button');
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', changeTheme, false);
}

// small function to provide simulated blinking for a cursor
function blinker() {
  var cursor = document.getElementsByClassName('blinking-cursor');
  setInterval(function() {
    if(cursor[0].classList.contains('show')){
      cursor[0].classList.remove('show');
    }
    else {
      cursor[0].classList.add('show');
    }
  }, 700);
}

/*
  Initialize below here;

*/

// google analytics
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-23295796-1']);
  _gaq.push(['_trackPageview']);
  (function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// use a tiny lib called baffle.js to obfuscate the text
baffle('.main-title')
  .start()
  .set({
      characters: '+-/><!=*#0123456789',
      speed: 150
  }
  ).reveal(2500);

// run the themeCookie function
themeCookie();

// run the blinking function
blinker();

console.log(
  '%c Hey, thanks for checking out my site. If you want to see more code of mine, please see: https://github.com/harrymckillen',
  'background: #111; color: #0f0; font-size: 20px; fontfont-family: monospace;'
  );
