<template>
  <aside
    class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"
  >
    <nav class="flex-none px-4 sm:px-6 lg:px-0">
      <ul
        role="list"
        class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
      >
        <li v-for="item in secondaryNavigation" :key="item.name">
          <NuxtLink
            :to="item.href"
            :class="[
              $route.path === item.href
                ? 'bg-gray-50 text-indigo-600'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
              'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold',
            ]"
          >
            <UIcon
              :name="item.icon"
              :class="[
                $route.path === item.href
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-indigo-600',
                'h-6 w-6 shrink-0',
              ]"
              aria-hidden="true"
            />
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup lang="ts">
const secondaryNavigation = [
  {
    name: "Panel",
    href: "/dashboard",
    icon: "i-heroicons-document",
    current: true,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: "i-heroicons-credit-card",
    current: false,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "i-heroicons-cog",
    current: false,
  },
];
</script>
