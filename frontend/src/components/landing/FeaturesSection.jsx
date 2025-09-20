import React from 'react'
import FeatureCard from './FeatureCard'
import { FEATURES_DATA, SECTION_TITLES } from '../../constants'

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            {SECTION_TITLES.features.title}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {SECTION_TITLES.features.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bgColor={feature.bgColor}
              iconBgColor={feature.iconBgColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
