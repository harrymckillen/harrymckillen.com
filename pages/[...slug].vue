<template>
  <div class="blog-post flex flex-col">
    <header-nav />

    <article class="mx-auto w-full sm:w-2/3 mt-10 sm:mt-16 p-10">
      <ContentDoc />
    </article>
  </div>
</template>
<style lang="scss" scoped>
.blog-post :deep(h1) {
  @apply text-4xl sm:text-5xl;
}
</style>
