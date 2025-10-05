<script setup lang="ts">
import type { NavItem } from "@nuxt/content";
defineProps<{
  item: NavItem;
}>();
</script>

<template>
  <li>
    <NuxtLink
      v-if="!item.children || item.children.length === 0"
      :to="item._path"
      :class="[
        $route.path === item._path ? 'bg-gray-50' : 'hover:bg-gray-50',
        'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700',
      ]"
    >
      {{ item.title }}
    </NuxtLink>
    <HeadlessDisclosure as="div" v-else v-slot="{ open }" :default-open="true">
      <HeadlessDisclosureButton
        :class="[
          'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700',
        ]"
      >
        <UIcon
          name="i-heroicons-chevron-right"
          :class="[
            open ? 'rotate-90 text-gray-500' : 'text-gray-400',
            'h-5 w-5 shrink-0',
          ]"
          aria-hidden="true"
        />
        {{ item.title }}
      </HeadlessDisclosureButton>
      <Transition name="fade">
        <HeadlessDisclosurePanel as="ul" class="mt-1 px-2 ml-2">
          <li v-for="subItem in item.children" :key="subItem._path">
            <NavigationItem v-if="subItem.children" :item="subItem" />
            <NuxtLink
              v-else
              :to="subItem._path"
              :class="[
                $route.path === subItem._path
                  ? 'border-indigo-500'
                  : 'hover:bg-gray-50',
                'block py-1 pr-2 pl-9 text-sm leading-6 text-gray-500 border-l',
              ]"
            >
              {{ subItem.title }}
            </NuxtLink>
          </li>
        </HeadlessDisclosurePanel>
      </Transition>
    </HeadlessDisclosure>
  </li>
</template>
