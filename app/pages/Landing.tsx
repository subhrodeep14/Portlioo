import React from 'react'
import HeroSection from '../components/hero'
import AboutSection from '../components/AboutSection'

import { Testimonial } from '../components/Testimonial'

const Landing = () => {
  return (
    <div>
        <HeroSection />
        <AboutSection />
       
        <Testimonial />
    </div>
  )
}

export default Landing