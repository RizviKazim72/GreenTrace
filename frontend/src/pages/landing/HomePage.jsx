import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  PricingSection,
  CTASection
} from '../../components/landing'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <CTASection />
    </div>
  )
}

export default HomePage