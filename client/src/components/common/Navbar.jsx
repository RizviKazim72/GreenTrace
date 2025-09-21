import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, User, LogOut } from 'lucide-react'
import { BRAND, NAVIGATION } from '../../constants'
import Logo from './Logo'

/**
 * Main navigation component for authenticated users
 * Includes user dropdown and responsive menu
 */

const Navbar = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Mock auth state - replace with actual auth context later
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    // Handle logout logic
  }

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.main.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    isActive('/auth/login')
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className={`px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors ${
                    isActive('/auth/signup') ? 'bg-primary-700' : ''
                  }`}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`}
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-sm font-medium text-neutral-700 hover:text-primary-600"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {user?.name?.[0] || 'U'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-1 border-neutral-200" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-neutral-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <div className="space-y-1">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {!isAuthenticated ? (
                <div className="pt-4 space-y-2">
                  <Link
                    to="/auth/login"
                    className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="block mx-3 px-4 py-2 text-base font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="pt-4 space-y-1">
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar