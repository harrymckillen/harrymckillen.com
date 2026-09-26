import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { remarkReadingTime } from "./plugins/reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "http://harrymckillen.com",
  integrations: [mdx(), sitemap(), vue()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      extendDefaultPlugins: true,
    }),
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
  },
});
