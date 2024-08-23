import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import { remarkReadingTime } from "./plugins/reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "http://harrymckillen.com",
  integrations: [mdx(), sitemap(), vue(), tailwind()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
});
