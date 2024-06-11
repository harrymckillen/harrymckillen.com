<script setup>
import { formatDate } from '~/assets/utils'
useHead({
  title: 'Blog',
  meta: [{ name: 'description', content: 'My ickle blog.' }],
})

const router = useRouter()
const { data: navigation } = await useAsyncData('navigation', () =>
  fetchContentNavigation(),
)
const PER_PAGE = 10
const page = ref(1)
const skipAmount = ref(0)
const posts = ref([])
const totalPosts = ref(0)

onMounted(() => {
  setQueryString()
  totalPosts.value = navigation.value[0].children.length
  page.value = parseInt(router.currentRoute.value.query.p)

  if (page.value !== 1) {
    postsForPage()
  }

  fetchPosts(skipAmount.value)
})

const postsForPage = () => {
  skipAmount.value = (page.value - 1) * PER_PAGE
}

const updatePageQueryString = (page) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      p: page,
    },
  })
}

const showPagination = computed(() => {
  return totalPosts.value > PER_PAGE
})

const fetchPosts = async (skipPosts) => {
  posts.value = await queryContent('blog')
    .sort({ date: -1 })
    .limit(PER_PAGE)
    .skip(skipPosts)
    .find()
}

const setQueryString = () => {
  if (!router.currentRoute.value.query.p) {
    updatePageQueryString(page.value)
  }
}

watch(router.currentRoute, () => {
  page.value = parseInt(router.currentRoute.value.query.p)
  postsForPage()
  fetchPosts(skipAmount.value)
})
</script>

<template>
  <div class="blog-index flex flex-col">
    <header-nav />

    <main class="mx-auto w-full sm:w-2/3 p-4 flex flex-col">
      <div v-if="posts.length" class="flex flex-wrap sm:flex-row">
        <div v-for="article in posts" :key="article._path" class="py-6">
          <small class="inline-block mb-4">{{
            formatDate(article.date)
          }}</small>
          <nuxt-link :to="`${article._path}`">
            <h2>{{ article.title }}</h2>
          </nuxt-link>
          <p>{{ article.description }}</p>
          <nuxt-link
            :to="`${article._path}`"
            class="inline-block mt-6 mb-4 px-4 py-2 border-2 border-solid rounded"
          >
            Read more
          </nuxt-link>
        </div>
      </div>
      <div v-else>
        <p>No posts found.</p>
      </div>
      <blog-pagination
        v-if="showPagination"
        :total-posts="totalPosts"
        :current-page="page"
        :per-page="PER_PAGE"
      />
    </main>

    <footer-nav :show-socials="false" :show-contact="false" />
  </div>
</template>

<style lang="scss" scoped>
.blog-index {
  :deep(.nav-wrapper) {
    position: relative;
  }

  h2 {
    @apply text-3xl;
  }
}
</style>
