<script setup lang="ts">
import type { Frenquency } from "~/types";
const authStore = useAuthStore();
const { data: session, status: authStatus } = useAuth();
const toast = useToast();
const {
  currency,
  frequencies,
  plans: subscriptionsPlans,
} = useAppConfig().subscriptions;
const { pricing, faq } = useAppConfig();
const frequency = ref<Frenquency>(
  frequencies.find((f) => f.default === true) as Frenquency
);
const generateSubscription = async (priceId: string | null) => {
  if (!priceId) return;
  const result: { redirectUrl?: string } = await $fetch(
    "/api/subscriptions/generate",
    {
      method: "POST",
      body: {
        priceId,
      },
    }
  );
  if (result.redirectUrl) {
    navigateTo(result.redirectUrl, { external: true });
  } else {
    toast.add({
      title: "Error",
      color: "red",
      description: "An error occurred while processing your request.",
    });
  }
};
useSeoMeta({
  title: "Pricing",
  ogTitle: "Pricing",
  twitterTitle: "Pricing",
  description:
    "Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.",
  ogDescription:
    "Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.",
  twitterDescription:
    "Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.",
});
</script>
<template>
  <main class="isolate">
    <!-- Pricing section -->
    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">
            {{ pricing.title }}
          </h2>
          <p
            class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            {{ pricing.subtitle }}
          </p>
        </div>
        <p
          class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
        >
          {{ pricing.description }}
        </p>
        <div class="mt-16 flex justify-center">
          <HeadlessRadioGroup
            v-model="frequency"
            class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <HeadlessRadioGroupLabel class="sr-only"
              >Payment frequency</HeadlessRadioGroupLabel
            >
            <HeadlessRadioGroupOption
              as="template"
              v-for="option in frequencies"
              :key="option.value"
              :value="option"
              v-slot="{ checked }"
            >
              <div
                :class="[
                  checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                  'cursor-pointer rounded-full px-2.5 py-1',
                ]"
              >
                <span>{{ option.label }}</span>
              </div>
            </HeadlessRadioGroupOption>
          </HeadlessRadioGroup>
        </div>
        <div
          class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <div
            v-for="plan in subscriptionsPlans"
            :key="plan.title"
            :class="[
              plan.mostPopular
                ? 'ring-2 ring-indigo-600'
                : 'ring-1 ring-gray-200',
              'rounded-3xl p-8 xl:p-10',
            ]"
          >
            <div class="flex items-center justify-between gap-x-4">
              <h3
                :id="plan.title"
                :class="[
                  plan.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8',
                ]"
              >
                {{ plan.title }}
              </h3>
              <p
                v-if="plan.mostPopular"
                class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600"
              >
                Most popular
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-gray-600">
              {{ plan.description }}
            </p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span
                v-if="frequency.value === 'yearly'"
                class="text-3xl tracking-tight text-gray-500 line-through mr-1"
                >{{ formatCurrency(plan.prices["monthly"], currency) }}</span
              >
              <span class="text-4xl font-bold tracking-tight text-gray-900">{{
                formatCurrency(
                  frequency.value === "monthly"
                    ? plan.prices[frequency.value]
                    : plan.prices[frequency.value] / 12,
                  currency
                )
              }}</span>
              <span class="text-sm font-semibold leading-6 text-gray-600"
                >/month</span
              >
            </p>
            <span
              class="text-left text-sm text-gray-500"
              v-if="frequency.value === 'yearly' && plan.prices['yearly'] > 0"
              >{{ formatCurrency(plan.prices[frequency.value], currency) }} will
              be charged when annual</span
            >
            <button
              v-if="authStatus === 'unauthenticated'"
              @click.prevent="authStore.toggleSignInModal()"
              :aria-describedby="plan.title"
              :class="[
                plan.mostPopular
                  ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                  : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                'w-full mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
              ]"
            >
              Sign In
            </button>
            <button
              v-if="
                authStatus === 'authenticated' &&
                plan.stripeIds[frequency.value] != null &&
                !session?.user?.stripeCustomerId
              "
              @click.prevent="
                generateSubscription(plan.stripeIds[frequency.value])
              "
              :aria-describedby="plan.title"
              :class="[
                plan.mostPopular
                  ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                  : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                'w-full mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
              ]"
            >
              Buy plan
            </button>

            <NuxtLink
              v-else-if="authStatus === 'authenticated'"
              to="/dashboard/billing"
              :aria-describedby="plan.title"
              :class="[
                plan.mostPopular
                  ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                  : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                'w-full mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
              ]"
            >
              Dashboard
            </NuxtLink>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
            >
              <li
                v-for="(benefit, i) in plan.benefits"
                :key="i"
                class="flex gap-x-3"
              >
                <UIcon
                  name="i-heroicons-check"
                  class="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {{ benefit }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- FAQ -->
    <div
      class="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32"
    >
      <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
        {{ faq.title }}
      </h2>
      <dl class="mt-10 space-y-8 divide-y divide-gray-900/10">
        <div
          v-for="(item, i) in faq.items"
          :key="i"
          class="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
        >
          <dt
            class="text-base font-semibold leading-7 text-gray-900 lg:col-span-5"
          >
            {{ item.question }}
          </dt>
          <dd class="mt-4 lg:col-span-7 lg:mt-0">
            <p class="text-base leading-7 text-gray-600">
              {{ item.answer }}
            </p>
          </dd>
        </div>
      </dl>
    </div>
  </main>
</template>
