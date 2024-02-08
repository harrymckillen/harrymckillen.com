import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
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
        {
          hid: 'description',
          name: 'description',
          content:
            'Harry McKillen, Web Developer, Geek, Want to be Games Developer. Dad.',
        },
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
  modules: ['@nuxt/test-utils/module'],
})
