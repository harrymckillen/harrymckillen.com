<template>
  <div
    class="index-page h-full w-full"
    itemscope
    itemtype="http://schema.org/Person"
  >
    <header-nav />

    <header-scene />

    <main class="main-body">
      <header-text first-line="Harry" second-line="McKillen" />

      <about-section />
    </main>

    <skills-section />

    <footer-nav />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style lang="scss" scoped>
.index-page {
  :deep(h1),
  :deep(h2) {
    margin: 0;
    font-weight: 400;
  }
  :deep(h2) {
    font-family: 'Mr Dafoe', cursive;
    color: #fff;
    text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #f867fa,
      0 0 82px #f867fa,
      0 0 92px #f867fa,
      0 0 102px #f867fa,
      0 0 151px #f867fa;
    transform: rotate(-5deg);
    margin-bottom: 1em;
  }

  .main-body {
    margin-top: 480px;
  }
}
</style>
