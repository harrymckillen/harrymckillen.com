<script setup>
import SkillCard from "./SkillCard.vue";
</script>

<template>
  <section id="skills" class="text-center w-12/12 sm:w-2/3 lg:w-4/5 mx-auto my-12 md:mt-14 anchor">
    <h2>Skills</h2>

    <div class="skills text-xl sm:text-2xl flex flex-wrap justify-center">
      <SkillCard title="Javascript & Typescript">
        I've been working with JavaScript for over 20 years. Deep expertise in
        modern frameworks like Vue, Angular, and Astro, along with the entire
        build toolchain (Vite, Webpack, Rollup). Comprehensive testing
        experience with Cypress, Jest, Playwright, and the classics. I've built
        everything from component libraries to complex SPAs.
      </SkillCard>

      <SkillCard title="HTML & Accessibility">
        Solid HTML5 foundation with a strong focus on semantic markup.
        Passionate about web accessibility. I have built to WCAG 2.1 AA standards and
        regularly tested with NVDA, JAWS, VoiceOver, and TalkBack. I believe
        accessible web experiences aren't optional; they're fundamental. Yes,
        I've even built responsive email templates.
      </SkillCard>

      <SkillCard title="CSS & Design">
        I've been writing CSS since the dark ages of IE6-specific hacks and
        table layouts. Expert in modern CSS (Grid, Flexbox, Container Queries),
        preprocessors (SASS, LESS), and utility frameworks (Tailwind,
        Bootstrap). I have a good eye for design and UX and enjoy collaborating with
        designers to build well-formed, performant interfaces and robust
        design systems.
      </SkillCard>

      <SkillCard title="Backend & Databases">
        While frontend is my specialty, I'm comfortable across the stack.
        Experience with Node.js/NestJS, Python (Django), PHP, and dabbling in
        C#, Java, Lua, Rust, and C++ when needed. Familiar with various
        databases including PostgreSQL, MongoDB, and MySQL. I can build and
        consume APIs, optimise queries, and understand the full request
        lifecycle.
      </SkillCard>

      <SkillCard title="What Sets Me Apart">
        Adaptibility is a key strength, and a love of learning new things. Beyond the code, I'm deeply invested in web
        performance, security best
        practices, and developer experience. I've architected CI/CD pipelines,
        championed code quality standards. I'm a strong advocate for
        accessibility and inclusive design.
      </SkillCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.skills {
  gap: 2rem;

  >div {
    flex: 1 1 calc(50% - 1rem);
    min-width: 280px;

    @media screen and (max-width: 768px) {
      flex: 1 1 100%;
    }

    // Stagger animation delays for each SkillCard
    &:nth-child(1) ::v-deep(h3) {
      animation-delay: 0.2s;
    }

    &:nth-child(2) ::v-deep(h3) {
      animation-delay: 0.4s;
    }

    &:nth-child(3) ::v-deep(h3) {
      animation-delay: 0.6s;
    }

    &:nth-child(4) ::v-deep(h3) {
      animation-delay: 0.8s;
    }

    &:nth-child(5) ::v-deep(h3) {
      animation-delay: 1s;
    }
  }
}
</style>
