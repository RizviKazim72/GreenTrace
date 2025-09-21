import React from 'react'
import { Leaf } from 'lucide-react'
import { BRAND } from '../../constants'

/**
 * Reusable Logo component for consistent branding
 * Displays the GreenTrace logo with icon and text
 */
const Logo = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  iconClassName = '',
  textClassName = '' 
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'flex items-center space-x-1.5',
      icon: 'w-6 h-6',
      iconBg: 'w-6 h-6',
      text: 'text-base font-bold'
    },
    md: {
      container: 'flex items-center space-x-2',
      icon: 'w-8 h-8',
      iconBg: 'w-8 h-8',
      text: 'text-xl font-bold'
    },
    lg: {
      container: 'flex items-center space-x-3',
      icon: 'w-12 h-12',
      iconBg: 'w-12 h-12',
      text: 'text-2xl font-bold'
    }
  }

  const config = sizeConfig[size] || sizeConfig.md

  return (
    <div className={`${config.container} ${className}`}>
      {/* Icon container with gradient background */}
      <div className={`${config.iconBg} bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center ${iconClassName}`}>
        <Leaf className={`${config.icon} text-white`} />
      </div>
      
      {/* Brand text */}
      {showText && (
        <span className={`text-primary-900 ${config.text} ${textClassName}`}>
          {BRAND.name}
        </span>
      )}
    </div>
  )
}

export default Logo