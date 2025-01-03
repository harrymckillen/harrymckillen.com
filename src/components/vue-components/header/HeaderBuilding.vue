<script setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "md",
  },
});

const numberOfWindows = computed(() => {
  switch (props.size) {
    case "xs":
      return 12;
    case "sm":
      return 14;
    case "lg":
      return 27;
    case "xl":
      return 36;
    case "xxl":
      return 42;
    case "md":
    default:
      return 24;
  }
});
</script>

<template>
  <div class="building" :class="[size]">
    <div v-for="window in numberOfWindows" :key="window" class="window"></div>
  </div>
</template>

<style lang="scss" scoped>
.building {
  flex-shrink: 0;
  background-color: #00003c;
  width: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 8px 5px 0;
  &.xxl {
    height: 200px;
  }
  &.xl {
    height: 180px;
  }
  &.lg {
    height: 140px;
  }
  &.md {
    height: 120px;
  }
  &.sm {
    height: 80px;
  }
  &.xs {
    height: 60px;
  }
  .window {
    width: 5px;
    height: 5px;
    display: inline-block;
    background-color: var(--color-hot-pink);
    box-shadow:
      0 0 10px 1px var(--color-default-white),
      0 0 20px 1px var(--color-hot-pink);
    margin: 2px;

    &:nth-child(2n) {
      opacity: 0.85;
    }
    &:nth-child(3n) {
      opacity: 0.65;
    }
    &:nth-child(4n) {
      opacity: 0.5;
    }
    &:nth-child(5n) {
      opacity: 0.15;
    }
    &:nth-child(6n) {
      opacity: 0.05;
    }
    &:nth-child(7n) {
      opacity: 0.75;
    }
  }
}
</style>
