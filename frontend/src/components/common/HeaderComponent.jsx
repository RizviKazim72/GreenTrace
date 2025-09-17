import React from "react";
import { useState } from "react";   

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-primary-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <span className="text-xl font-bold text-primary-900">
                GreenTrace
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-neutral-700 hover:text-primary-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-neutral-700 hover:text-primary-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-neutral-700 hover:text-primary-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-neutral-700 hover:text-primary-600 transition-colors"
              >
                Contact
              </a>
              <button className="px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-green">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-neutral-700 hover:text-primary-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary-100">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-neutral-700 hover:text-primary-600"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-neutral-700 hover:text-primary-600"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-neutral-700 hover:text-primary-600"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-neutral-700 hover:text-primary-600"
                >
                  Contact
                </a>
                <button className="text-left text-primary-600">Sign In</button>
                <button className="text-left px-6 py-2 bg-primary-600 text-white rounded-lg w-fit">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default HeaderComponent;
