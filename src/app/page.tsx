import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import HashScrollHandler from '@/components/HashScrollHandler';
import HeroSection from '@/components/HeroSection';
import JsonTicker from '@/components/JsonTicker';
import IntroSection from '@/components/IntroSection';
import CircuitDivider from '@/components/CircuitDivider';
import CareerTimeline from '@/components/CareerTimeline';
import ProductTiers from '@/components/ProductTiers';
import SignalPreview from '@/components/SignalPreview';
import PaymentsRail from '@/components/PaymentsRail';
import ConnectSection from '@/components/ConnectSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <ScrollProgress />
      <HashScrollHandler />
      <main id="main-content">
        <HeroSection />
        <JsonTicker />
        <IntroSection />
        <CircuitDivider />
        <CareerTimeline />
        <CircuitDivider />
        <ProductTiers />
        <PaymentsRail />
        <CircuitDivider />
        <SignalPreview />
        <ConnectSection />
      </main>
      <Footer />
    </>
  );
}
