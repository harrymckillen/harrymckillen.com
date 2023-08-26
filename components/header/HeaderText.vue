<template>
  <div class="header-text">
    <h1>{{ line1 }}</h1>
    <h1>{{ line2 }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    line1: {
      type: String,
      default: null,
    },
    line2: {
      type: String,
      default: null,
    },
  },
}
</script>
