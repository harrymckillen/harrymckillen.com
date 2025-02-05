<script setup>
import { CURRENT_COMPANY, CURRENT_TITLE } from "../../consts";

const currentYear = new Date().getFullYear();
const yearsExperience = currentYear - 2002;
</script>

<template>
  <div
    id="about"
    class="about-section neon-border text-center w-12/12 sm:w-3/4 lg:w-2/3 mx-4 sm:mx-auto rounded-3xl"
  >
    <div class="text">
      <h2 class="text-4xl pt-8 mb-8 flicker-text">Who am I?</h2>
      <div class="text-xl sm:text-2xl w-10/12 mx-auto pb-12">
        <p>
          I'm a Frontend Engineer from Ireland. I have
          {{ yearsExperience }} years experience developing with a variety of
          different Web Technologies. I have a BSc. in Computer Science from the
          University of Limerick. Currently a {{ CURRENT_TITLE }} with
          {{ CURRENT_COMPANY }}.
        </p>
        <p class="pt-4">
          Previous roles include; Software Architect, Team Lead, Senior Frontend
          Engineer, Freelance Web Developer.
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
