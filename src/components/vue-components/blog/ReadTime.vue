<script setup>
defineProps({
  mins: {
    type: Number,
    required: true,
  },
})

function minsText(minutes) {
  return `${minutes} min${minutes > 1 ? 's' : ''} read`
}
</script>
<template>
  <span>&middot; {{ minsText(mins) }}</span>
</template>
