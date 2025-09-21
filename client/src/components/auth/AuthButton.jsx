import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * Reusable button component for authentication forms
 * Supports primary/secondary variants with loading states
 */
const AuthButton = ({ 
  type = 'submit', 
  variant = 'primary', 
  size = 'lg',
  isLoading = false, 
  disabled = false,
  children, 
  onClick,
  className = '',
  ...props 
}) => {
  const getButtonClasses = () => {
    const baseClasses = `
      relative w-full py-3 px-6 rounded-xl font-semibold text-base
      transition-all duration-300 transform
      focus:outline-none focus:ring-4 
      disabled:opacity-50 disabled:cursor-not-allowed
      flex items-center justify-center space-x-2
    `
    
    if (variant === 'primary') {
      return `${baseClasses}
        bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700
        text-white shadow-lg shadow-primary-500/25
        hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02]
        focus:ring-primary-100 active:scale-[0.98]
        border border-primary-600/20
      `
    }
    
    return `${baseClasses}
      bg-white border-2 border-slate-200 text-slate-700
      hover:bg-slate-50 hover:border-slate-300
      focus:ring-slate-100
    `
  }

  const buttonClasses = `${getButtonClasses()} ${className}`.trim()

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      <span>{children}</span>
    </button>
  )
}

export default AuthButton