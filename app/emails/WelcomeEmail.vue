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
    <Preview>Welcome to our SaaS platform!</Preview>
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
          Welcome to <strong>{{ appName }}</strong>! We're excited to have you on board.
        </Text>
        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          Your account has been successfully created. You can now access all the features of our platform.
        </Text>
        <Section style="text-align: center; margin: 32px 0;">
          <Button
            :href="`${baseUrl}/dashboard`"
            style="background-color: #000000; border-radius: 3px; color: #ffffff; font-size: 16px; text-decoration: none; text-align: center; display: inline-block; padding: 12px 12px;"
          >
            Get Started
          </Button>
        </Section>
        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          If you have any questions, feel free to reach out to our support team.
        </Text>
        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          Best regards,<br>
          The {{ appName }} Team
        </Text>
        <Hr style="border: none; border-top: 1px solid #eaeaea; margin: 26px 0; width: 100%;" />
        <Text style="color: #666666; font-size: 12px; line-height: 24px;">
          This email was sent to {{ userEmail }}. If you didn't create an account with us, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
</template>
