import type { Metadata } from 'next';
import CatalogoClient from './CatalogoClient';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonLd';
import { seoCategorias, catalogoDefaultSEO } from '@/lib/seoCategorias';

// Force dynamic rendering (searchParams)
export const dynamic = 'force-dynamic';

/**
 * Genera metadata dinámica según la categoría activa.
 * - Sin categoría → metadata general del catálogo
 * - Con categoría válida → metadata específica de la categoría
 * - Con filtros adicionales (marca, subcategoría, etc.) → noindex,follow
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const categoria = typeof params.categoria === 'string' ? params.categoria : undefined;
  const marca = typeof params.marca === 'string' ? params.marca : undefined;
  const subcategoria = typeof params.subcategoria === 'string' ? params.subcategoria : undefined;
  const buscar = typeof params.buscar === 'string' ? params.buscar : undefined;

  // Determinar si hay filtros adicionales que hagan la página no indexable
  const hasExtraFilters = !!(marca || subcategoria || buscar);

  // Obtener SEO de categoría o usar default
  const seo = categoria && seoCategorias[categoria]
    ? seoCategorias[categoria]
    : catalogoDefaultSEO;

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.canonical,
    noIndex: hasExtraFilters,
    keywords: [
      ...seo.keywords,
      ...(categoria ? [categoria.replace(/-/g, ' ')] : []),
    ],
  });
}

export default function CatalogoPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Catálogo', url: '/catalogo' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <CatalogoClient />
    </>
  );
}
