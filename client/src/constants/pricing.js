// Pricing Plans
export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$99',
    period: 'per month',
    originalPrice: '$149',
    discount: '33% off',
    category: 'small-business',
    features: [
      'Up to 5 locations',
      'Basic reporting',
      'Email support',
      'API access',
      '10GB storage'
    ],
    limitations: [
      'No advanced analytics',
      'Limited integrations'
    ],
    buttonText: 'Start Free Trial',
    buttonStyle: 'border',
    isPopular: false,
    trialDays: 14,
    setupFee: 0
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$299',
    period: 'per month',
    originalPrice: '$399',
    discount: '25% off',
    category: 'growing-business',
    features: [
      'Unlimited locations',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'Compliance reporting',
      '100GB storage',
      'White-label reports'
    ],
    limitations: [],
    buttonText: 'Start Free Trial',
    buttonStyle: 'primary',
    isPopular: true,
    trialDays: 14,
    setupFee: 0,
    mostPopularReason: 'Best value for growing organizations'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    category: 'enterprise',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom development',
      'On-premise deployment',
      'SLA guarantee',
      'Unlimited storage',
      '24/7 phone support',
      'Custom training'
    ],
    limitations: [],
    buttonText: 'Contact Sales',
    buttonStyle: 'border',
    isPopular: false,
    customPricing: true,
    minimumUsers: 100
  }
]

// Pricing Features Comparison
export const PRICING_FEATURES = {
  locations: {
    name: 'Locations',
    starter: '5',
    professional: 'Unlimited',
    enterprise: 'Unlimited'
  },
  storage: {
    name: 'Storage',
    starter: '10GB',
    professional: '100GB',
    enterprise: 'Unlimited'
  },
  support: {
    name: 'Support',
    starter: 'Email',
    professional: 'Priority Email',
    enterprise: '24/7 Phone + Email'
  },
  analytics: {
    name: 'Analytics',
    starter: 'Basic',
    professional: 'Advanced',
    enterprise: 'Custom'
  }
}

// Add-ons
export const PRICING_ADDONS = [
  {
    id: 'additional-storage',
    name: 'Additional Storage',
    price: '$10',
    period: 'per 10GB/month',
    applicablePlans: ['starter', 'professional']
  },
  {
    id: 'priority-support',
    name: 'Priority Support',
    price: '$99',
    period: 'per month',
    applicablePlans: ['starter']
  }
]