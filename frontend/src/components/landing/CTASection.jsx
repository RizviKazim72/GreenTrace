import React, { useState } from 'react'
import { CTA_MESSAGES } from '../../constants'

const CTASection = () => {
  const [email, setEmail] = useState('')

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    // Handle email submission logic here
    setEmail('')
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6">
          {CTA_MESSAGES.footer.title}
        </h2>
        <p className="text-xl mb-8 text-primary-100">
          {CTA_MESSAGES.footer.subtitle}
        </p>
        
        <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={CTA_MESSAGES.footer.placeholder}
              className="flex-1 px-6 py-4 rounded-xl text-primary-900 placeholder-neutral-500 focus:outline-none focus:ring-4 focus:ring-white/30"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
            >
              {CTA_MESSAGES.footer.button}
            </button>
          </div>
        </form>
        
        <p className="text-sm text-primary-200 mt-4">
          {CTA_MESSAGES.footer.disclaimer}
        </p>
      </div>
    </section>
  )
}

export default CTASection
