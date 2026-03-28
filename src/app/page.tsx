import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import JsonTicker from '@/components/JsonTicker';
import IntroSection from '@/components/IntroSection';
import CircuitDivider from '@/components/CircuitDivider';
import CareerTimeline from '@/components/CareerTimeline';
import ProductTiers from '@/components/ProductTiers';
import ConnectSection from '@/components/ConnectSection';
import Footer from '@/components/Footer';
import RaccoonToggle from '@/components/RaccoonToggle';

export default function Home() {
  return (
    <>
      <Header />
      <ScrollProgress />
      <main>
        <HeroSection />
        <JsonTicker />
        <IntroSection />
        <CircuitDivider />
        <CareerTimeline />
        <CircuitDivider />
        <ProductTiers />
        <CircuitDivider />
        <ConnectSection />
      </main>
      <Footer />
      <RaccoonToggle />
    </>
  );
}
