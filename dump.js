// defaults

// let themes = {
//   default: '#111',
//   theme1: '#00a',
//   theme1alt: '#ccc'
// };

// // if a cookie exists, sets that style, if not, sets the default style
// function themeCookie() {
//   var themeColorMeta = document.querySelectorAll('[name="theme-color"]');
//   var theme = getCookie('theme');
//   if (theme != '') {
//     document.querySelector('body').setAttribute('class', theme);
//     themeColorMeta[0].setAttribute('content', themes[theme]);
//     // var activeButton = document.querySelectorAll('[data-themeid="'+theme+'"]');
//     // activeButton[0].classList.add('active');
//   } else {
//     themeColorMeta[0].setAttribute('content', themes.default);
//     // var activeButton = document.querySelectorAll('[data-themeid="default"]');
//     // activeButton[0].classList.add('active');
//     setCookie('theme', 'default', 30);
//   }
// }

// // theme changer extraordinaire
// var changeTheme = function() {
//     var themeColorMeta = document.querySelectorAll('[name="theme-color"]');
//     var theme = getCookie('theme');
//     var attribute = this.getAttribute('data-themeid');
//     var activeButton = document.getElementsByClassName('theme-button active');

//     if(activeButton[0].classList.contains('active')){
//       activeButton[0].classList.remove('active');
//     }

//     this.setAttribute('class', 'theme-button active');
//     document.querySelector('body').setAttribute('class', attribute);
//     themeColorMeta[0].setAttribute('content', themes[theme]);
//     setCookie('theme', attribute, 30);

//     // total hack to try and fix the theme switcher, as
//     // on Android, a change to the theme-color meta data,
//     // does not trigger a colour change
//     window.location.reload();
// };

// // binds to any element with the class theme-button
// var classname = document.getElementsByClassName('theme-button');
// for (var i = 0; i < classname.length; i++) {
//     classname[i].addEventListener('click', changeTheme, false);
// }

// run the themeCookie function
// themeCookie();
