import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import obrasData from '@/data/obras.json';

interface Obra {
  slug: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  cloudinary_url: string[];
}

const obras: Obra[] = obrasData;

export const metadata: Metadata = {
  title: 'Obras Realizadas - Raíces Bahía Blanca',
  description: 'Conocé algunos de los proyectos en los que participamos, brindando materiales de primera calidad para construcción en seco en Bahía Blanca y la región.',
};

export default function Obras() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-muted">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-subtitle mb-4 block">Nuestro Portfolio</span>
            <h1 className="heading-display text-foreground mb-6">
              Obras Realizadas
            </h1>
            <p className="text-lg text-muted-foreground">
              Conocé algunos de los proyectos en los que participamos, aportando materiales de primera calidad y ejecución con mano de obra calificada en sistemas de construcción en seco en Bahía Blanca y la región.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Obras */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {obras.map((obra) => {
              // Usar la última imagen del array para la card
              const cardImage = obra.cloudinary_url[obra.cloudinary_url.length - 1];
              
              return (
                <Link
                  key={obra.slug}
                  href={`/obras/${obra.slug}`}
                  className="group card-elevated overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={cardImage}
                      alt={obra.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Ubicación sobre la imagen */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {obra.ubicacion}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {obra.titulo}
                    </h3>
                    <span className="inline-flex items-center mt-4 text-sm font-medium text-primary">
                      Ver proyecto
                      <svg 
                        className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
