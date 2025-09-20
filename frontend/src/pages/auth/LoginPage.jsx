import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { 
  AuthLayout, 
  AuthInput, 
  AuthButton, 
  SocialAuthButton, 
  AuthDivider 
} from '../../components/auth'
import { 
  AUTH_CONFIG, 
  AUTH_FORMS, 
  AUTH_VALIDATION, 
  AUTH_MESSAGES 
} from '../../constants'
import { isValidEmail } from '../../utils'
import axios from 'axios'

/**
 * Modern Login Page Component
 * Features: Enhanced validation, toast notifications, smooth animations
 * Improved UX with loading states and error handling
 */
const LoginPage = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Enhanced validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        }
        if (!isValidEmail(value)) {
          return 'Please enter a valid email address'
        }
        return ''

      case 'password':
        if (!value) {
          return 'Password is required'
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

  // Enhanced social authentication
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
          loading: `Signing in with ${provider.label}...`,
          success: `Signed in with ${provider.label} successfully!`,
          error: `${provider.label} authentication is not yet available. Please use email login.`
        }
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced form submission
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

    // If there are errors, show them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      toast.error('Please fix the errors below')
      return
    }

    setIsLoading(true);

    // Create login promise for toast
    const loginPromise = axios.post(`${API_URL}/auth/login`, formData)

    toast.promise(
      loginPromise,
      {
        loading: 'Signing you in...',
        success: (response) => {
          // Clear form on success
          setFormData({
            email: '',
            password: ''
          })
          setRememberMe(false)
          
          // Simulate redirect - replace with actual routing
          setTimeout(() => {
            toast.success('Redirecting to dashboard...')
          }, 1000)
          
          return response.data.message || 'Welcome back! Login successful.'
        },
        error: (error) => {
          console.error("Login error:", error)
          
          if (error.response?.status === 401) {
            return 'Invalid email or password. Please check your credentials.'
          } else if (error.response?.status >= 500) {
            return 'Server error. Please try again later.'
          } else if (error.code === 'ERR_NETWORK') {
            return 'Network error. Please check your connection.'
          } else {
            return error.response?.data?.message || 'Something went wrong. Please try again.'
          }
        }
      }
    ).finally(() => {
      setIsLoading(false)
    })
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
        title={AUTH_CONFIG.titles.login}
        subtitle={AUTH_CONFIG.subtitles.login}
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
            {/* Email Field */}
            <AuthInput
              field={AUTH_FORMS.login.fields[0]}
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.email}
              touched={touched.email}
            />

            {/* Password Field */}
            <AuthInput
              field={AUTH_FORMS.login.fields[1]}
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.password}
              touched={touched.password}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-white border-slate-300 rounded focus:ring-primary-500 focus:ring-2 transition-colors"
              />
              <label htmlFor="remember-me" className="text-sm text-slate-700 cursor-pointer">
                Remember me
              </label>
            </div>
            <a 
              href={AUTH_CONFIG.links.forgotPassword.href} 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <AuthButton
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? 'Signing in...' : AUTH_CONFIG.buttons.login}
          </AuthButton>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-neutral-600">
              {AUTH_CONFIG.links.loginToSignUp.text}{' '}
              <a 
                href={AUTH_CONFIG.links.loginToSignUp.href} 
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 hover:underline"
              >
                {AUTH_CONFIG.links.loginToSignUp.linkText}
              </a>
            </p>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}

export default LoginPage