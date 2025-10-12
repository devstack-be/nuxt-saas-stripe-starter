<script setup lang="ts">
const { data: authData } = useAuth()
const { data: page } = await useAsyncData('pricing', () => queryCollection('pricing').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description
const toast = useToast()
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')

const isYearly = ref('0')

const items = ref([
  {
    label: 'Monthly',
    value: '0'
  },
  {
    label: 'Yearly',
    value: '1'
  }
])
const generateSubscription = async (priceId: string | null) => {
  if (!priceId) return
  const result: { redirectUrl?: string } = await $fetch(
    '/api/subscriptions/generate',
    {
      method: 'POST',
      body: {
        priceId
      }
    }
  )
  if (result.redirectUrl) {
    navigateTo(result.redirectUrl, { external: true })
  } else {
    toast.add({
      title: 'Error',
      color: 'error',
      description: 'An error occurred while processing your request.'
    })
  }
}
</script>

<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
    >
      <template #links>
        <UTabs
          v-model="isYearly"
          :items="items"
          color="neutral"
          size="xs"
          class="w-48"
          :ui="{
            list: 'ring ring-accented rounded-full',
            indicator: 'rounded-full',
            trigger: 'w-1/2'
          }"
        />
      </template>
    </UPageHero>

    <UContainer>
      <UPricingPlans scale>
        <UPricingPlan
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :price="isYearly === '1' ? plan.price.year : plan.price.month"
          :billing-cycle="isYearly === '1' ? '/year' : '/month'"
        >
          <template #button>
            <UButton
              v-if="!authData"
              label="Sign in"
              to="/login"
              color="primary"
              block
              :variant="plan.highlight ? 'solid' : 'outline'"
            />
            <UButton
              v-else-if="authData && !authData.user?.stripeCustomerId && plan.stripeIds"
              label="Buy plan"
              color="primary"
              block
              :variant="plan.highlight ? 'solid' : 'outline'"
              @click.prevent="generateSubscription(plan.stripeIds[isYearly === '1' ? 'yearly' : 'monthly'])"
            />
            <UButton
              v-else
              label="Dashboard"
              to="/dashboard/billing"
              color="primary"
              block
              :variant="plan.highlight ? 'solid' : 'outline'"
            />
          </template>
        </UPricingPlan>
      </UPricingPlans>
    </UContainer>

    <UPageSection>
      {{ authData }}
      <PoweredBy />
    </UPageSection>

    <UPageSection
      :title="page.faq.title"
      :description="page.faq.description"
    >
      <UAccordion
        :items="page.faq.items"
        :unmount-on-hide="false"
        :default-value="['0']"
        type="multiple"
        class="max-w-3xl mx-auto"
        :ui="{
          trigger: 'text-base text-highlighted',
          body: 'text-base text-muted'
        }"
      />
    </UPageSection>
  </div>
</template>
