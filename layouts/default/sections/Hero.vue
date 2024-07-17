<script setup>
const { data: stars } = await useFetch(
  "https://api.github.com/repos/devstack-be/nuxt-saas-stripe-starter",
  {
    pick: ["stargazers_count"],
  }
);
const siteConfig = useAppConfig().site;
</script>

<template>
  <div class="relative pt-14">
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <ClientOnly>
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </ClientOnly>
    </div>
    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Kick off your next project with our
            <span class="font-bold text-indigo-500"> SaaS starter </span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Build using Nuxt 3, Prisma, Neon, Nuxt Auth, Resend, Nuxt ui,
            Stripe.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <UButton
              to="pricing"
              icon="i-heroicons-arrow-right"
              size="lg"
              color="indigo"
              variant="solid"
              label="Show pricing"
              :trailing="true"
            />
            <UButton
              :to="siteConfig.social.github"
              target="_blank"
              icon="i-mdi-github"
              dynamic
              size="md"
              color="white"
              variant="solid"
              :trailing="false"
            >
              Stars on GitHub: {{ nFormatter(stars?.stargazers_count) }}
            </UButton>
          </div>
        </div>
        <div class="mt-16 flow-root sm:mt-24 max-w-6xl">
          <div
            class="-m-2 rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"
          >
            <NuxtImg
              fit="cover"
              src="/images/idea-launch.svg"
              alt="App screenshot"
              class="rounded-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <ClientOnly>
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </ClientOnly>
    </div>
  </div>
</template>
