import React from 'react'
import FeatureCard from './FeatureCard'

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "📈",
      title: "Real-time Analytics",
      description: "Monitor your carbon emissions in real-time with advanced analytics and customizable dashboards.",
      bgColor: "bg-primary-50",
      iconBgColor: "bg-primary-600"
    },
    {
      id: 2,
      icon: "🎯",
      title: "Goal Tracking",
      description: "Set sustainability targets and track progress with intelligent goal management and reporting.",
      bgColor: "bg-secondary-50",
      iconBgColor: "bg-secondary-600"
    },
    {
      id: 3,
      icon: "🏢",
      title: "Multi-Location Support",
      description: "Manage carbon footprints across multiple facilities, offices, and geographical locations.",
      bgColor: "bg-accent-50",
      iconBgColor: "bg-accent-600"
    },
    {
      id: 4,
      icon: "📋",
      title: "Compliance Reporting",
      description: "Generate automated compliance reports for regulatory requirements and certifications.",
      bgColor: "bg-primary-50",
      iconBgColor: "bg-primary-600"
    },
    {
      id: 5,
      icon: "🔗",
      title: "API Integration",
      description: "Connect with existing systems through our comprehensive API and webhook infrastructure.",
      bgColor: "bg-secondary-50",
      iconBgColor: "bg-secondary-600"
    },
    {
      id: 6,
      icon: "🛡️",
      title: "Enterprise Security",
      description: "Bank-level security with encryption, compliance certifications, and audit trails.",
      bgColor: "bg-accent-50",
      iconBgColor: "bg-accent-600"
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Everything You Need for Carbon Management
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Comprehensive tools designed for modern organizations committed to sustainability and environmental responsibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
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
