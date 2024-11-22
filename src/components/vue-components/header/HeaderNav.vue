<script setup is:inline>
import { ref, computed, onMounted, onUnmounted } from "vue";

const toggleMenu = ref(false);
const isScrolled = ref(false);
const isMobile = ref(false);
const buttonLabel = computed(() => (toggleMenu.value ? "Close" : "Menu"));

const onToggleMenu = () => {
  toggleMenu.value = !toggleMenu.value;
  if (toggleMenu.value) {
    document.documentElement.classList.add("overflow-hidden");
  } else {
    removeOverflowHidden();
  }
};

const isActive = (path) => {
  const fullpath = window.location.pathname + window.location.hash;
  return fullpath === path;
};

const onNavigate = (path) => {
  if (isMobile.value) {
    toggleMenu.value = false;
    removeOverflowHidden();
  }
};

const checkScreenWidthAndToggleMenu = () => {
  if (window.innerWidth > 640 && toggleMenu.value) {
    toggleMenu.value = false;
    isMobile.value = false;
    removeOverflowHidden();
  } else if (window.innerWidth <= 640) {
    isMobile.value = true;
  }
};

const removeOverflowHidden = () => {
  document.documentElement.classList.remove("overflow-hidden");
};

const setIsScrolled = () => {
  isScrolled.value = window.scrollY > 0;
};

const updateActiveLinks = () => {
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    link.classList.toggle("active", isActive(link.getAttribute("href")));
  });
};

onMounted(() => {
  window.addEventListener("resize", checkScreenWidthAndToggleMenu);
  window.addEventListener("scroll", setIsScrolled);
  window.addEventListener("popstate", updateActiveLinks);
  setIsScrolled();
  updateActiveLinks();
  checkScreenWidthAndToggleMenu();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenWidthAndToggleMenu);
  window.removeEventListener("scroll", setIsScrolled);
  window.removeEventListener("popstate", updateActiveLinks);
});
</script>

<template>
  <div class="nav-wrapper" :class="{ scrolled: isScrolled }">
    <nav
      class="flex items-center w-full my-6"
      :class="{
        'flex-col visible fixed top-0 right-0 z-100 text-3xl space-y-4 py-8 toggled-open':
          toggleMenu,
        'mx-auto text-lg sm:text-2xl space-x-8 sm:space-x-10 invisible sm:visible sm:w-2/3 justify-center':
          !toggleMenu,
      }"
    >
      <a href="/" @click="onNavigate">Home</a>
      <a href="/#about" @click="onNavigate">About</a>
      <a href="/#skills" @click="onNavigate">Skills</a>
      <a href="/#contact" @click="onNavigate">Contact</a>
      <a href="/blog" @click="onNavigate">Blog</a>
    </nav>
  </div>
  <button
    class="fixed top-2 right-2 z-30 bg-black/20 backdrop-blur-md rounded border-2 px-4 py-2 visible sm:invisible w-24"
    @click="onToggleMenu"
  >
    {{ buttonLabel }}
  </button>
</template>

<style lang="scss" scoped>
@import "/src/styles/global.scss";

.nav-wrapper {
  @apply fixed h-16 flex z-20 w-full top-0 p-2;

  &.scrolled {
    a {
      @apply sm:bg-black/20 sm:backdrop-blur-md;
    }
  }

  nav {
    &.toggled-open {
      @apply bg-black/20 backdrop-blur-md h-screen m-0 p-24;

      a {
        @apply m-0;
      }
    }

    a {
      @apply mt-4 p-4 bg-none rounded-lg;
      text-decoration: none !important;
      border: 0.2rem solid transparent;

      &.active,
      &:active,
      &:focus,
      &:hover {
        @extend .neon-border;
      }
    }
  }
}
</style>
