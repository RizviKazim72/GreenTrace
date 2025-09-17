import React from 'react'
import PricingCard from './PricingCard'

const PricingSection = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Starter",
      price: "$99",
      period: "per month",
      features: [
        "Up to 5 locations",
        "Basic reporting",
        "Email support",
        "API access"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "border",
      isPopular: false
    },
    {
      id: 2,
      name: "Professional",
      price: "$299",
      period: "per month",
      features: [
        "Unlimited locations",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "Compliance reporting"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "primary",
      isPopular: true
    },
    {
      id: 3,
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom development",
        "On-premise deployment",
        "SLA guarantee"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "border",
      isPopular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-neutral-600">
            Choose the plan that fits your organization's needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              buttonText={plan.buttonText}
              buttonStyle={plan.buttonStyle}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
