import React, { useState } from 'react'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { isValidEmail } from '../../utils'

/**
 * Input component for authentication forms
 * Handles password visibility toggle and validation display
 */
const AuthInput = ({ 
  field, 
  value, 
  onChange, 
  onBlur,
  error, 
  touched,
  showPasswordStrength = false 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const isPassword = field.type === 'password'
  const inputType = isPassword && showPassword ? 'text' : field.type

  // Dynamic input styling based on state
  const inputClasses = `
    w-full px-4 py-3 border-2 rounded-xl text-slate-900 placeholder-slate-400
    focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300
    bg-white/50 backdrop-blur-sm
    ${error && touched 
      ? 'border-red-300 bg-red-50/50 focus:ring-red-100' 
      : isFocused 
        ? 'border-primary-500 bg-white focus:ring-primary-100' 
        : 'border-slate-200 hover:border-slate-300'
    }
  `

  return (
    <div className="space-y-2">
      <label htmlFor={field.id} className="block text-sm font-semibold text-slate-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative group">
        <input
          id={field.id}
          name={field.name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false)
            onBlur && onBlur(e)
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          required={field.required}
          className={inputClasses}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors duration-200 p-1"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      
      {error && touched && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  )
}

export default AuthInput