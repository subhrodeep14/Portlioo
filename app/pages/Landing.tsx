
import HeroSection from '../components/hero'
import AboutSection from '../components/AboutSection'

import { Testimonial } from '../components/Testimonial'
import PricingTable from '../components/PricingTable'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <div>
        <HeroSection />
        <AboutSection />
        <Testimonial />
        <PricingTable />
        <Footer />
    </div>
  )
}

export default Landing