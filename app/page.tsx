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
import { buildMetadata } from '@/lib/seo';
import { organizationJsonLd } from '@/lib/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Raíces Bahía Blanca — Materiales de Construcción en Seco',
  description:
    'Todo para construcción en seco y steel frame en un solo lugar: materiales de excelencia, asesoramiento técnico y experiencia que garantizan soluciones confiables y eficientes. Distribuidores autorizados en Bahía Blanca, Viedma y Las Grutas desde 1994.',
  path: '/',
  keywords: [
    'construcción en seco Bahía Blanca',
    'materiales construcción',
    'steel frame',
    'placas de yeso',
    'perfiles metálicos',
    'aislaciones',
    'durlock Bahía Blanca',
    'steel frame Bahía Blanca',
    'drywall',
    'cielorraso',
    'tabiques',
    'Knauf',
    'Barbieri',
    'construcción en seco Viedma',
    'materiales Las Grutas',
  ],
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
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
