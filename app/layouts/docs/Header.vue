<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import type { NavItem } from "@nuxt/content";
const { data: authSession, signOut, status: authStatus } = useAuth();
const uiStore = useUIStore();
const siteConfig = useAppConfig().site;

const navigationItems = inject<NavItem[]>("navigation", []);
</script>

<template>
  <HeadlessDisclosure
    as="nav"
    class="bg-background/75 backdrop-blur -mb-px sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800"
    v-slot="{ open }"
  >
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[4em]"
      :class="[open ? 'border-b border-gray-200 dark:border-gray-800' : '']"
    >
      <div class="lg:flex-1 flex items-center gap-1.5">
        <NuxtLink to="/" class="flex-shrink-0 flex items-end gap-1.5">
          <SvgLogo class="h-8 w-auto" aria-hidden="true" />
          <span
            class="inline-flex items-center font-medium rounded-md text-xs px-2 py-1 bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 mb-0.5"
            >Docs</span
          >
        </NuxtLink>
      </div>
      <DocsSearchBar />
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <DocsSearchButton />
        <UButton
          icon="i-simple-icons-github"
          variant="ghost"
          color="gray"
          target="_blank"
          :to="siteConfig.social.github"
        />
        <HeadlessMenu
          as="div"
          class="relative inline-block text-left"
          v-if="authStatus === 'authenticated'"
        >
          <HeadlessMenuButton class="-m-1.5 flex items-center p-1.5">
            <span class="sr-only">Open user menu</span>
            <NuxtImg
              class="h-8 w-8 rounded-full"
              :src="authSession?.user?.image"
              alt="User image"
            />
          </HeadlessMenuButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <HeadlessMenuItems
              class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:ring-gray-700 p-1"
            >
              <div class="py-1">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    @click.prevent="
                      signOut({
                        callbackUrl: '/',
                      })
                    "
                    :class="[
                      active ? 'bg-gray-100 dark:bg-gray-800' : '',
                      'flex w-full px-4 py-2 text-sm text-red-900 dark:text-red-400',
                    ]"
                  >
                    <UIcon name="i-mdi-logout" class="size-5 mr-1" /> Log Out
                  </button>
                </HeadlessMenuItem>
              </div>
            </HeadlessMenuItems>
          </transition>
        </HeadlessMenu>
        <div class="-mr-2 flex items-center sm:hidden">
          <HeadlessDisclosureButton
            class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="sr-only">Open main menu</span>
            <UIcon
              name="i-heroicons-bars-3"
              v-if="!open"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <UIcon
              name="i-heroicons-x-mark"
              v-else
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </HeadlessDisclosureButton>
        </div>
      </div>
    </div>

    <HeadlessDisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <DocsNavigationTree
          v-if="navigationItems"
          :navigation="navigationItems"
        />
      </div>
    </HeadlessDisclosurePanel>
  </HeadlessDisclosure>
</template>
