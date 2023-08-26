<template>
  <div class="mb-6 p-4">
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

<style></style>
