<script setup>
const { CTA } = useAppConfig();
const { status: authStatus } = useAuth();
</script>
<template>
  <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
    <div
      class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16"
    >
      <h2
        class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {{ CTA.title }}
      </h2>
      <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
        {{ CTA.description }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <template v-if="authStatus === 'authenticated'">
          <UButton
            v-for="(button, index) of CTA?.buttons?.auth"
            :key="index"
            v-bind="{ ...button }"
          />
        </template>
        <template v-else>
          <UButton
            v-for="(button, index) of CTA?.buttons?.guest"
            :key="index"
            v-bind="{ ...button }"
          />
        </template>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx="512"
          cy="512"
          r="512"
          fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
          fill-opacity="0.7"
        />
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stop-color="#7775D6" />
            <stop offset="1" stop-color="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>
