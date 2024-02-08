<template>
  <div class="skill-card mb-6 p-4">
    <h3 class="text-3xl mb-2">{{ title }}</h3>
    <p>
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined,
    },
  },
}
</script>

<style lang="scss" scoped>
.skill-card {
  h3 {
    text-transform: uppercase;
    font-family: Monoton, cursive;
  }
}
</style>
