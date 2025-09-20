import React from 'react'

/**
 * Reusable feature card component for displaying features with icons
 */
const FeatureCard = ({ icon, title, description, bgColor, iconBgColor }) => {
  return (
    <div className={`${bgColor} rounded-2xl p-8 hover:shadow-green-lg transition-all duration-300 hover:-translate-y-2`}>
      <div className={`w-16 h-16 ${iconBgColor} rounded-xl flex items-center justify-center mb-6`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-primary-900 mb-4">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  )
}

export default FeatureCard
