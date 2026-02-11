import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const mainCategories = [
  {
    id: 1,
    name: 'Accesorios',
    image: '/categories/accesorios.jpg',
    slug: 'accesorios',
  },
  {
    id: 2,
    name: 'Adhesivos y Selladores',
    image: '/categories/adhesivos.jpg',
    slug: 'adhesivos-y-selladores',
  },
  {
    id: 3,
    name: 'Aislaciones',
    image: '/categories/aislaciones.jpg',
    slug: 'aislaciones',
  },
  {
    id: 4,
    name: 'Herramientas',
    image: '/categories/herramientas.jpg',
    slug: 'herramientas',
  },
  {
    id: 5,
    name: 'Masillas y Revoques',
    image: '/categories/masillas.jpg',
    slug: 'masillas-y-revoques',
  },
  {
    id: 6,
    name: 'Perfiles',
    image: '/categories/perfiles.jpg',
    slug: 'perfiles',
  },
  {
    id: 7,
    name: 'Placas',
    image: '/categories/placas.jpg',
    slug: 'placas',
  },
  {
    id: 8,
    name: 'Terminaciones',
    image: '/categories/terminaciones.jpg',
    slug: 'terminaciones',
  },
];

export function ProductsSection() {
  return (
    <section id="productos" className="py-24 bg-muted">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="heading-section">
            Materiales y <span className="text-primary">Accesorios</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explorá nuestra selección de materiales de construcción en seco para cada proyecto.
          </p>
        </div>

        {/* Responsive grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mainCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/catalogo?categoria=${category.slug}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] animate-fade-up shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Default overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category name - always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="text-white font-bold text-base md:text-lg lg:text-xl leading-tight line-clamp-2">
                  {category.name}
                </h3>
              </div>
              
              {/* Hover content - "Ver productos" with arrow */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="flex items-center gap-2 text-white font-semibold text-sm md:text-base bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  Ver productos
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/catalogo">
              Ver todo el catálogo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
