import React from 'react'

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
            Track Your <span className="text-primary-600">Carbon Footprint</span> Like Never Before
          </h1>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Empower your organization with advanced carbon tracking, real-time analytics, and actionable insights. 
            Transform sustainability from a goal into measurable impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-green-lg hover:shadow-green-xl transform hover:-translate-y-1">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 text-lg font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 flex items-center space-x-2">
              <span>Watch Demo</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Hero Image/Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-primary-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-12 flex items-center px-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-white font-medium">GreenTrace Dashboard</span>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-br from-neutral-50 to-primary-50 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📊</span>
                </div>
                <p className="text-neutral-600">Interactive Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
