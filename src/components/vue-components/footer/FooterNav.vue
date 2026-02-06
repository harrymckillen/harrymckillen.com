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
});
</script>
<template>
  <footer id="contact" class="float-left w-full anchor footer-nav">
    <section
      v-if="showContact"
      class="text-center w-10/12 sm:w-2/3 lg:w-3/5 mx-auto"
    >
      <h2>Contact</h2>
      <p class="text-xl sm:text-2xl">
        Feel free to reach out to me at
        <a href="mailto:hi@harrymckillen.com">hi@harrymckillen.com</a>
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
          href="http://www.linkedin.com/in/harrymckillen"
          target="_blank"
          ><img
            loading="lazy"
            class="icon"
            src="/svgs/linkedin.svg"
            alt="LinkedIn" /></a
        ><a
          class="mx-3 flex-shrink-0"
          href="https://github.com/harrymckillen"
          target="_blank"
          ><img loading="lazy" class="icon" src="/svgs/github.svg" alt="GitHub"
        /></a>
        <a
          class="mx-3 flex-shrink-0"
          href="https://bsky.app/profile/harrymckillen.com"
          target="_blank"
          ><img
            loading="lazy"
            class="icon"
            src="/svgs/bluesky.svg"
            alt="Twitter"
        /></a>
      </div>
    </section>
    <div class="made-80s mx-auto mt-16">
      <small class="made">Made in the</small><span class="eighties">80's</span>
      <div class="pink-triangle"></div>
      <div class="white-triangle"></div>
    </div>
    <p class="w-full text-center mt-4 p-4">
      &copy; Harry McKillen, 1983 &mdash; Present. Artisanally human crafted.
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.footer-nav {
  .made-80s {
    position: relative;
    z-index: 10;
    font-family: var(--font-heading);
    color: var(--color-default-white);
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
      font-size: 1.25em;
    }

    .eighties {
      font-family: var(--font-subheading);
      font-size: 4.25em;
      line-height: 1;
    }

    .pink-triangle {
      position: absolute;
      z-index: -1;
      clip-path: polygon(0 0, 37% 100%, 100% 0);
      background: var(--color-hot-pink);
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
      background: var(--color-default-white);
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
