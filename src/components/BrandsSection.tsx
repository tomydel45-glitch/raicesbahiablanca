'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const brands = [
 { name: 'Knauf', logo: '/brands/knauf.png' },
 { name: 'Barbieri', logo: '/brands/barbieri.png' },
 {name:'Isover', logo: '/brands/isover.png' },
 { name: 'Eternit', logo: '/brands/eternit.png' },
 { name: 'Superboard', logo: '/brands/superboard.png' },
 { name: 'Oblak', logo: '/brands/oblak.png' },
 { name: 'Perfiles Revestidos', logo: '/brands/perfiles-revestidos.png' },
 { name: 'Aisplac', logo: '/brands/aisplac.png' },
  { name: 'Stanley', logo: '/brands/stanley.png' },
  { name: 'DeWalt', logo: '/brands/dewalt.png' },
  { name: 'Fischer', logo: '/brands/fischer.png' },
  { name: 'Atenneas', logo: '/brands/atenneas.png' },
  { name: 'Aquapanel', logo: '/brands/aquapanel.png' },
  { name: 'AMF', logo: '/brands/amf.png' },
  { name: 'Tel', logo: '/brands/tel.png' },
  { name: 'Tussok', logo: '/brands/tussok.png' },
  { name: '3m', logo: '/brands/3m.png' },
  { name: 'Barovo', logo: '/brands/barovo.png' },
  { name: 'Bul', logo: '/brands/bul.png' },
  { name: 'Emtop', logo: '/brands/emtop.png' },
  { name: 'Essamet', logo: '/brands/essamet.png' },
  { name: 'Ferrohouse', logo: '/brands/ferrohouse.png' },
  { name: 'Hamilton', logo: '/brands/hamilton.png' },
  { name: 'LP', logo: '/brands/lp.png' },
  { name: 'Polipor', logo: '/brands/polipor.png' },
  { name: 'Polytemp', logo: '/brands/polytemp.png' },
  { name: 'Typar', logo: '/brands/typar.png' },
  { name: 'Weber', logo: '/brands/weber.png' },
  { name: 'Wichi', logo: '/brands/wichi.png' },
];

export function BrandsSection() {
  return (
    <section className="py-12 bg-secondary">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/4 text-center lg:text-left space-y-3">
            <span className="text-subtitle">PARTNERS OFICIALES</span>
            <h2 className="heading-section text-2xl lg:text-3xl">
              Somos distribuidores <span className="text-primary">oficiales</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto lg:mx-0" />
          </div>

          <div className="lg:w-3/4 w-full">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2500,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {brands.map((brand) => (
                  <CarouselItem key={brand.name} className="pl-4 md:pl-6 basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <div className="h-28 flex items-center justify-center group">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-18 md:max-h-20 max-w-[120px] md:max-w-[180px] w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
