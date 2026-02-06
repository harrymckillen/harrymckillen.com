<script setup>
import { computed } from "vue";
import { CURRENT_COMPANY, CURRENT_TITLE } from "../../consts";

const currentYear = new Date().getFullYear();
const titleArticle = computed(() => {
  const firstLetter = CURRENT_TITLE.charAt(0).toLowerCase();
  return "aeiou".includes(firstLetter) ? "an" : "a";
});
const yearsExperience = currentYear - 2002;
</script>

<template>
  <div
    id="about"
    class="about-section neon-border text-center w-12/12 sm:w-3/4 lg:w-2/3 mx-4 sm:mx-auto rounded-3xl"
  >
    <div class="text">
      <h2 class="pt-8">About</h2>
      <div class="text-xl sm:text-2xl w-10/12 mx-auto pb-12">
        <p>
          I'm a <strong>Software Engineer</strong> from Ireland. I have
          <strong>{{ yearsExperience }} years experience</strong> developing
          with a variety of different Technologies. I have a
          <strong>BSc. in Computer Science</strong> from the University of
          Limerick. Currently {{ titleArticle }}
          <strong>{{ CURRENT_TITLE }}</strong> for
          <strong>{{ CURRENT_COMPANY }}</strong
          >.
        </p>
        <p class="pt-4 text-base">
          Previous roles include; Software Architect, Team Lead, Technical Lead,
          Senior Frontend Engineer, Web Developer.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-section {
  background: #060231;
  padding: 0.4em;
  position: relative;
  z-index: 1;
}
</style>
