<template>
  <div class="nav-wrapper">
    <nav
      class="flex items-center h-16 w-full sm:w-2/3 justify-center mx-auto text-lg sm:text-2xl space-x-8 sm:space-x-12"
    >
      <a href="/">Home</a><a href="/#about">About</a>
      <NuxtLink to="/#skills">Skills</NuxtLink>
      <NuxtLink to="/#contact">Contact</NuxtLink>
      <!-- <NuxtLink to="/blog">Blog</NuxtLink> -->
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.nav-wrapper {
  display: block;
  position: absolute;
  z-index: 20;
  width: 100%;
  top: 0;

  a {
    &:active,
    &:focus,
    &:hover {
      text-decoration: underline !important;
    }
  }
}
</style>
