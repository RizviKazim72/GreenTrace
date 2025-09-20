import React from 'react'
import { Github } from 'lucide-react'

/**
 * Social authentication button component
 * Supports Google, Microsoft, and GitHub providers with consistent styling
 */
const SocialAuthButton = ({ provider, onClick, disabled = false }) => {
  // Provider-specific styling configurations
  const providerStyles = {
    google: 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50',
    microsoft: 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50',
    github: 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800',
    default: 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
  }

  const baseClasses = `
    w-full py-3 px-4 rounded-xl font-medium text-sm border-2 
    transition-all duration-300 transform flex items-center justify-center space-x-3
    hover:scale-[1.02] hover:border-slate-300 hover:shadow-md
    active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-100
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `

  const buttonClasses = `${baseClasses} ${providerStyles[provider.icon] || providerStyles.default}`

  // Provider icon components
  const getProviderIcon = (provider) => {
    const iconMap = {
      google: (
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-red-500">G</span>
        </div>
      ),
      microsoft: (
        <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
          <div className="bg-red-500 rounded-sm"></div>
          <div className="bg-green-500 rounded-sm"></div>
          <div className="bg-blue-500 rounded-sm"></div>
          <div className="bg-yellow-500 rounded-sm"></div>
        </div>
      ),
      github: <Github className="w-5 h-5" />
    }
    
    return iconMap[provider.icon] || null
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {getProviderIcon(provider)}
      <span className="font-medium">{provider.label}</span>
    </button>
  )
}

export default SocialAuthButton