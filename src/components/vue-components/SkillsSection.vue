<script setup>
import SkillCard from "./SkillCard.vue";
</script>

<template>
  <section
    id="skills"
    class="text-center w-12/12 sm:w-2/3 lg:w-4/5 mx-auto my-12 md:mt-14 anchor"
  >
    <h2 class="text-4xl mb-8 flicker-text delay-animation">Skills</h2>

    <div class="skills text-xl sm:text-2xl flex flex-wrap justify-center">
      <SkillCard title="Javascript">
        ES5/6, Angular / AngularJS / VueJS / NodeJS / Webpack / Babel /
        Typescript / Cypress / Jest / Mocha / Karma / Jasmine / Storybook. And
        many more JS libraries over the years.
      </SkillCard>

      <SkillCard title="HTML">
        Solid HTML4/5 knowledge. WAI-AA Accessibility with ARIA land-marking,
        testing on NVDA, Jaws, VoiceOver and TalkBack. Email Templates
        (shudder).
      </SkillCard>

      <SkillCard title="CSS">
        I've been using CSS since well before the before times of border-radius,
        Flexbox & CSS Grid using IE version specific hacks. Experience using
        Bootstrap, Tailwind CSS etc. Pre-processors such as LESS and SASS.
      </SkillCard>

      <SkillCard title="Design">
        I have a keen interest in design, and have a good eye for detail. I
        enjoy working with designers to bring their vision to life, and have
        experience working with design systems.
      </SkillCard>

      <SkillCard title="Backend">
        Frontend Tech is my forte, though I have working knowledge of Python
        (Django) and PHP, and numerous other ones I've used sparingly over the
        years, C#, Java, C++, etc. Various DBs, Mongo, MySQL, Postgres, etc.
      </SkillCard>

      <SkillCard title="Special Interests">
        In addition to my main skillset, I'm interested in Web Accessibility,
        Web Performance, Web Security, Web Standards, Web Design, UX, UI, Design
        Systems, CI/CD, etc. As well as improving overall developer experience.
      </SkillCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.skills {
  > div {
    width: 45%;

    @media screen and (max-width: 1200px) {
      width: 100%;
    }
  }
}
</style>
