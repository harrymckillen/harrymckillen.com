<script setup>
import { CURRENT_COMPANY, CURRENT_TITLE } from "../../..//consts";
</script>

<template>
  <div class="author-card my-16 flex items-center flex-col-reverse sm:flex-row">
    <img
      src="/pfp.png"
      alt="Harry's avatar"
      loading="lazy"
      quality="80"
      class="w-24 h-24 object-cover rounded-full mt-4 sm:mt-0 sm:mr-4"
    />
    <div>
      <h4 class="text-xl font-semibold my-4">About the author</h4>
      <p>
        My name is Harry. I'm a {{ CURRENT_TITLE }} with {{ CURRENT_COMPANY }}.
        I like to mess around with code (and Linux) in my spare time and I
        occasionally try to write about it. I like a lot of other things away
        from the Internet and Work, like Coffee, Books, TV, Movies, Music and
        Gaming.
      </p>
    </div>
  </div>
</template>
