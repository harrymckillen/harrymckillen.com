Cover image for Create minimalist blog with Nuxt 3 and Tailwind CSS
Tomasz Kikowski
Tomasz Kikowski
Posted on Mar 27, 2023

4
Create minimalist blog with Nuxt 3 and Tailwind CSS

#

vue

#

frontend

#

tailwindcss

#

tutorial
Nuxt 3 is one of the hottest tools in web development right now, and for good reason. This powerful tool makes it easy to create any web application you wish. In this guide, I will show you how to create a minimalistic blog with Nuxt 3 as a base, Tailwind CSS for styling user interface, and Markdown to create posts. Let's dive in and create a stunning blog together!

Prerequisites
You have to install the following dependencies at the beginning:

Node.js (latest LTS version or above 16.11)
Some code editor, for example Visual Studio Code
Creating a new Nuxt 3 application
You need to start this journey by creating a new Nuxt 3 project. To do this run the following commands in your terminal:
npx nuxi@latest init nuxt3-blog-app
cd nuxt3-blog-app
npm install
Side note: If you are not familiar with NPX you can jump to this article about the differences between NPX and NPM.

By running the above command you will create Nuxt 3 application in nuxt3-blog-app directory, then you will go to this directory and install required dependencies. After this, you can run this project by:
npm run dev
Installing Tailwind CSS
The next step you should do is to install Tailwind CSS together with Post CSS and Autoprefixer. After successful installation, run the init command to generate tailwind.config.js file.
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init
In the generated configuration file you need to specify paths to all components, and any other source files that will contain Tailwind class names.
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./components/**/_.{js,vue,ts}",
"./layouts/\*\*/_.vue",
"./pages/**/\*.vue",
"./plugins/**/\*.{js,ts}",
"./nuxt.config.{js,ts}",
"./app.vue",
],
theme: {
extend: {},
},
plugins: [],
}
Then you should create the main CSS file (for example /assets/css/main.css) for all Tailwind CSS rules with the following content:
@tailwind base;
@tailwind components;
@tailwind utilities;
Finally you have to add PostCSS configuration and include the newly created CSS file in nuxt.config.js file:
export default defineNuxtConfig({
css: ['~/assets/css/main.css'],
postcss: {
plugins: {
tailwindcss: {},
autoprefixer: {},
},
},
})
Installing @nuxt/content module
The @nuxt/content module (https://content.nuxtjs.org) is a great utility that helps you to manage content on your blog. You can use following command to install this module:
npm install -D @nuxt/content
Then you need to enable @nuxt/content module by adding it to nuxt.config.js configuration file:
export default defineNuxtConfig({
modules: ['@nuxt/content'],
...
})
Creating and displaying content
To store posts on the blog you can use Markdown files. To do this create a separate directory to store them (for example /content) and add some Markdown files with content and metadata. Add minimum four different blog posts for best look of the blog.
mkdir content
touch first-example-blog-post.md
Here is an example structure of such a blog post:

---

title: "Lorem ipsum dolor sit amet"
author: John Doe
avatar: https://i.pravatar.cc/40
date: Mar 25, 2023
image: https://picsum.photos/1200/520
excerpt: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at mi suscipit sapien volutpat volutpat. Nam tempor malesuada ligula, et pretium ante ultricies sed.

---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Morbi at mi suscipit sapien volutpat volutpat. Nam tempor malesuada ligula, et pretium ante ultricies sed.

Cras condimentum ex a facilisis venenatis. Suspendisse congue fringilla risus. Nullam faucibus tincidunt sagittis. Proin vitae aliquet lacus, ac elementum mauris.
Creating pages
You need two types of pages for blog - main blog page for displaying list of all post and single post page. To do this, create index.vue and [[slug]].vue files in /pages. directory and fill them by some dummy template:
<template>

  <div>Blog page</div>
</template>
Next, edit app.vue file in the main directory and change it by adding NuxtPage component (thanks to this Nuxt will read pages inside /pages directory and create routes form them) and some Tailwind CSS classes:
<template>
  <main class="max-w-screen-xl mx-auto px-4 sm:px-6 xl:px-10 py-5 xl:py-10 text-base">
    <NuxtPage />
  </main>
</template>
Displaying content on the main blog page
To display content on main blog page, you need to create some post tile component. Go to /components directory, make a new file - PostTile.vue with following content:
<template>
  <div 
    class="pb-8 lg:pb-12"
    :class="{ 'w-full md:flex': isBig, 'md:w-1/3': !isBig }"
  >
    <div
      class="px-4 lg:px-6"
      :class="{ 'md:w-2/3': isBig }"
    >
      <a :href="post._path" :title="post.title">
        <img :src="post.image" :alt="post.title" class="rounded block">
      </a>
    </div>
    <div
      class="px-4 lg:px-6"
      :class="{ 'md:w-1/3': isBig }"
    >
      <h3 class="my-3" :class="{ 'md:mt-0 md:mb-6': isBig }">
        <a :href="post._path" :title="post.title">{{ post.title }}</a>
      </h3>
      <div class="font-serif text-lg">
        <p
          class="my-3"
          :class="{ 'md:my-6': isBig }"
        >
          {{ post.excerpt }}
        </p>
      </div>
      <div class="flex items-center">
        <img :src="post.avatar" :alt="post.author" class="w-12 h-12 rounded-full">
        <div class="ml-4">
          <strong class="block">{{ post.author }}</strong>
          <span>{{ post.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PostTile',
  props: {
    post: {
      type: Object,
      default: () => {}
    },
    // First blog post will be displayed as big tile
    isBig: {
      type: Boolean,
      default: false
    }
  },
})
</script>

Next open pages/index.vue file, get all posts and display them using created PostTile.vue component (Nuxt 3 automatically import all components in /components directory so you can just use it in the template):
<template>

  <div class="flex flex-wrap -mx-4 lg:-mx-6">
    <PostTile
      v-for="(post, key) in posts"
      :key="post.title"
      :post="post"
      :is-big="!key"
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  async setup() {
    const { data:posts } = await useAsyncData('posts', () => queryContent('/').find())

    return {
      posts
    }
  },
})
</script>

Displaying content on the single post page
The @nuxt/content module will automatically detect Markdown files and create routes based on the file name. The only one thing you need to do is edit /pages/[[slug]].vue file and create appropriate template to display post content:
<template>

  <article>
    <h1 class="my-6 text-center font-serif">
      {{ post.title }}
    </h1>
    <div class="my-8 text-center font-serif text-base text-gray">
      <time>{{ post.date }}</time> &mdash; {{ post.author }}
    </div>
    <img
      :src="post.image"
      :alt="post.title"
      class="rounded block my-10"
    />
    <div class="max-w-3xl mx-auto my-8">
      <ContentRenderer 
        class="content font-serif text-lg"
        :value="post" 
      />
      <div class="sm:flex justify-between items-center mt-16">
        <div class="flex items-center">
          <img :src="post.avatar" :alt="post.author" class="w-12 h-12 rounded-full">
          <div class="ml-4">
            <strong class="block">{{ post.author }}</strong>
            <span>{{ post.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useRoute } from "vue-router";

export default defineComponent({
  async setup() {
    const route = useRoute()
    const { data:post } = await useAsyncData('post', () => queryContent(route.path).findOne())

    return {
      post
    }
  },
})
</script>

In the above code you may notice ContentRenderer component. This component is built into @nuxt/content module and you can use it to convert Markdown syntax to HTML code.

Styling and adding header
Finally, you need to little improve CSS styles to make this blog look better.

In the nuxt.config.js file add configuration of links to use Google Fonts (in this case Lato & PT Sans):
export default defineNuxtConfig({
app: {
head: {
link: [
{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=PT+Serif:wght@400;700&display=swap' }
]
},
},
...
})
Next add some additional styles in Tailwind CSS configuration:
/\*_ @type {import('tailwindcss').Config} _/
module.exports = {
theme: {
fontFamily: {
'sans': ['Lato', 'sans-serif'],
'serif': ['PT Serif', 'serif']
},
extend: {
colors: {
black: '#393939',
}
}
},
...
}
And add some additional styles in /assets/main.css file:
@tailwind base;

@layer base {
h1 {
@apply text-4xl font-bold;
}
h2 {
@apply text-2xl font-bold;
}
h3 {
@apply text-xl font-bold;
}
.content h1,
.content h2,
.content h3,
.content p,
.content img {
@apply my-6;
}
.content ul {
@apply my-6 pl-5 list-disc;
}
.content ol {
@apply my-6 pl-5 list-decimal;
}
li {
@apply my-4;
}
@media (min-width: 768px) {
h1 {
@apply text-6xl font-bold;
}
h2 {
@apply text-4xl font-bold;
}
}
}

@tailwind components;
@tailwind utilities;
Tailwind by default normalize all styles, for example by removing default font sizes of headings or margins of paragraphs, lists, etc.

Adding header
To allow navigate between single post and main blog page add header with link to the home page. Create a new file for header component - /components/Header.vue and fill it with the following content:
<template>

  <div  class="text-center uppercase text-3xl py-6 mb-2 border-b border-gray-200">
    <NuxtLink to="/">
      <strong>Nuxt3</strong>Blog
    </NuxtLink>
  </div>
</template>
Include header in app.vue:
<template>
  <Header />
  ...
</template>
Thats all. You've just created simple blog application with Nuxt 3 and Tailwind CSS with content stored in Markdown files.

You can find above code in GitHub repository or check live version on Vercel.

Top comments (0)
Subscribe
pic
Add to the discussion
Code of Conduct • Report abuse
profile
Sentry
PROMOTED

nextjs tutorial video

Youtube Tutorial Series
So you built a Next.js app, but you need a clear view of the entire operation flow to be able to identify performance bottlenecks before you launch. But how do you get started? Get the essentials on tracing for Next.js from @nikolovlazar in this video series 👀

Watch the Youtube series

Read next
tomosterlund profile image
From teacher to software developer in less than 1 year
Tom Österlund - Jan 10

vivcis profile image
Creating a Bitcoin Address in Golang with btcd
ORJI CECILIA O. - Jan 30

wagenrace profile image
Paginate SQL results
Tom Nijhof - Jan 19

leoanthony profile image
Python Certification Course Online
LeoAnthony - Dec 27 '23

Tomasz Kikowski
Follow
JOINED
Mar 3, 2023
Trending on DEV Community
Renato Teixeira profile image
Everything you need to know about GIT
#beginners #tutorial #learning #git
Scofield Idehen profile image
Top Soft Skills to Learn in 2024 for Career Development
#career #beginners #job #programming
Sadee profile image
Build and Deploy Buymeacoffee with MongoDB, NodeJS, ExpressJS
#mongodb #node #express #tutorial
DEV Community

What did we do in on DEV in 2023?
We're thrilled to introduce the latest features on DEV:

The DEV Team
Some new features to look forward to on DEV
Ben Halpern for The DEV Team ・ Feb 17 '23
#meta #forem
The DEV Team
Changelog: Don't forget to hit that notification bell
Philip How for The DEV Team ・ Aug 3 '23
#changelog #meta
The DEV Team
Changelog: Take control of your feed with hidden tags
Philip How for The DEV Team ・ Sep 8 '23
#changelog #meta
The DEV Team
Changelog: Tools for Organizations
Philip How for The DEV Team ・ Sep 15 '23
#changelog #meta
The Year in Review: DEV's Top Stats and Trends for 2023

---

title: "Lorem ipsum dolor sit amet"
author: John Doe
avatar: https://i.pravatar.cc/40
date: Mar 25, 2023
image: https://picsum.photos/1200/520
excerpt: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at mi suscipit sapien volutpat volutpat. Nam tempor malesuada ligula, et pretium ante ultricies sed.

---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Morbi at mi suscipit sapien volutpat volutpat. Nam tempor malesuada ligula, et pretium ante ultricies sed.

Cras condimentum ex a facilisis venenatis. Suspendisse congue fringilla risus. Nullam faucibus tincidunt sagittis. Proin vitae aliquet lacus, ac elementum mauris.
