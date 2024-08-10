<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const toggleMenu = ref(false);
const isMobile = ref(false);
const buttonLabel = computed(() => (toggleMenu.value ? "Close" : "Menu"));

const onToggleMenu = () => {
  toggleMenu.value = !toggleMenu.value;
  if (toggleMenu.value) {
    document.body.classList.add("overflow-hidden");
  } else {
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
  document.body.classList.remove("overflow-hidden");
};

const onNavigate = () => {
  if (isMobile.value) {
    toggleMenu.value = false;
    removeOverflowHidden();
  }
};

onMounted(() => {
  window.addEventListener("resize", checkScreenWidthAndToggleMenu);
  checkScreenWidthAndToggleMenu();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenWidthAndToggleMenu);
});
</script>

<template>
  <div class="nav-wrapper">
    <nav
      class="flex items-center justify-center w-full"
      :class="{
        'flex-col visible fixed top-0 right-0 z-100 text-3xl space-y-4 py-8 toggled-open':
          toggleMenu,
        'mx-auto text-lg sm:text-2xl space-x-8 sm:space-x-12 invisible sm:visible sm:w-2/3':
          !toggleMenu,
      }"
    >
      <a href="/" @click="onNavigate()">Home</a>
      <a href="/#about" @click="onNavigate()">About</a>
      <a href="/#skills" @click="onNavigate()">Skills</a>
      <a href="/#contact" @click="onNavigate()">Contact</a>
      <a href="/blog" @click="onNavigate()">Blog</a>
    </nav>
  </div>
  <button
    class="absolute top-0 right-0 z-50 rounded border-2 m-4 px-4 py-2 visible sm:invisible"
    @click="onToggleMenu"
  >
    {{ buttonLabel }}
  </button>
</template>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  position: absolute;
  z-index: 20;
  width: 100%;
  @apply h-16;
  top: 0;

  .toggled-open {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    @apply h-screen;
  }

  a {
    &:active,
    &:focus,
    &:hover {
      text-decoration: underline !important;
    }
  }
}
</style>
