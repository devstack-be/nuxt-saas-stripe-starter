import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    '@sidebase/nuxt-auth',
    'nuxt-headlessui', // to remove ?
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  devtools: { enabled: true },
  css: ['~/assets/main.css', '~/assets/scss/main.scss'],
  runtimeConfig: {
    // The private keys which are only available within server-side
    AuthSecret: '',
    GoogleClientId: '',
    GoogleClientSecret: '',
    StripeSecretKey: '',
    StripeWebhookSecret: '',
    ResendApiKey: '',
    public: {
      SiteUrl: ''
    }
  },
  routeRules: {
    '/dashboard/**': { ssr: false },
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },
  compatibilityDate: '2024-07-11',
  nitro: {
    rollupConfig: {
      plugins: [vue()]
    },
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },
  auth: {
    provider: {
      type: 'authjs'
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
