import React from 'react'
import StatCard from './StatCard'

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      value: "10,000+",
      label: "Organizations"
    },
    {
      id: 2,
      value: "50M+",
      label: "Tons CO₂ Tracked"
    },
    {
      id: 3,
      value: "150+",
      label: "Countries"
    },
    {
      id: 4,
      value: "99.9%",
      label: "Uptime"
    }
  ]

  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Trusted by Organizations Worldwide</h2>
          <p className="text-xl text-primary-200">
            Join thousands of companies making a real impact on the environment
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
