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
  Hr,
  Column,
  Row
} from '@vue-email/components'

interface Props {
  userName: string
  userEmail: string
  subscriptionName: string
  subscriptionPrice: string
  billingCycle: string
  nextBillingDate: string
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
    <Preview>Your subscription has been activated!</Preview>
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
          Great news! Your <strong>{{ subscriptionName }}</strong> subscription has been successfully activated.
        </Text>

        <!-- Subscription Details -->
        <Section style="background: #f6f9fc; border-radius: 4px; padding: 24px; margin: 24px 0;">
          <Text style="margin: 0; font-size: 18px; font-weight: 600; color: #1f2937;">
            Subscription Details
          </Text>
          <Row style="margin-top: 16px;">
            <Column>
              <Text style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                Plan: <strong style="color: #1f2937;">{{ subscriptionName }}</strong>
              </Text>
              <Text style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                Price: <strong style="color: #1f2937;">{{ subscriptionPrice }}/{{ billingCycle }}</strong>
              </Text>
              <Text style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                Next billing: <strong style="color: #1f2937;">{{ nextBillingDate }}</strong>
              </Text>
            </Column>
          </Row>
        </Section>

        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          You now have access to all the premium features. Start exploring what {{ appName }} has to offer!
        </Text>

        <Section style="text-align: center; margin: 32px 0;">
          <Button
            :href="`${baseUrl}/dashboard`"
            style="background-color: #000000; border-radius: 3px; color: #ffffff; font-size: 16px; text-decoration: none; text-align: center; display: inline-block; padding: 12px 24px; margin-right: 12px;"
          >
            Access Dashboard
          </Button>
          <Button
            :href="`${baseUrl}/dashboard/billing`"
            style="background-color: transparent; border: 1px solid #d1d5db; border-radius: 3px; color: #374151; font-size: 16px; text-decoration: none; text-align: center; display: inline-block; padding: 12px 24px;"
          >
            Manage Billing
          </Button>
        </Section>

        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          If you have any questions about your subscription or need help getting started, our support team is here to help.
        </Text>

        <Text style="font-size: 16px; line-height: 26px; margin: 16px 0;">
          Best regards,<br>
          The {{ appName }} Team
        </Text>

        <Hr style="border: none; border-top: 1px solid #eaeaea; margin: 26px 0; width: 100%;" />

        <Text style="color: #666666; font-size: 12px; line-height: 24px;">
          This email was sent to {{ userEmail }}. You can manage your subscription settings in your
          <a
            :href="`${baseUrl}/dashboard/billing`"
            style="color: #666666;"
          >dashboard</a>.
        </Text>
      </Container>
    </Body>
  </Html>
</template>
