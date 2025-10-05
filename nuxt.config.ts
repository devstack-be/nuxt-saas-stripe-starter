// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/dashboard/**": { ssr: false },
  },
  css: ["~/assets/main.css", "~/assets/scss/main.scss"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@sidebase/nuxt-auth",
    "nuxt-headlessui",
    "@pinia/nuxt",
    "@nuxt/content",
    "@nuxt/eslint",
    "nuxt-og-image",
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    "components:extend": (components) => {
      const globals = components.filter((c) =>
        ["UButton", "UIcon", "UAlert"].includes(c.pascalName)
      );

      globals.forEach((c) => (c.global = true));
    },
  },

  ui: {
    icons: ["mdi", "heroicons", "simple-icons"],
  },

  auth: {
    provider: {
      type: "authjs",
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "fade", mode: "out-in" },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    AuthSecret: "",
    GoogleClientId: "",
    GoogleClientSecret: "",
    StripeSecretKey: "",
    StripeWebhookSecret: "",
    ResendApiKey: "",
    public: {
      SiteUrl: "",
    },
  },

  compatibilityDate: "2024-07-06",
});
