import type { Metadata } from 'next';

// ─── Constantes globales SEO ───────────────────────────────────────────────────

export const SITE_NAME = 'Raíces Bahía Blanca';
export const SITE_URL = 'https://raices-bahia-blanca.vercel.app';
export const SITE_DESCRIPTION =
  'Distribuidores autorizados de materiales de construcción en seco en Bahía Blanca, Viedma y Las Grutas. Placas, perfiles, aislaciones, herramientas y más.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo-raices.png`;

// ─── Helpers reutilizables ─────────────────────────────────────────────────────

/**
 * Trunca una descripción a un largo máximo apto para meta description (160 chars).
 * Corta en la última palabra completa antes del límite.
 */
export function truncateDescription(text: string, maxLength = 155): string {
  if (!text) return '';
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;
  const truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '…';
}

/**
 * Genera una URL canónica absoluta a partir de un path relativo.
 */
export function canonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

/**
 * Construye la metadata de OpenGraph genérica del sitio o con imagen dinámica.
 */
export function buildOpenGraph({
  title,
  description,
  url,
  image,
  type = 'website',
}: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  type?: 'website' | 'article';
}): Metadata['openGraph'] {
  return {
    title,
    description,
    url: canonicalUrl(url),
    siteName: SITE_NAME,
    locale: 'es_AR',
    type,
    images: [
      {
        url: image || DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

/**
 * Genera un objeto Metadata completo a partir de parámetros comunes.
 * Evita repetir boilerplate en cada página.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  type = 'website',
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  noIndex?: boolean;
  type?: 'website' | 'article';
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path),
    },
    openGraph: buildOpenGraph({ title, description, url: path, image, type }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || DEFAULT_OG_IMAGE],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
    ...(keywords && { keywords }),
  };
}

/**
 * Genera un slug URL-safe a partir de un texto.
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
