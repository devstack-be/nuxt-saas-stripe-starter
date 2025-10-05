<script setup lang="ts">
import { ref } from "vue";

const { signIn } = useAuth();

const signInLoading = ref(false);
const authStore = useAuthStore();
const toast = useToast();

const logInWith = async (provider: string) => {
  signInLoading.value = true;
  await signIn(provider, { callbackUrl: "/dashboard?signInCallback=true" });
  setTimeout(() => {
    signInLoading.value = false;
    authStore.toggleSignInModal();
  }, 500);
};
</script>
<template>
  <UModal v-model="authStore.isSignInModalOpen" closable>
    <div class="p-4">
      <div>
        <div class="mx-auto flex items-center justify-center">
          <SvgLogo class="h-16" aria-hidden="true" />
        </div>
        <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
          <!-- //Trick to avoid initial focus on the Close button (see https://github.com/nuxt/ui/issues/734) -->
          <button class="opacity-0 w-0 h-0" />
          <UButton
            color="indigo"
            :initial-focus="null"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="authStore.toggleSignInModal()"
          />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 class="text-xl font-semibold leading-6 text-gray-900">Sign in</h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              This is strictly for demo purposes - only your email and profile
              picture will be stored.
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <UButton
          :loading="signInLoading"
          :disabled="signInLoading"
          @click.prevent="logInWith('google')"
          type="button"
          block
          color="indigo"
          icon="i-mdi-google"
          size="lg"
        >
          Sign in with Google
        </UButton>
      </div>
    </div>
  </UModal>
</template>
