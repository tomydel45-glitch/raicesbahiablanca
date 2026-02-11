import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { BrandsSection } from '@/components/BrandsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { ClientsSection } from '@/components/ClientsSection';
import { ProductsSection } from '@/components/ProductsSection';
import { ContactSection } from '@/components/ContactSection';
import MapWrapper from '@/components/MapWrapper';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Raíces Bahía Blanca - Inicio',
  description: 'Distribuidores autorizados de las principales marcas de construcción en seco en Bahía Blanca. Calidad, variedad y atención personalizada.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <BrandsSection />
        <ProductsSection />
        <ServicesSection />
        <AboutSection />
        <ClientsSection />
        <ContactSection />
        <MapWrapper />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
