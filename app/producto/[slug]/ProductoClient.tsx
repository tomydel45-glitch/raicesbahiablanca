'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronRight, ChevronLeft, ChevronDown, Package, FileText } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import productsData from '@/data/products.json';
import { getBrandLogo } from '@/lib/brandLogos';

interface Product {
  Producto: string;
  Marca: string;
  Dimensiones: string;
  Categoría: string;
  'Subcategoría 1': string;
  'Subcategoría 2': string;
  'Subcategoría 3': string;
  Descripción: string;
  STOCK: string;
  cloudinary_url: string | string[];
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const categoryDisplayNames: Record<string, string> = {
  'ACCESORIOS': 'Accesorios',
  'ADHESIVOS Y SELLADORES': 'Adhesivos y Selladores',
  'AISLACIONES': 'Aislaciones',
  'HERRAMIENTAS': 'Herramientas',
  'MASILLAS Y REVOQUES': 'Masillas y Revoques',
  'PERFILES': 'Perfiles',
  'PLACAS': 'Placas',
  'TERMINACIONES': 'Terminaciones',
};

export default function ProductoClient() {
  const params = useParams();
  const slug = params.slug as string;
  const products = productsData as Product[];
  
  const product = products.find(p => generateSlug(p.Producto) === slug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    specs: false,
  });

  const toggleSection = (section: 'description' | 'specs') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '5492914637191';
    const mensaje = `Hola, quiero consultar por el producto: ${product?.Producto}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted/50">
        <Navbar />
        <div className="pt-32 pb-16 container-wide text-center">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-border/30">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-6">El producto que buscás no existe o fue removido.</p>
            <Button asChild className="rounded-full">
              <Link href="/catalogo">Volver al catálogo</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const thumbnails = Array.isArray(product.cloudinary_url) 
    ? product.cloudinary_url 
    : [product.cloudinary_url];

  const specs = [
    ...(product.Dimensiones ? [{ label: 'Dimensiones', value: product.Dimensiones }] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted/50">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="pt-28 pb-4">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/catalogo" className="text-muted-foreground hover:text-primary transition-colors">Catálogo</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{product.Producto}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-8">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4 animate-fade-up">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src={thumbnails[selectedImage]}
                  alt={product.Producto}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
                {thumbnails.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? thumbnails.length - 1 : prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === thumbnails.length - 1 ? 0 : prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium">
                      {selectedImage + 1} / {thumbnails.length}
                    </div>
                  </>
                )}
              </div>
              {thumbnails.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {thumbnails.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square rounded-xl overflow-hidden bg-card/60 backdrop-blur-sm border-2 transition-all duration-300 ${
                        selectedImage === i 
                          ? 'border-primary shadow-md' 
                          : 'border-border/30 hover:border-primary/50'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.Producto} ${i + 1}`}
                        fill
                        sizes="80px"
                        className={`object-contain p-2 transition-opacity ${
                          selectedImage === i ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {product.Producto}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg">
                    {categoryDisplayNames[product.Categoría] || product.Categoría}
                  </span>
                  {product['Subcategoría 1'] && (
                    <span className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-lg capitalize">
                      {product['Subcategoría 1'].toLowerCase()}
                    </span>
                  )}
                  {product['Subcategoría 2'] && (
                    <span className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-lg capitalize">
                      {product['Subcategoría 2'].toLowerCase()}
                    </span>
                  )}
                  {product['Subcategoría 3'] && (
                    <span className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-lg capitalize">
                      {product['Subcategoría 3'].toLowerCase()}
                    </span>
                  )}
                  {product.Marca.trim() !== '' && (
                    <div className="flex items-center gap-2">
                      {getBrandLogo(product.Marca) && (
                        <Image 
                          src={getBrandLogo(product.Marca)!} 
                          alt={product.Marca} 
                          width={64}
                          height={24}
                          className="h-6 w-auto object-contain"
                        />
                      )}
                      <span className="text-muted-foreground font-medium">{product.Marca}</span>
                    </div>
                  )}
                </div>
                {product.STOCK && (
                  <div className="mt-3 px-4 py-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <p className="text-amber-700 dark:text-amber-400 text-sm font-medium flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {product.STOCK.toLowerCase().includes('comercializado') ? product.STOCK : 'Consultar disponibilidad - Stock limitado'}
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile CTA */}
              <div className="lg:hidden">
                <Button 
                  size="lg" 
                  className="w-full h-14 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleWhatsAppClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </Button>
              </div>

              {/* Description */}
              {product.Descripción && (
                <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 overflow-hidden">
                  <button
                    onClick={() => toggleSection('description')}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-semibold text-foreground">Descripción</span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSections.description ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.description && (
                    <div className="px-5 pb-5 pt-0">
                      <ul className="space-y-2">
                        {product.Descripción.split('\n').filter(line => line.trim()).map((line, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{line.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Specs */}
              {specs.length > 0 && (
                <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 overflow-hidden">
                  <button
                    onClick={() => toggleSection('specs')}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Ficha Técnica
                    </span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSections.specs ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.specs && (
                    <div className="px-5 pb-5 pt-0">
                      <dl className="space-y-3">
                        {specs.map((spec) => (
                          <div key={spec.label} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                            <dt className="text-muted-foreground">{spec.label}</dt>
                            <dd className="font-medium text-foreground">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>
              )}

              {/* Desktop CTA */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleWhatsAppClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
