// Utility functions for common operations

/**
 * Generates button classes based on style type
 * @param {string} style - 'primary' | 'border' | 'secondary'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @returns {string} Combined CSS classes
 */
export const getButtonClasses = (style = 'primary', size = 'md') => {
  const baseClasses = 'font-semibold rounded-xl transition-colors'
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const styleClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    border: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700'
  }
  
  return `${baseClasses} ${sizeClasses[size]} ${styleClasses[style]}`
}

/**
 * Generates card classes with hover effects
 * @param {string} bgColor - Background color class
 * @param {boolean} hasHover - Whether to include hover effects
 * @returns {string} Combined CSS classes
 */
export const getCardClasses = (bgColor = 'bg-white', hasHover = true) => {
  const baseClasses = 'rounded-2xl p-8'
  const hoverClasses = hasHover 
    ? 'hover:shadow-green-lg transition-all duration-300 hover:-translate-y-2'
    : ''
  
  return `${baseClasses} ${bgColor} ${hoverClasses}`.trim()
}

/**
 * Formats price display
 * @param {string|number} price - Price value
 * @param {string} period - Period text
 * @returns {object} Formatted price object
 */
export const formatPrice = (price, period = '') => {
  if (typeof price === 'string' && price.toLowerCase() === 'custom') {
    return {
      display: 'Custom',
      period: 'pricing'
    }
  }
  
  return {
    display: price,
    period
  }
}

/**
 * Generates consistent section padding classes
 * @param {string} variant - 'default' | 'large' | 'small'
 * @returns {string} Padding classes
 */
export const getSectionPadding = (variant = 'default') => {
  const variants = {
    small: 'py-12',
    default: 'py-20',
    large: 'py-32'
  }
  
  return variants[variant] || variants.default
}

/**
 * Safely gets nested object properties
 * @param {object} obj - Source object
 * @param {string} path - Dot notation path
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} Value at path or default
 */
export const safeGet = (obj, path, defaultValue = null) => {
  const keys = path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      return defaultValue
    }
  }
  
  return result
}

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Generates unique IDs for components
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export const generateId = (prefix = 'gt') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Debounces function calls
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}