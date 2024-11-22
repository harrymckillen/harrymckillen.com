<script setup>
defineProps({
  firstLine: {
    type: String,
    default: null,
  },
  secondLine: {
    type: String,
    default: null,
  },
});
</script>
<template>
  <div class="header-text">
    <h1>{{ firstLine }}</h1>
    <h1>{{ secondLine }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.header-text {
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40px;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;

  h1 {
    font-family: "Mr Dafoe", cursive;
    font-size: 4.5rem;
    color: #eb219b;
    -webkit-text-fill-color: #fd5afa;
    text-shadow: -2px -2px 0 #ffbaf2;
    filter: drop-shadow(3px 3px 1px #441f62);
    transform: skew(-2deg, -2deg) rotate(-14deg);
    font-weight: 400;
    z-index: 2;

    &:nth-child(2) {
      margin-top: -40px;
      z-index: 1;

      @media screen and (max-width: 900px) {
        margin-top: -20px;
      }
    }

    @media screen and (max-width: 900px) {
      font-size: 4.75rem;
    }
  }
}
</style>
