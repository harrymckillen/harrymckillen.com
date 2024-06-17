<script setup>
import { formatDate } from '~/assets/utils'
</script>

<template>
  <div class="blog-post mx-auto w-full sm:w-2/3 p-4">
    <header-nav />

    <!-- {{ $route.params }} -->
    <ContentDoc v-slot="{ doc }">
      <article>
        <div class="text-center mt-8">
          {{ formatDate(doc.date) }}

          <blog-read-time :mins="doc.minutes" />
        </div>
        <h1>{{ doc.title }}</h1>

        <p>{{ doc.description }}</p>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>

    <blog-author />

    <a href="javascript:history.go(-1)" class="block hover:underline mt-8"
      >&lsaquo; Back to blog</a
    >

    <footer-nav :show-socials="false" :show-contact="false" />
  </div>
</template>
<style lang="scss" scoped>
.blog-post {
  :deep(.nav-wrapper) {
    position: relative;
  }

  article {
    h1 {
      @apply text-4xl font-bold my-10 text-center;
    }

    :deep(h2) {
      @apply text-3xl font-bold mt-6 mb-2;
    }

    :deep(h3) {
      @apply text-2xl font-bold my-4;
    }

    :deep(p) {
      @apply mb-4;
      a {
        @apply underline;
      }
    }

    :deep(pre) {
      @apply bg-gray-800 p-4 rounded-lg my-8;
      overflow-x: auto;
    }
  }
}
</style>
