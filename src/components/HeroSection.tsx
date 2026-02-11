import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-construction.jpg"
          alt="Almacén de construcción"
          fill
          priority
          className="object-cover object-center md:object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-dark/40 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-up">
            <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-primary text-sm font-medium">
              Distribuidores Oficiales
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Tecnología en{' '}
              <span className="text-primary">Construcción</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              Todo para construcción en seco y steel frame en un solo lugar: materiales de excelencia, asesoramiento técnico y experiencia que garantizan soluciones confiables y eficientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" variant="default">
                <Link href="/catalogo">
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="hero">
                <a href="#contacto">Contactanos</a>
              </Button>
            </div>
          </div>

          {/* Right - Logo & Company Name */}
          <div className="hidden lg:flex flex-col items-center justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Image
              src="/logo-raices.png"
              alt="Raíces Bahía Blanca Logo"
              width={448}
              height={448}
              priority
              className="w-[28rem] h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
