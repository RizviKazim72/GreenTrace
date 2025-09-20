import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Pricing card component with popular plan highlighting
 */
const PricingCard = ({ name, price, period, features, buttonText, buttonStyle, isPopular }) => {
  const cardClasses = isPopular 
    ? "bg-primary-600 text-white rounded-2xl p-8 relative transform scale-105 shadow-green-xl"
    : "bg-white rounded-2xl p-8 border border-primary-100 hover:shadow-green-lg transition-all duration-300"

  const buttonClasses = buttonStyle === "primary"
    ? "w-full py-3 bg-white text-primary-600 rounded-xl hover:bg-neutral-50 transition-colors font-semibold"
    : "w-full py-3 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors"

  const checkmarkColor = isPopular ? "text-secondary-400" : "text-primary-600"

  return (
    <div className={cardClasses}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-primary-900'}`}>
          {name}
        </h3>
        <div className={`text-4xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-primary-600'}`}>
          {price}
        </div>
        <div className={isPopular ? 'text-primary-200' : 'text-neutral-600'}>
          {period}
        </div>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <span className={checkmarkColor}>✓</span>
            <span className={isPopular ? 'text-white' : 'text-neutral-700'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      
      <Link 
        to="/auth/signup" 
        className={`${buttonClasses} block text-center`}
      >
        {buttonText}
      </Link>
    </div>
  )
}

export default PricingCard
