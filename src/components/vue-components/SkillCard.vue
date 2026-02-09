<script setup>
defineProps({
  title: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <div class="skill-card mb-6 p-4">
    <h3 class="text-2xl mb-4 flicker-text">{{ title }}</h3>
    <p>
      <slot />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.skill-card {
  h3 {
    font-family: var(--font-heading);
    text-shadow:
      0 0 7px var(--color-default-white),
      0 0 10px var(--color-default-white),
      0 0 21px var(--color-default-white),
      0 0 42px var(--color-hot-pink),
      0 0 82px var(--color-hot-pink),
      0 0 92px var(--color-hot-pink),
      0 0 102px var(--color-hot-pink),
      0 0 151px var(--color-hot-pink);
  }
}
</style>
