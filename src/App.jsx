import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import AssistantExperience from './components/AssistantExperience';
import Audience from './components/Audience';
import WhyAmparo from './components/WhyAmparo';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import PrimaryButton from './components/PrimaryButton';
import { CTA_URL } from './constants/links';

const App = () => {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.13),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(244,201,93,0.17),transparent_32%),linear-gradient(180deg,#ffffff_0%,#fbfefc_58%,#f8fdfb_100%)]" />

      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <AssistantExperience />
        <Audience />
        <WhyAmparo />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
        <PrimaryButton href={CTA_URL} className="w-full justify-center" withArrow>
          Generar mi documento
        </PrimaryButton>
      </div>
    </div>
  );
};

export default App;