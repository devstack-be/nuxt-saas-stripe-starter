export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    }
  },
  site: {
    name: 'Nuxt SaaS Starter',
    description: 'Build and deploy your Nuxt SaaS within minutes',
    logo: '/logo.svg',
    social: {
      github: 'https://github.com/devstack-be/nuxt-saas-stripe-starter'
    }
  },
  seo: {
    siteName: 'Nuxt SaaS Starter'
  },
  footer: {
    credits: 'Devstack © 2024. All rights reserved.',
    navigation: [
      { name: 'Pricing', href: '/pricing' },
      { name: 'Docs', href: '/docs' }
    ],
    links: [
      {
        'icon': 'i-simple-icons-nuxtdotjs',
        'to': 'https://nuxt.com',
        'target': '_blank',
        'aria-label': 'Nuxt Website'
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/devstack-be/nuxt-saas-stripe-starter',
        'target': '_blank',
        'aria-label': 'Nuxt SaaS Starter GitHub'
      }
    ]
  },
  subscriptions: {
    frequencies: [
      { value: 'monthly', label: 'Monthly', default: true },
      { value: 'yearly', label: 'Yearly (-20%)' }
    ],
    currency: 'USD',
    plans: [
      {
        title: 'Starter',
        description: 'For Beginners',
        benefits: [
          'Up to 100 monthly posts',
          'Basic analytics and reporting',
          'Access to standard templates'
        ],
        prices: {
          monthly: 0,
          yearly: 0
        },
        stripeIds: {
          monthly: null,
          yearly: null
        }
      },
      {
        mostPopular: true,
        title: 'Pro',
        description: 'Unlock Advanced Features',
        benefits: [
          'Up to 500 monthly posts',
          'Advanced analytics and reporting',
          'Access to business templates',
          'Priority customer support',
          'Exclusive webinars and training.'
        ],
        prices: {
          monthly: 15,
          yearly: 144
        },
        stripeIds: {
          monthly: 'price_1PU9E9LAtQLLkA4NvFq3CjKh',
          yearly: 'price_1PU9ELLAtQLLkA4NKB10WtN8'
        }
      },
      {
        title: 'Business',
        description: 'For Power Users',
        benefits: [
          'Unlimited posts',
          'Real-time analytics and reporting',
          'Access to all templates, including custom branding',
          '24/7 business customer support',
          'Personalized onboarding and account management.'
        ],
        prices: {
          monthly: 30,
          yearly: 300
        },
        stripeIds: {
          monthly: 'price_1PU9EwLAtQLLkA4NlfujMvYV',
          yearly: 'price_1PU9FFLAtQLLkA4NpZDeEKUL'
        }
      }
    ]
  },
  pricing: {
    title: 'Pricing',
    subtitle: 'Pricing plans for teams of all sizes',
    description:
      'Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.'
  },
  CTA: {
    title: 'Ready to get started?',
    description:
      'Sign up for Devstack today and start building beautiful web applications in minutes.',
    buttons: {
      auth: [
        {
          label: 'Dashboard',
          to: '/dashboard',
          size: 'lg',
          icon: 'i-heroicons-arrow-right',
          trailing: true
        }
      ],
      guest: [
        {
          label: 'See our pricings',
          to: '/pricing',
          size: 'lg',
          icon: 'i-heroicons-arrow-right',
          trailing: true
        }
      ]
    }
  },
  features: {
    title: 'Deploy faster',
    subtitle: 'Everything you need to deploy your app',
    description:
      'Devstack is a full-featured platform that helps you build and deploy web applications in a matter of minutes.',
    items: [
      {
        title: 'Build faster',
        description:
          'Create a new app in minutes with our easy-to-use platform.',
        icon: 'i-simple-icons-nuxtdotjs'
      },
      {
        title: 'Deploy instantly',
        description: 'Deploy your app to the cloud with a single click.',
        icon: 'i-simple-icons-vercel'
      },
      {
        title: 'Integrate seamlessly',
        description: 'Connect your app to your favorite tools and services.',
        icon: 'i-simple-icons-figma'
      },
      {
        title: 'Scale effortlessly',
        description:
          'Scale your app to millions of users without breaking a sweat.',
        icon: 'i-simple-icons-amazonaws'
      }
    ]
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is Devstack?',
        answer:
          'Devstack is a full-featured platform that helps you build and deploy web applications in a matter of minutes.'
      },
      {
        question: 'How do I cancel my subscription?',
        answer:
          'You can cancel your subscription at any time by logging into your account and following the instructions.'
      },
      {
        question: 'Can I change my plan later on?',
        answer:
          'Yes, you can upgrade or downgrade your plan at any time. Your new plan will take effect at the end of your current billing cycle.'
      },
      {
        question: 'Do you offer discounts for non-profit organizations?',
        answer:
          'Yes, we offer a 20% discount to non-profit organizations. Please contact us for more information.'
      }
    ]
  }
})
