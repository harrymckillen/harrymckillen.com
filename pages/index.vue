<template>
  <div class="h-full w-full" itemscope itemtype="http://schema.org/Person">
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
.main-body {
  margin-top: 480px;
}
</style>
