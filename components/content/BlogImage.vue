<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'This is an image',
  },
})
</script>

<template>
  <nuxt-img
    :src="src"
    :alt="alt"
    loading="lazy"
    quality="80"
    class="w-full h-full object-cover mb-4"
  />
</template>
