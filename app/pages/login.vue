<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login',
  description: 'Sign in with your Google account to continue'
})

const { signIn } = useAuth()
const signInLoading = ref(false)

async function signInWithGoogle() {
  signInLoading.value = true
  try {
    await signIn('google', { callbackUrl: '/dashboard?signInCallback=true' })
  } catch (error) {
    signInLoading.value = false
    console.error('Error signing in with Google:', error)
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="flex justify-center">
        <UIcon
          name="i-lucide-lock"
          class="h-10 w-10 text-primary"
        />
      </div>
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
        Welcome back
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        This is strictly for demo purposes - only your email and profile picture will be stored.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <UButton
          :loading="signInLoading"
          :disabled="signInLoading"
          color="neutral"
          variant="solid"
          size="lg"
          block
          icon="i-simple-icons-google"
          @click="signInWithGoogle"
        >
          Continue with Google
        </UButton>
      </div>

      <p class="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        By signing in, you agree to our
        <ULink
          to="#"
          class="text-primary font-medium hover:text-primary-600"
        >
          Terms of Service
        </ULink>
        and
        <ULink
          to="#"
          class="text-primary font-medium hover:text-primary-600"
        >
          Privacy Policy
        </ULink>.
      </p>
    </div>
  </div>
</template>
