import HeroSection from "../Components/HeroSec";
import HowItWorks from "../Components/Process";
import Benefits from "../Components/Benefits";
import Testimonials from "../Components/Testimonials";
import Faq from "../Components/Faq";
import Footer from "../Components/Footer";
import Cta from "../Components/Cta";
import Navbar from "../Components/Navbar";

export default function CarSharingLandingPage() {

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <Navbar />

      <HeroSection />

      <HowItWorks />


      {/* Benefits Section */}
      <Benefits />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <Faq />

      {/* CTA Section */}
      <Cta />

      {/* Footer */}
      <Footer />
    </div>
  );
}