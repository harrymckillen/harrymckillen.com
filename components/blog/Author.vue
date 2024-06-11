<template>
  <div class="author-card my-16 flex items-center flex-col-reverse sm:flex-row">
    <nuxt-img
      src="/pfp.png"
      alt="Harry's avatar"
      loading="lazy"
      quality="80"
      class="w-24 h-24 object-cover rounded-full mt-4 sm:mt-0 sm:mr-4"
    />
    <div class="">
      <h4 class="text-xl mb-2">About the author</h4>
      <p>
        My name is Harry. I'm a Front-end Web Developer for Optifly. I like to
        mess around with code in my spare time and I occasionally try to write
        about it. I like a lot of other things away from the Internet and work,
        like coffee, books, TV, Movies to name but a few.
      </p>
    </div>
  </div>
</template>
