<template>
  <div class="h-full w-full" itemscope itemtype="http://schema.org/Person">
    <header-nav />

    <header-scene />

    <main class="main-body">
      <header-text line1="Harry" line2="McKillen" />

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
