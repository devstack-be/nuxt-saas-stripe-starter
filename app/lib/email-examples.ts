// Example usage in your authentication flow or signup process

import { sendWelcomeEmail, sendSubscriptionEmail } from '~/lib/email'

// Example 1: Send welcome email after user registration
export async function handleUserSignup(userData: { email: string, name: string }) {
  try {
    // ... your user creation logic here ...

    // Send welcome email
    const emailResult = await sendWelcomeEmail({
      to: userData.email,
      userName: userData.name,
      userEmail: userData.email,
      baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    })

    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error)
      // Handle email sending failure (maybe log it, but don't fail the signup)
    }

    return { success: true, user: userData }
  } catch (error) {
    console.error('Error in handleUserSignup:', error)
    throw error
  }
}

// Example 2: Send subscription email after Stripe payment success
export async function handleSubscriptionActivated(subscriptionData: {
  userEmail: string
  userName: string
  subscriptionName: string
  subscriptionPrice: string
  billingCycle: string
  nextBillingDate: string
}) {
  try {
    const emailResult = await sendSubscriptionEmail({
      to: subscriptionData.userEmail,
      userName: subscriptionData.userName,
      userEmail: subscriptionData.userEmail,
      subscriptionName: subscriptionData.subscriptionName,
      subscriptionPrice: subscriptionData.subscriptionPrice,
      billingCycle: subscriptionData.billingCycle,
      nextBillingDate: subscriptionData.nextBillingDate,
      baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    })

    if (!emailResult.success) {
      console.error('Failed to send subscription email:', emailResult.error)
    }

    return emailResult
  } catch (error) {
    console.error('Error in handleSubscriptionActivated:', error)
    throw error
  }
}

// Example 3: Send custom email using the generic sendEmail function
export async function sendCustomNotification(
  to: string,
  subject: string,
  htmlContent: string
) {
  const { sendEmail } = await import('~/lib/email')

  return await sendEmail({
    to,
    subject,
    html: htmlContent,
    from: 'notifications@yourdomain.com'
  })
}
