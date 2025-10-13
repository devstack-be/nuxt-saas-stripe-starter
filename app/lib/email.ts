import { render } from '@vue-email/render'
import { resend } from '~/lib/resend'
import WelcomeEmail from '~/emails/WelcomeEmail.vue'
import SubscriptionEmail from '~/emails/SubscriptionEmail.vue'
import CancellationEmail from '~/emails/CancellationEmail.vue'

export interface SendWelcomeEmailParams {
  to: string
  userName: string
  userEmail: string
  appName?: string
  baseUrl?: string
}

export async function sendWelcomeEmail({
  to,
  userName,
  userEmail,
  appName = 'Nuxt SaaS Starter',
  baseUrl = 'http://localhost:3000'
}: SendWelcomeEmailParams) {
  try {
    // Render the Vue email component to HTML
    const html = await render(WelcomeEmail, {
      userName,
      userEmail,
      appName,
      baseUrl
    })

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.NODE_ENV === 'production'
        ? 'onboarding@yourdomain.com' // Replace with your verified domain in production
        : 'onboarding@resend.dev', // Resend test domain for development
      to: [process.env.NODE_ENV === 'production' ? to : 'delivered@resend.dev'],
      subject: `Welcome to ${appName}!`,
      html
    })

    if (error) {
      console.error('Error sending welcome email:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log('Welcome email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error)
    return { success: false, error }
  }
}

export async function sendEmail({
  to,
  subject,
  html,
  from = 'noreply@yourdomain.com'
}: {
  to: string
  subject: string
  html: string
  from?: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.NODE_ENV === 'production' ? from : 'noreply@resend.dev',
      to: [to],
      subject,
      html
    })

    if (error) {
      console.error('Error sending email:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error in sendEmail:', error)
    return { success: false, error }
  }
}

export interface SendSubscriptionEmailParams {
  to: string
  userName: string
  userEmail: string
  subscriptionName: string
  subscriptionPrice: string
  billingCycle: string
  nextBillingDate: string
  appName?: string
  baseUrl?: string
}

export async function sendSubscriptionEmail({
  to,
  userName,
  userEmail,
  subscriptionName,
  subscriptionPrice,
  billingCycle,
  nextBillingDate,
  appName = 'Nuxt SaaS Starter',
  baseUrl = 'http://localhost:3000'
}: SendSubscriptionEmailParams) {
  try {
    // Render the Vue email component to HTML
    const html = await render(SubscriptionEmail, {
      userName,
      userEmail,
      subscriptionName,
      subscriptionPrice,
      billingCycle,
      nextBillingDate,
      appName,
      baseUrl
    })

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.NODE_ENV === 'production'
        ? 'billing@yourdomain.com' // Replace with your verified domain in production
        : 'billing@resend.dev', // Resend test domain for development
      to: [to],
      subject: `Your ${subscriptionName} subscription is now active!`,
      html
    })

    if (error) {
      console.error('Error sending subscription email:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log('Subscription email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error in sendSubscriptionEmail:', error)
    return { success: false, error }
  }
}

export interface SendCancellationEmailParams {
  to: string
  userName: string
  userEmail: string
  subscriptionName: string
  cancelDate: string
  appName?: string
  baseUrl?: string
}

export async function sendCancellationEmail({
  to,
  userName,
  userEmail,
  subscriptionName,
  cancelDate,
  appName = 'Nuxt SaaS Starter',
  baseUrl = 'http://localhost:3000'
}: SendCancellationEmailParams) {
  try {
    // Render the Vue email component to HTML
    const html = await render(CancellationEmail, {
      userName,
      userEmail,
      subscriptionName,
      cancelDate,
      appName,
      baseUrl
    })

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.NODE_ENV === 'production'
        ? 'billing@yourdomain.com' // Replace with your verified domain in production
        : 'billing@resend.dev', // Resend test domain for development
      to: [to],
      subject: `Your ${subscriptionName} subscription has been cancelled`,
      html
    })

    if (error) {
      console.error('Error sending cancellation email:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log('Cancellation email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error in sendCancellationEmail:', error)
    return { success: false, error }
  }
}
