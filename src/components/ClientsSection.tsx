'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const clients = [
  { name: 'Shell', logo: '/clients/shell.png' },
  {name:'McDonald’s', logo: '/clients/mcdonalds.png' },

  { name: 'Coca-Cola', logo: '/clients/cocacola.png' },
  { name: 'Stellantis', logo: '/clients/stellantis.png' },
  { name: 'Indian', logo: '/clients/indian.png' },
  { name: 'Dietrich', logo: '/clients/dietrich.png' },
  { name: 'Sidecar', logo: '/clients/sidecar.png' },
  { name: 'La Brújula 24', logo: '/clients/labrujula24.png' },
  { name: 'Spot', logo: '/clients/spot.png' },
  { name: 'ACA', logo: '/clients/aca.png' },
];

export function ClientsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="text-subtitle">QUIENES CONFÍAN EN NOSOTROS</span>
          <h2 className="heading-section mt-2">
            Nuestros <span className="text-primary">Clientes</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4" />
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full max-w-xs mx-auto"
          >
            <CarouselContent className="-ml-4">
              {clients.map((client) => (
                <CarouselItem key={client.name} className="pl-4 basis-1/2">
                  <div className="h-32 flex items-center justify-center p-4 group">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-20 max-w-full w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center max-w-4xl mx-auto">
          {clients.map((client) => (
            <div key={client.name} className="h-24 flex items-center justify-center group">
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-16 max-w-[140px] w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
        
        <p className="text-center text-muted-foreground mt-8">Entre otros</p>
      </div>
    </section>
  );
}
