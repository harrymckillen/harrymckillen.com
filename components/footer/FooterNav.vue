<script setup>
defineProps({
  showContact: {
    type: Boolean,
    default: true,
  },
  showSocials: {
    type: Boolean,
    default: true,
  },
})
</script>
<template>
  <footer id="contact" class="float-left w-full anchor footer-nav">
    <section
      v-if="showContact"
      class="text-center w-10/12 sm:w-2/3 lg:w-3/5 mx-auto"
    >
      <h2 class="text-4xl mb-8 flicker-text">Contact</h2>
      <p class="text-xl sm:text-2xl">
        Feel free to reach out to me at
        <a class="underline" href="mailto:hi@harrymckillen.com"
          >hi@harrymckillen.com</a
        >
      </p>
    </section>

    <section
      v-if="showSocials"
      class="w-2/3 md:w-1/4 mx-auto text-center mt-4 mb-6"
    >
      <h3 class="my-4">or via <span class="sr-only">Social Media</span></h3>
      <div class="the-socials flex justify-center">
        <a
          class="mx-3 flex-shrink-0"
          href="https://twitter.com/_hmck"
          target="_blank"
          ><img class="icon" src="~/assets/svgs/twitter.svg" alt="Twitter" /></a
        ><a
          class="mx-3 flex-shrink-0"
          href="http://www.linkedin.com/in/harrymckillen"
          target="_blank"
          ><img
            class="icon"
            src="~/assets/svgs/linkedin.svg"
            alt="LinkedIn" /></a
        ><a
          class="mx-3 flex-shrink-0"
          href="https://github.com/harrymckillen"
          target="_blank"
          ><img class="icon" src="~/assets/svgs/github.svg" alt="GitHub"
        /></a>
      </div>
    </section>
    <div class="made-80s mx-auto mt-16">
      <small class="made">Made in the</small><span class="eighties">80's</span>
      <div class="pink-triangle"></div>
      <div class="white-triangle"></div>
    </div>
    <p class="w-full text-center mt-4 p-4">
      &copy; Harry McKillen, 1983 &mdash; Present
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.footer-nav {
  .made-80s {
    position: relative;
    z-index: 10;
    font-family: 'Mr Dafoe', cursive;
    color: #fff;
    text-shadow: 2px 2px 0 #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 200px;
    height: 200px;
    text-align: center;
    vertical-align: middle;
    transform: rotate(10deg);

    .made {
      margin-top: 0;
      line-height: 1;
      font-size: 1.75em;
    }

    .eighties {
      font-family: Monoton, cursive;
      font-size: 4.25em;
    }

    .pink-triangle {
      position: absolute;
      z-index: -1;
      clip-path: polygon(0 0, 37% 100%, 100% 0);
      background: #f867fa;
      width: 160px;
      height: 160px;
      transform: rotate(-10deg);
    }

    .white-triangle {
      position: absolute;
      top: 10px;
      left: 5px;
      z-index: -2;
      clip-path: polygon(0 0, 37% 100%, 100% 0);
      background: #fff;
      width: 160px;
      height: 160px;
      transform: rotate(-13deg);
    }
  }
  .the-socials {
    .icon {
      width: 6.5vw;
      height: 6.5vw;
      display: inline-block;
      padding: 0 0.5em;
      @media screen and (max-width: 640px) {
        width: 64px;
        height: 64px;
      }
    }
  }
}
</style>
