import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { generateSlug } from '@/lib/seo';
import productsData from '@/data/products.json';
import obrasData from '@/data/obras.json';

/**
 * Sitemap dinámico generado automáticamente.
 * Incluye:
 * - Páginas estáticas (/, /catalogo, /obras)
 * - Páginas de categoría (/catalogo?categoria=X)
 * - Todas las páginas de producto (/producto/[slug])
 * - Todas las páginas de obras (/obras/[slug])
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Páginas estáticas ────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/catalogo`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/obras`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // ── Categorías del catálogo ──────────────────────────────────────────────────
  const categorias = [
    'accesorios',
    'adhesivos-y-selladores',
    'aislaciones',
    'herramientas',
    'masillas-y-revoques',
    'perfiles',
    'placas',
    'terminaciones',
  ];

  const categoryPages: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${SITE_URL}/catalogo?categoria=${cat}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ── Productos individuales ───────────────────────────────────────────────────
  // Deduplicar por slug (puede haber nombres iguales)
  const uniqueSlugs = new Set<string>();

  const productPages: MetadataRoute.Sitemap = [];

  for (const p of productsData as { Producto: string }[]) {
    const slug = generateSlug(p.Producto);
    if (!slug || uniqueSlugs.has(slug)) continue;
    uniqueSlugs.add(slug);
    productPages.push({
      url: `${SITE_URL}/producto/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // ── Obras individuales ───────────────────────────────────────────────────────
  const obraPages: MetadataRoute.Sitemap = (
    obrasData as { slug: string }[]
  ).map((obra) => ({
    url: `${SITE_URL}/obras/${obra.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...obraPages];
}
