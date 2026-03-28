import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import JsonTicker from '@/components/JsonTicker';
import IntroSection from '@/components/IntroSection';
import CircuitDivider from '@/components/CircuitDivider';
import CareerTimeline from '@/components/CareerTimeline';
import ProductTiers from '@/components/ProductTiers';
import Footer from '@/components/Footer';
import RaccoonToggle from '@/components/RaccoonToggle';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <JsonTicker />
        <IntroSection />
        <CircuitDivider />
        <CareerTimeline />
        <CircuitDivider />
        <ProductTiers />
      </main>
      <Footer />
      <RaccoonToggle />
    </>
  );
}
