<script setup lang="ts">
interface GitHubRepo {
  stargazers_count: number
}
const { data: page } = await useAsyncData('index', () => queryCollection('index').first())
const { data: stars } = await useFetch<GitHubRepo>(
  'https://api.github.com/repos/devstack-be/nuxt-saas-stripe-starter',
  {
    default: () => ({ stargazers_count: 0 }),
    server: false,
    transform: (data: GitHubRepo) => ({
      stargazers_count: data?.stargazers_count || 0
    })
  }
)
const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.hero.links"
    >
      <template #top>
        <HeroBackground />
      </template>

      <template #links>
        <UButton
          v-for="(link, index) in page.hero.links"
          :key="index"
          v-bind="{
            ...link,
            label: index === 1 ? `${link.label}: ${nFormatter(stars?.stargazers_count || 0)}` : link.label
          }"
        />
      </template>
      <template #title>
        <MDC
          :value="page.title"
          unwrap="p"
        />
      </template>

      <div
        class="-m-2 rounded-xl bg-white dark:bg-neutral-800 p-2 ring-1 ring-inset ring-neutral-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4"
      >
        <NuxtImg
          fit="cover"
          src="/images/idea-launch.svg"
          alt="App screenshot"
          class="rounded-md mx-auto"
        />
      </div>
    </UPageHero>

    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :features="section.features"
    >
      <ImagePlaceholder />
    </UPageSection>

    <UPageSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
          spotlight
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="testimonials"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
          <template #footer>
            <UUser
              v-bind="testimonial.user"
              size="lg"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <USeparator />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden"
    >
      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>
