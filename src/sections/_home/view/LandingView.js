import React from 'react';
import '../../../components/landing-page/css/globals.css';
// components
import ScrollProgress from 'src/components/scroll-progress';
import {
  Header,
  EnrollNowSection,
  FeaturesSection,
  TennisBettingSection,
  SectionPrice,
  TestimonialsSection,
} from 'src/components/landing-page';
import FaqSection from 'src/components/landing-page/FaqSection';
import Footer from 'src/components/landing-page/Footer';

// ----------------------------------------------------------------------

export default function LandingView() {
  return (
    <>
      <div >
        <Header />
        <FeaturesSection />
        <EnrollNowSection />
        <TennisBettingSection />
        <SectionPrice />
        <TestimonialsSection />
        <FaqSection />
        <Footer/>
      </div>
      <ScrollProgress />
    </>
  );
}
