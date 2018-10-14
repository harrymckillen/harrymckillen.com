var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-23295796-1']);
  _gaq.push(['_trackPageview']);
  (function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// use a tiny lib called baffle.js to obfuscating the text
baffle('.main-title')
  .start()
  .set({
      characters: '+-/><!=*#0123456789',
      speed: 150
  }
  ).reveal(2500);
