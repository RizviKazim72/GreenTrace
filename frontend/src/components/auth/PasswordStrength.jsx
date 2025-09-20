import React from 'react'
import { Check, X } from 'lucide-react'

/**
 * Password Strength Indicator Component
 * Provides real-time feedback on password strength with visual indicators
 */
const PasswordStrength = ({ password }) => {
  const requirements = [
    {
      label: 'At least 8 characters',
      test: (pwd) => pwd.length >= 8
    },
    {
      label: 'Contains uppercase letter',
      test: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      label: 'Contains lowercase letter',
      test: (pwd) => /[a-z]/.test(pwd)
    },
    {
      label: 'Contains number',
      test: (pwd) => /\d/.test(pwd)
    },
    {
      label: 'Contains special character',
      test: (pwd) => /[@$!%*?&]/.test(pwd)
    }
  ]

  const getStrengthLevel = () => {
    const passedRequirements = requirements.filter(req => req.test(password)).length
    if (passedRequirements === 0) return { level: 0, label: '', color: '' }
    if (passedRequirements <= 2) return { level: 1, label: 'Weak', color: 'bg-red-500' }
    if (passedRequirements <= 3) return { level: 2, label: 'Fair', color: 'bg-yellow-500' }
    if (passedRequirements <= 4) return { level: 3, label: 'Good', color: 'bg-blue-500' }
    return { level: 4, label: 'Strong', color: 'bg-green-500' }
  }

  const strength = getStrengthLevel()
  const progress = password ? (strength.level / 4) * 100 : 0

  if (!password) return null

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700">Password Strength</span>
          {strength.label && (
            <span className={`text-sm font-semibold ${
              strength.level === 1 ? 'text-red-600' :
              strength.level === 2 ? 'text-yellow-600' :
              strength.level === 3 ? 'text-blue-600' :
              'text-green-600'
            }`}>
              {strength.label}
            </span>
          )}
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-slate-700">Password must contain:</span>
        <div className="grid grid-cols-1 gap-2">
          {requirements.map((requirement, index) => {
            const isPassed = requirement.test(password)
            return (
              <div key={index} className="flex items-center space-x-2">
                <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                  isPassed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {isPassed ? (
                    <Check size={12} />
                  ) : (
                    <X size={12} />
                  )}
                </div>
                <span className={`text-sm ${
                  isPassed ? 'text-green-700' : 'text-slate-600'
                }`}>
                  {requirement.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PasswordStrength