import { resolve } from 'path'

export default defineNuxtConfig({
  ssr: false,
  target: 'static',

  generate: {
    routes: ['/blog'],
  },

  components: {
    global: true,
    dirs: ['~/components'],
  },

  devtools: { enabled: true },

  alias: {
    '@': resolve(__dirname, '/'),
  },

  app: {
    head: {
      title: 'Harry McKillen',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#f867fa' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Monoton&family=Mr+Dafoe&family=Inconsolata&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/styles.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/test-utils/module', '@nuxt/content', '@nuxt/image'],

  content: {
    // Configuring code highlighting
    // https://content.nuxtjs.org/api/configuration
    fallback: true,
    experimental: {
      clientDB: true,
    },
    highlight: {
      theme: 'github-dark',
      // Define languages you expect to use
      preload: ['javascript', 'typescript', 'css', 'scss', 'json'],
    },
    markdown: {
      // Configuring external link processing
      // https://github.com/rehypejs/rehype-external-links
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: 'noopener noreferer',
          },
        ],
      ],
    },
  },

  compatibilityDate: '2024-07-12',
})
