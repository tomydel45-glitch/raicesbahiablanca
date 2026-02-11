import type { Metadata } from 'next';
import ObraDetalleClient from './ObraDetalleClient';
import { buildMetadata, truncateDescription, SITE_NAME } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonLd';
import obrasData from '@/data/obras.json';

interface Obra {
  slug: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  cloudinary_url: string[];
}

const obras: Obra[] = obrasData;

/**
 * Genera metadata dinámica para cada obra.
 * - Title: "{nombre obra} — Obras Raíces"
 * - Description: resumen de la obra o fallback
 * - OG image: imagen principal de la obra o fallback al logo
 * - noindex si slug inválido
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const obra = obras.find((o) => o.slug === slug);

  // Obra no encontrada → noindex
  if (!obra) {
    return buildMetadata({
      title: 'Obra no encontrada',
      description: 'La obra solicitada no existe o fue removida.',
      path: `/obras/${slug}`,
      noIndex: true,
    });
  }

  const title = `${obra.titulo} — Obras ${SITE_NAME}`;

  const description = obra.descripcion
    ? truncateDescription(obra.descripcion)
    : truncateDescription(
        `Proyecto ${obra.titulo} en ${obra.ubicacion}. Obra realizada con materiales de construcción en seco por ${SITE_NAME}.`
      );

  // Imagen principal: última del array (usada como card) o la primera
  const obraImage =
    obra.cloudinary_url.length > 0
      ? obra.cloudinary_url[obra.cloudinary_url.length - 1]
      : null;

  return buildMetadata({
    title,
    description,
    path: `/obras/${slug}`,
    image: obraImage,
    type: 'article',
    keywords: [
      obra.titulo,
      obra.ubicacion,
      'obras construcción en seco',
      'proyecto steel frame',
      'vivienda construcción en seco',
      'casa steel frame',
      'Bahía Blanca',
    ],
  });
}

export default async function ObraDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const obra = obras.find((o) => o.slug === slug);

  const breadcrumb = obra
    ? breadcrumbJsonLd([
        { name: 'Inicio', url: '/' },
        { name: 'Obras', url: '/obras' },
        { name: obra.titulo, url: `/obras/${slug}` },
      ])
    : null;

  return (
    <>
      {breadcrumb && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      )}
      <ObraDetalleClient />
    </>
  );
}
