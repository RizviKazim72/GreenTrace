import React, { createContext, useContext, useState, useEffect } from 'react'

/**
 * Authentication Context
 * Manages user authentication state, tokens, and auth operations
 */
const AuthContext = createContext({})

/**
 * Authentication Provider Component
 * Provides authentication state and methods to child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const API_URL = import.meta.env.VITE_API_BASE_URL

  /**
   * Initialize authentication state on app load
   */
  useEffect(() => {
    initializeAuth()
  }, [])

  /**
   * Initialize authentication from localStorage
   */
  const initializeAuth = async () => {
    try {
      setIsLoading(true)
      
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        // Verify token with backend
        const isValid = await verifyToken(storedToken)
        
        if (isValid) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
          setIsAuthenticated(true)
        } else {
          // Token is invalid, clear storage
          clearAuth()
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      clearAuth()
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Verify token with backend
   * @param {string} authToken - JWT token to verify
   * @returns {boolean} - Token validity
   */
  const verifyToken = async (authToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.user) {
          // Update user data from backend
          setUser(data.user)
          localStorage.setItem('user', JSON.stringify(data.user))
          return true
        }
      }
      
      return false
    } catch (error) {
      console.error('Token verification error:', error)
      return false
    }
  }

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - Login result
   */
  const login = async (email, password) => {
    try {
      setIsLoading(true)
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store auth data
        setToken(data.token)
        setUser(data.user)
        setIsAuthenticated(true)
        
        // Store in localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        return {
          success: true,
          message: data.message,
          user: data.user
        }
      } else {
        return {
          success: false,
          message: data.message || 'Login failed'
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - Registration result
   */
  const register = async (userData) => {
    try {
      setIsLoading(true)
      
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store auth data
        setToken(data.token)
        setUser(data.user)
        setIsAuthenticated(true)
        
        // Store in localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        return {
          success: true,
          message: data.message,
          user: data.user
        }
      } else {
        return {
          success: false,
          message: data.message || 'Registration failed',
          errors: data.errors
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setIsLoading(true)
      
      // Call logout endpoint if token exists
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
      setIsLoading(false)
    }
  }

  /**
   * Clear authentication state and localStorage
   */
  const clearAuth = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  /**
   * Forgot password
   * @param {string} email - User email
   * @returns {Promise<Object>} - Forgot password result
   */
  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Forgot password error:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      }
    }
  }

  /**
   * Reset password
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} - Reset password result
   */
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Reset password error:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      }
    }
  }

  /**
   * Get authorization headers for API calls
   * @returns {Object} - Headers with authorization
   */
  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  /**
   * Make authenticated API call
   * @param {string} url - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Response>} - Fetch response
   */
  const authenticatedFetch = async (url, options = {}) => {
    const authHeaders = getAuthHeaders()
    
    return fetch(url, {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
      },
    })
  }

  const value = {
    // State
    user,
    token,
    isLoading,
    isAuthenticated,
    
    // Methods
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyToken,
    getAuthHeaders,
    authenticatedFetch,
    clearAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use authentication context
 * @returns {Object} - Authentication context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

export default AuthContext