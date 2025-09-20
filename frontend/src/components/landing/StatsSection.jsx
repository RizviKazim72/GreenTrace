import React from 'react'
import StatCard from './StatCard'
import { STATS_DATA, SECTION_TITLES } from '../../constants'

const StatsSection = () => {
  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{SECTION_TITLES.stats.title}</h2>
          <p className="text-xl text-primary-200">
            {SECTION_TITLES.stats.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {STATS_DATA.map((stat) => (
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
