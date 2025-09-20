import React from 'react'
import PricingCard from './PricingCard'
import { PRICING_PLANS, SECTION_TITLES } from '../../constants'

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            {SECTION_TITLES.pricing.title}
          </h2>
          <p className="text-xl text-neutral-600">
            {SECTION_TITLES.pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => (
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
