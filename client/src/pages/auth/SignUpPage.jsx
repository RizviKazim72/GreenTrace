import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { 
  AuthLayout, 
  AuthInput, 
  AuthButton, 
  SocialAuthButton, 
  AuthDivider,
  PasswordStrength
} from '../../components/auth'
import { 
  AUTH_CONFIG, 
  AUTH_FORMS, 
  AUTH_VALIDATION, 
  AUTH_MESSAGES 
} from '../../constants'
import { isValidEmail } from '../../utils'
import { useAuth } from '../../contexts/AuthContext'

/**
 * Modern SignUp Page Component
 * Features: Real-time validation, password strength indicator, toast notifications
 * Enhanced UX with loading states and smooth animations
 */
const SignUpPage = () => {
  const navigate = useNavigate()
  const { register, isLoading: authLoading } = useAuth()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPasswordStrength, setShowPasswordStrength] = useState(false)

  // Enhanced validation functions with better error messages
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          return AUTH_VALIDATION.required
        }
        if (value.trim().length < 2) {
          return AUTH_VALIDATION.name.minLength
        }
        if (value.trim().length > 50) {
          return AUTH_VALIDATION.name.maxLength
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return 'Name can only contain letters and spaces'
        }
        return ''

      case 'email':
        if (!value.trim()) {
          return AUTH_VALIDATION.required
        }
        if (!isValidEmail(value)) {
          return AUTH_VALIDATION.email
        }
        return ''

      case 'password':
        if (!value) {
          return AUTH_VALIDATION.required
        }
        if (value.length < 8) {
          return AUTH_VALIDATION.password.minLength
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
          return AUTH_VALIDATION.password.mustContain
        }
        return ''

      case 'confirmPassword':
        if (!value) {
          return AUTH_VALIDATION.required
        }
        if (value !== formData.password) {
          return AUTH_VALIDATION.password.mismatch
        }
        return ''

      default:
        return ''
    }
  }

  // Real-time validation on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Show password strength indicator when user starts typing password
    if (name === 'password') {
      setShowPasswordStrength(value.length > 0)
    }
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  // Enhanced input blur handling
  const handleInputBlur = (e) => {
    const { name, value } = e.target
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
    
    // Validate field
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  // Enhanced social authentication with better feedback
  const handleSocialAuth = async (provider) => {
    setIsLoading(true)
    
    try {
      toast.promise(
        new Promise((resolve, reject) => {
          // Simulate API call - replace with actual implementation
          setTimeout(() => {
            reject(new Error('Social authentication not yet implemented'))
          }, 1000)
        }),
        {
          loading: `Connecting to ${provider.label}...`,
          success: `Connected to ${provider.label} successfully!`,
          error: `${provider.label} authentication is not yet available. Please use email signup.`
        }
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced form submission with comprehensive validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
      }
    })

    // Check terms acceptance 
    if(!acceptTerms){
      newErrors.terms = "You must accept the terms and conditions."
    }

    // If there are errors, show them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      toast.error('Please fix the errors below')
      return
    }

    setIsLoading(true);

    try {
      // Use AuthContext register method
      const result = await register(formData)

      if (result.success) {
        toast.success(result.message)
        // Clear form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        setAcceptTerms(false)
        setShowPasswordStrength(false)
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      } else {
        if (result.errors) {
          setErrors(result.errors)
        }
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Signup error:", error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
          loading: {
            style: {
              background: '#3b82f6',
            },
          },
        }}
      />
      
      <AuthLayout 
        title={AUTH_CONFIG.titles.signUp}
        subtitle={AUTH_CONFIG.subtitles.signUp}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Social Auth Buttons */}
          <div className="space-y-3">
            {Object.values(AUTH_CONFIG.socialAuth).map((provider) => (
              <SocialAuthButton
                key={provider.icon}
                provider={provider}
                onClick={() => handleSocialAuth(provider)}
                disabled={isLoading}
              />
            ))}
          </div>

          <AuthDivider />

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AUTH_FORMS.signUp.fields.slice(0, 2).map((field) => (
                <AuthInput
                  key={field.id}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  error={errors[field.name]}
                  touched={touched[field.name]}
                />
              ))}
            </div>

            {/* Email Field */}
            <AuthInput
              field={AUTH_FORMS.signUp.fields[2]}
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.email}
              touched={touched.email}
            />

            {/* Password Field with Strength Indicator */}
            <div className="space-y-1">
              <AuthInput
                field={AUTH_FORMS.signUp.fields[3]}
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.password}
                touched={touched.password}
              />
              {showPasswordStrength && (
                <PasswordStrength password={formData.password} />
              )}
            </div>

            {/* Confirm Password Field */}
            <AuthInput
              field={AUTH_FORMS.signUp.fields[4]}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                id="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-5 h-5 text-primary-600 bg-white border-2 border-slate-300 rounded-md focus:ring-primary-500 focus:ring-2 mt-0.5 transition-colors"
              />
            </div>
            <div className="text-sm">
              <label htmlFor="accept-terms" className="text-slate-700 leading-relaxed cursor-pointer">
                I agree to the{' '}
                <a href={AUTH_CONFIG.links.termsAndPrivacy.terms} className="text-primary-600 hover:text-primary-700 font-semibold underline decoration-primary-200 underline-offset-2 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href={AUTH_CONFIG.links.termsAndPrivacy.privacy} className="text-primary-600 hover:text-primary-700 font-semibold underline decoration-primary-200 underline-offset-2 transition-colors">
                  Privacy Policy
                </a>
              </label>
              {errors.terms && (
                <div className="flex items-center space-x-2 text-red-600 text-xs mt-2 animate-pulse">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{errors.terms}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <AuthButton
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? AUTH_CONFIG.buttons.processing : AUTH_CONFIG.buttons.signUp}
          </AuthButton>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-neutral-600">
              {AUTH_CONFIG.links.signUpToLogin.text}{' '}
              <a 
                href={AUTH_CONFIG.links.signUpToLogin.href} 
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 hover:underline"
              >
                {AUTH_CONFIG.links.signUpToLogin.linkText}
              </a>
            </p>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}

export default SignUpPage