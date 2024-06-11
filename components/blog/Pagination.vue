<script setup>
const router = useRouter()

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPosts: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
})

const totalPages = ref(0)

const updatePageQueryString = (page) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      p: page,
    },
  })
}

const nextPage = () => {
  const newPage = props.currentPage + 1
  updatePageQueryString(newPage)
}

const prevPage = () => {
  const newPage = props.currentPage - 1
  updatePageQueryString(newPage)
}

const changePage = (page) => {
  updatePageQueryString(page)
}

const initPagination = () => {
  if (props.totalPosts < props.perPage) {
    totalPages.value = 1
  } else {
    totalPages.value = Math.ceil(props.totalPosts / props.perPage)
  }
}
watch(
  () => props.totalPosts,
  () => {
    initPagination()
  },
)
onMounted(() => {
  initPagination()
})
</script>

<template>
  <div class="pagination flex justify-between">
    <button :class="{ hide: currentPage === 1 }" @click="prevPage()">
      Prev
    </button>
    <div class="flex gap-4">
      <button
        v-for="pageNum in totalPages"
        :key="`page-${pageNum}`"
        :class="{ active: currentPage === pageNum }"
        @click="changePage(pageNum)"
      >
        {{ pageNum }}
      </button>
    </div>
    <button :class="{ hide: currentPage === totalPages }" @click="nextPage()">
      Next
    </button>
  </div>
</template>

<style lang="scss">
@import '~/assets/variables';

.pagination {
  display: flex;
  margin-top: 2rem;

  button {
    @apply border-2 px-4 py-2 rounded;

    &.active {
      @apply text-blue-950 bg-white;
    }

    &.hide {
      @apply invisible;
    }
  }
}
</style>
