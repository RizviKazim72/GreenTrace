import React from 'react'
import HeaderComponent from '../../components/common/HeaderComponent'
import HeroSection from '../../components/landing/HeroSection'
import FeaturesSection from '../../components/landing/FeaturesSection'
import StatsSection from '../../components/landing/StatsSection'
import PricingSection from '../../components/landing/PricingSection'
import CTASection from '../../components/landing/CTASection'
import Footer from '../../components/common/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <HeaderComponent />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default HomePage