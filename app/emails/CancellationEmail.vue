<script setup lang="ts">
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Img,
  Text,
  Section,
  Button,
  Hr
} from '@vue-email/components'

interface Props {
  userName: string
  userEmail: string
  subscriptionName: string
  cancelDate: string
  appName?: string
  baseUrl?: string
}

withDefaults(defineProps<Props>(), {
  appName: 'Nuxt SaaS Starter',
  baseUrl: 'http://localhost:3000'
})
</script>

<template>
  <Html>
    <Head />
    <Preview>Your subscription has been cancelled</Preview>
    <Body style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
      <Container style="margin: 0 auto; padding: 20px 0 48px;">
        <Img
          :src="`${baseUrl}/favicon.ico`"
          width="40"
          height="40"
          alt="Logo"
          style="display: block; margin: 0 auto;"
        />

        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          Hi {{ userName }},
        </Text>

        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          We're sorry to see you go. Your <strong>{{ subscriptionName }}</strong> subscription has been cancelled and will remain active until <strong>{{ cancelDate }}</strong>.
        </Text>

        <Section style="background: #fef2f2; border-radius: 4px; padding: 24px; margin: 24px 0; border-left: 4px solid #ef4444;">
          <Text style="margin: 0; font-size: 16px; font-weight: 600; color: #dc2626;">
            Important Information
          </Text>
          <Text style="margin: 8px 0 0 0; font-size: 14px; color: #374151;">
            • You'll continue to have access to all features until {{ cancelDate }}<br>
            • Your data will be preserved for 30 days after cancellation<br>
            • You can reactivate your subscription at any time before {{ cancelDate }}
          </Text>
        </Section>

        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          If you change your mind, you can easily reactivate your subscription in your dashboard.
        </Text>

        <Section style="text-align: center; margin: 32px 0;">
          <Button
            :href="`${baseUrl}/dashboard/billing`"
            style="background-color: #000000; border-radius: 3px; color: #ffffff; font-size: 16px; text-decoration: none; text-align: center; display: inline-block; padding: 12px 24px; margin-right: 12px;"
          >
            Reactivate Subscription
          </Button>
        </Section>

        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          We'd love to hear why you decided to cancel. Your feedback helps us improve {{ appName }} for everyone.
        </Text>

        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          Thank you for being part of our community.<br>
          The {{ appName }} Team
        </Text>

        <Hr style="border: none; border-top: 1px solid #eaeaea; margin: 26px 0; width: 100%;" />

        <Text style="color: #666666; font-size: 12px; line-height: 24px;">
          This email was sent to {{ userEmail }}. If you have questions about your cancellation,
          <a
            :href="`${baseUrl}/dashboard/billing`"
            style="color: #666666;"
          >contact support</a>.
        </Text>
      </Container>
    </Body>
  </Html>
</template>
