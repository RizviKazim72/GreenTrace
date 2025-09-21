import React from 'react'
import { Shield } from 'lucide-react'
import { BRAND } from '../../constants'
import Logo from '../common/Logo'

/**
 * Wrapper layout for authentication pages
 * Provides consistent styling and structure for login/signup forms
 */
const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
          {/* Header section */}
          <div className="text-center mb-6">
            {/* Logo with glow effect */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Logo 
                  size="lg" 
                  showText={false}
                  iconClassName="shadow-lg shadow-primary-500/25"
                />
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl blur-xl opacity-30 -z-10"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Form content area */}
          <div className="space-y-5">
            {children}
          </div>

          {/* Security indicator */}
          <div className="flex items-center justify-center mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-slate-500">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium">256-bit encryption</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            Trusted by 10,000+ companies worldwide
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout