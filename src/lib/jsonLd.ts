import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from './seo';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface LocalBusinessLocation {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
}

// ─── Organization / LocalBusiness ───────────────────────────────────────────────

const locations: LocalBusinessLocation[] = [
  {
    name: 'Raíces Bahía Blanca',
    address: 'Luiggi 1263',
    city: 'Bahía Blanca',
    province: 'Buenos Aires',
    postalCode: '8000',
    phone: '+5492914637191',
    email: 'administracion@raicesbahiablanca.com.ar',
  },
  {
    name: 'Raíces Viedma',
    address: 'Parque Industrial 206 y 207',
    city: 'Viedma',
    province: 'Río Negro',
    postalCode: '8500',
    phone: '+5492920446163',
    email: 'viedma@raicesbahiablanca.com.ar',
  },
  {
    name: 'Raíces Las Grutas',
    address: 'Colectora 995',
    city: 'Las Grutas',
    province: 'Río Negro',
    postalCode: '8521',
    phone: '+5492920366569',
    email: 'lasgrutas@raicesbahiablanca.com.ar',
  },
];

/**
 * JSON-LD para Organization con múltiples sucursales (LocalBusiness).
 * Se usa en la landing page (/).
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    description:
      'Distribuidores autorizados de materiales de construcción en seco en Bahía Blanca, Viedma y Las Grutas.',
    foundingDate: '1994',
    contactPoint: locations.map((loc) => ({
      '@type': 'ContactPoint',
      telephone: loc.phone,
      email: loc.email,
      contactType: 'sales',
      areaServed: loc.city,
      availableLanguage: 'Spanish',
    })),
    sameAs: [
      'https://www.instagram.com/raicesbahiablanca/',
    ],
    department: locations.map((loc) => ({
      '@type': 'LocalBusiness',
      name: loc.name,
      telephone: loc.phone,
      email: loc.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressRegion: loc.province,
        postalCode: loc.postalCode,
        addressCountry: 'AR',
      },
    })),
  };
}

// ─── Product ────────────────────────────────────────────────────────────────────

/**
 * JSON-LD para una página de producto individual.
 */
export function productJsonLd({
  name,
  description,
  image,
  brand,
  category,
  slug,
  inStock,
}: {
  name: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  slug: string;
  inStock: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url: `${SITE_URL}/producto/${slug}`,
    brand: brand
      ? {
          '@type': 'Brand',
          name: brand,
        }
      : undefined,
    category,
    offers: {
      '@type': 'Offer',
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  };
}

// ─── BreadcrumbList ─────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * JSON-LD para BreadcrumbList.
 * Mejora los snippets en resultados de búsqueda.
 */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
