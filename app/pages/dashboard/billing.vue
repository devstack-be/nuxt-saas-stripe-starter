<template>
  <div>
    <h2 class="text-2xl font-semibold leading-7 text-gray-900">
      Billing
    </h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 mb-2">
      Manage your billing information and subscription plan
    </p>
    <div
      class="mt-4 mx-auto max-w-2xl space-y-16 sm:space-y-8 lg:mx-0 lg:max-w-none"
    >
      <UAlert
        icon="i-heroicons-information-circle"
        color="primary"
        variant="solid"
        title="Demo App!"
      >
        <template #description>
          Nuxt SaaS Starter app is a demo app using a Stripe test environment.
          You can find a list of test card numbers on the
          <NuxtLink
            to="https://stripe.com/docs/testing"
            :external="true"
            target="_blank"
            class="underline"
          >Stripe documentation</NuxtLink>
        </template>
      </UAlert>
      <Placeholder
        v-if="!subscription"
        class="w-full h-64"
      />
      <div v-else>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Subscription plan
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-500 mb-2">
          You are currently on to the
          <strong>{{ subscription.title }}</strong> plan.
        </p>
        <p
          v-if="subscription.stripeCurrentPeriodEnd"
          class="mt-1 text-sm leading-6 mb-2 font-semibold"
          :class="[subscription.isCanceled ? 'text-red-700' : 'text-green-700']"
        >
          {{
            subscription.isCanceled
              ? "Your plan will be canceled on: "
              : "Your plan renews on:"
          }}
          {{ formatDate(subscription.stripeCurrentPeriodEnd) }}
        </p>
        <div class="pt-2">
          <UButton
            v-if="subscription.isPaid && subscription.stripeCustomerId"
            :loading="manageSubscriptionLoading"
            :disabled="manageSubscriptionLoading"
            size="lg"
            @click.prevent="handleManageSubscription"
          >
            Manage subscription
          </UButton>
          <UButton
            v-else
            size="lg"
            to="/pricing"
          >
            Choose a plan
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserSubscriptionPlan } from '~/types'

const toast = useToast()
const manageSubscriptionLoading = ref(false)
async function handleManageSubscription() {
  manageSubscriptionLoading.value = true
  const result: { redirectUrl?: string } = await $fetch(
    '/api/subscriptions/manage',
    {
      method: 'POST'
    }
  )
  if (result.redirectUrl) {
    navigateTo(result.redirectUrl, { external: true })
  } else {
    manageSubscriptionLoading.value = false
    toast.add({
      title: 'Error',
      color: 'error',
      description: 'An error occurred while processing your request.'
    })
  }
}
const { data: subscription } = await useFetch<UserSubscriptionPlan>(
  '/api/get-subscription',
  {
    server: false,
    lazy: true
  }
)
useHead({
  title: 'Billing'
})
definePageMeta({
  layout: 'dashboard'
})
</script>
