<template>
  <div>
    <h2 class="text-2xl font-semibold leading-7 text-gray-900">
      Settings
    </h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 mb-2">
      Manage account and website settings.
    </p>
    <div
      class="mt-4 mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
    >
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Profile
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-500 mb-2">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <dl
          class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
        >
          <UForm
            :schema="schema"
            :state="state"
            @submit="onSubmit"
          >
            <div class="pt-6 sm:flex">
              <dt
                class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
              >
                Name
              </dt>
              <dd
                class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto"
              >
                <UFormGroup name="name">
                  <UInput v-model="state.name" />
                </UFormGroup>

                <button
                  :disabled="isFormLoading"
                  type="submit"
                  class="font-semibold text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
                >
                  Update
                </button>
              </dd>
            </div>
          </UForm>
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Email address
            </dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">
                {{ authSession?.user?.email }}
              </div>
            </dd>
          </div>
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Role
            </dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-400">
                Coming soon
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Delete account
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-500 mb-2">
          No longer want to use our service? You can delete your account here.
          This action is not reversible. All information related to this account
          will be deleted permanently.
        </p>
        <dl
          class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
        >
          <div class="pt-6 sm:flex">
            <UButton
              color="error"
              size="lg"
              @click.prevent="isOpen = true"
            >
              Yes, delete my account
            </UButton>
          </div>
        </dl>
      </div>
    </div>
    <UModal v-model="isOpen">
      <div class="p-4">
        <div>
          <div class="mx-auto flex items-center justify-center rounded-full">
            <NuxtImg
              class="size-12 rounded-full"
              :src="authSession?.user?.image"
              alt="Photo de profil"
            />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              Delete account
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                <span class="font-bold">Warning: </span>This will permanently
                delete your account and your active subscription!
              </p>
            </div>
            <UDivider class="my-4" />
            <UFormGroup class="mt-2">
              <template #label>
                To confirm, type
                <span class="font-bold">"confirm delete account"</span> in the
                box below
              </template>
              <UInput v-model="passphrase" />
            </UFormGroup>
          </div>
        </div>
        <div class="mt-2">
          <UButton
            :loading="isDeleteAccountLoading"
            :disabled="isDeleteAccountLoading"
            block
            color="error"
            size="lg"
            @click.prevent="confirmDeleteAccount"
          >
            Delete my account
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { data: authSession, getSession, signOut } = useAuth()

const schema = z.object({
  name: z.string().min(3).max(32)
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: authSession.value?.user?.name ?? ''
})
const toast = useToast()
const isFormLoading = ref(false)
const isOpen = ref(false)
const passphrase = ref('')
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  isFormLoading.value = true
  await $fetch('/api/update-profile', {
    method: 'POST',
    body: JSON.stringify(event.data)
  })
  isFormLoading.value = false
  await getSession()
  toast.add({
    title: 'Profile updated',
    description: 'Your profile has been updated successfully.',
    color: 'error'
  })
}
const isDeleteAccountLoading = ref(false)
async function confirmDeleteAccount() {
  isDeleteAccountLoading.value = true
  if (passphrase.value !== 'confirm delete account') {
    toast.add({
      title: 'Invalid verification',
      description: 'Please type \'confirm delete account\' to confirm.',
      color: 'error'
    })
    isDeleteAccountLoading.value = false
    return
  }
  // Delete account
  await $fetch('/api/delete-account', {
    method: 'DELETE'
  })
  signOut({
    callbackUrl: '/'
  })
  isDeleteAccountLoading.value = false
  isOpen.value = false
}
definePageMeta({
  layout: 'dashboard'
})
useHead({
  title: 'Settings'
})
</script>
