<script setup>
const { data, signOut } = useAuth();
const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Documentation", href: "/docs" },
];
const mobileMenuOpen = ref(false);
</script>

<template>
  <header
    class="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10"
  >
    <div
      class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <div class="flex flex-1 items-center gap-x-6">
        <button
          type="button"
          class="-m-3 p-3 md:hidden flex"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <UIcon
            name="i-heroicons-bars-3-20-solid"
            class="h-5 w-5 text-gray-900"
            aria-hidden="true"
          />
        </button>
        <SvgLogo class="h-8 w-auto" />
      </div>
      <nav
        class="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700"
      >
        <NuxtLink
          :class="[
            $route.path.includes(item.href)
              ? 'text-indigo-600 '
              : 'text-gray-900 ',
          ]"
          v-for="(item, itemIdx) in navigation"
          :key="itemIdx"
          :to="item.href"
          >{{ item.name }}</NuxtLink
        >
      </nav>
      <div class="flex flex-1 items-center justify-end gap-x-8">
        <nav aria-label="Global" class="flex space-x-10">
          <NuxtLink to="/" class="text-sm font-medium text-gray-700"
            ><span aria-hidden="true">&larr;</span> Back to website
          </NuxtLink>
        </nav>
        <HeadlessMenu as="div" class="relative inline-block text-left">
          <HeadlessMenuButton class="-m-1.5 lg:flex items-center p-1.5">
            <span class="sr-only">Open user menu</span>
            <NuxtImg
              class="h-8 w-8 rounded-full"
              :src="data?.user?.image"
              alt="Photo de profil"
            />
            <span class="hidden lg:flex lg:items-center">
              <span
                class="ml-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
                aria-hidden="true"
                >{{ data?.user?.name }}</span
              >
              <UIcon
                name="i-heroicons-chevron-down"
                class="ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
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
      </div>
    </div>
    <HeadlessDialog
      as="div"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50" />
      <HeadlessDialogPanel
        class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="-ml-0.5 flex h-16 items-center gap-x-6">
          <button
            type="button"
            class="-m-2.5 p-2.5 text-gray-700 flex"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <UIcon
              name="i-heroicons-x-mark"
              class="h-6 w-6"
              aria-hidden="true"
            />
          </button>
          <div class="-ml-0.5">
            <NuxtLink href="#" class="-m-1.5 block p-1.5">
              <span class="sr-only">Your Company</span>
              <SvgLogo class="h-8 w-auto" />
            </NuxtLink>
          </div>
        </div>
        <div class="mt-2 space-y-2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >{{ item.name }}</NuxtLink
          >
        </div>
      </HeadlessDialogPanel>
    </HeadlessDialog>
  </header>
</template>
