<template>
  <div
    id="about"
    class="about-section neon-border text-center w-12/12 sm:w-3/4 lg:w-1/2 mx-4 sm:mx-auto"
  >
    <div class="text">
      <h2 class="text-4xl pt-8 mb-8 flicker-text">About</h2>
      <div class="text-xl sm:text-2xl w-10/12 mx-auto pb-12">
        <p>
          Have 19+ years developing with a variety of Web Technologies. BSc. in
          Computer Science from the University of Limerick. Currently a Senior
          Frontend Engineer with
          <a href="https://optifly.com" class="underline" target="_blank"
            >Optifly</a
          >.
        </p>
        <p class="pt-4">
          Previous roles include; Software Architect, Team Lead, Web Developer,
          Frontend Engineer.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-section {
  &.neon-border {
    background: #060231;
    border: 0.2rem solid #fff;
    border-radius: 2rem;
    padding: 0.4em;
    box-shadow:
      0 0 0.2rem #fff,
      0 0 0.2rem #fff,
      0 0 2rem #f867fa,
      0 0 0.8rem #f867fa,
      0 0 2.8rem #f867fa,
      inset 0 0 1.3rem #f867fa;
  }
}
</style>
