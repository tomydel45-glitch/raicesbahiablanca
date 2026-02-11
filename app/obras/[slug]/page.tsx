'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import obrasData from '@/data/obras.json';

interface Obra {
  slug: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  cloudinary_url: string[];
}

const obras: Obra[] = obrasData;

export default function ObraDetalle() {
  const params = useParams();
  const slug = params.slug as string;
  
  const obra = obras.find(o => o.slug === slug);

  if (!obra) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 container-wide text-center">
          <h1 className="heading-section text-foreground mb-4">Obra no encontrada</h1>
          <p className="text-muted-foreground mb-8">La obra que buscás no existe o fue removida.</p>
          <Link href="/obras" className="text-primary hover:underline">
            Volver a Obras
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 bg-muted">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/obras" className="hover:text-primary transition-colors">
              Obras
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{obra.titulo}</span>
          </nav>
        </div>
      </div>

      {/* Hero de la obra */}
      <section className="pb-8 pt-8 bg-muted">
        <div className="container-wide">
          <h1 className="heading-section text-foreground mb-4">
            {obra.titulo}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg">{obra.ubicacion}</span>
          </div>
        </div>
      </section>

      {/* Carrusel de imágenes - orden original del array */}
      <section className="py-12 bg-background">
        <div className="container-wide">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {obra.cloudinary_url.map((image, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-3/4 lg:basis-2/3">
                  <div className="aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                    <img
                      src={image}
                      alt={`${obra.titulo} - Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
            <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
          </Carousel>
        </div>
      </section>

      {/* Descripción (solo si tiene) */}
      {obra.descripcion && (
        <section className="py-16">
          <div className="container-wide">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Sobre el proyecto
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {obra.descripcion}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container-wide text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            ¿Tenés un proyecto similar?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contactanos para asesorarte sobre los materiales ideales para tu obra.
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Contactar
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
