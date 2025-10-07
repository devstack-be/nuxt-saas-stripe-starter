<script setup lang="ts">
import NuxtIcon from '@/components/svg/NuxtIcon.vue'
import PrismaIcon from '@/components/svg/PrismaIcon.vue'
import NeonIcon from '@/components/svg/NeonIcon.vue'
import NuxtAuthIcon from '@/components/svg/NuxtAuthIcon.vue'
import NuxtUiIcon from '@/components/svg/NuxtUiIcon.vue'

const technos = [
  {
    name: 'Nuxt',
    href: 'https://nuxt.com/',
    icon: NuxtIcon
  },
  {
    name: 'Prisma',
    href: 'https://prisma.io/',
    icon: PrismaIcon
  },
  {
    name: 'Neon',
    href: 'https://neon.tech/',
    icon: NeonIcon
  },
  {
    name: 'Sidebase Auth',
    href: 'https://sidebase.io/nuxt-auth',
    icon: NuxtAuthIcon
  },
  {
    name: 'Tailwind',
    href: 'https://ui.nuxt.com/',
    icon: NuxtUiIcon
  }
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8 text-gray-500">
    <h2 class="text-center text-base font-medium leading-8 uppercase">
      Powered by
    </h2>
    <div
      class="mx-auto grid mt-10 max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5"
    >
      <NuxtLink
        v-for="item in technos"
        :key="item.name"
        :to="item.href"
        :external="true"
        target="_blank"
        class="col-span-2 max-h-12 w-full object-contain lg:col-span-1 duration-250 flex flex-col items-center transition hover:text-indigo-500"
      >
        <Component :is="item.icon" />
      </NuxtLink>
    </div>
  </div>
</template>
