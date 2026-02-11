import type { Metadata } from 'next';
import ProductoClient from './ProductoClient';
import { buildMetadata, generateSlug, truncateDescription, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo';
import { productJsonLd, breadcrumbJsonLd } from '@/lib/jsonLd';
import productsData from '@/data/products.json';

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

/**
 * Genera metadata dinámica para cada producto.
 * - Title: "{nombre} | {marca} — Raíces"
 * - Description: descripción del producto o fallback con nombre + categoría + marca
 * - OG image: imagen principal del producto o fallback al logo
 * - noindex si el producto no existe
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = productsData as Product[];
  const product = products.find((p) => generateSlug(p.Producto) === slug);

  // Producto no encontrado → noindex
  if (!product) {
    return buildMetadata({
      title: 'Producto no encontrado',
      description: 'El producto solicitado no existe o fue removido del catálogo.',
      path: `/producto/${slug}`,
      noIndex: true,
    });
  }

  // Construir title: "{nombre} | {marca} — Raíces"
  const marca = product.Marca.trim();
  const title = marca
    ? `${product.Producto} | ${marca} — ${SITE_NAME}`
    : `${product.Producto} — ${SITE_NAME}`;

  // Construir description con prioridad:
  // 1. Descripción del producto (si existe)
  // 2. Fallback: nombre + categoría + marca
  const categoryName = categoryDisplayNames[product.Categoría] || product.Categoría;
  const description = product.Descripción
    ? truncateDescription(product.Descripción)
    : truncateDescription(
        `${product.Producto}${marca ? ` de ${marca}` : ''} — ${categoryName} para construcción en seco. Disponible en ${SITE_NAME}. Consultá precio y stock.`
      );

  // OG image: imagen principal del producto o fallback al logo
  const productImage = Array.isArray(product.cloudinary_url)
    ? product.cloudinary_url[0]
    : product.cloudinary_url;

  return buildMetadata({
    title,
    description,
    path: `/producto/${slug}`,
    image: productImage || null,
    keywords: [
      product.Producto,
      marca,
      categoryName,
      'construcción en seco',
      'Bahía Blanca',
    ].filter(Boolean),
  });
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = productsData as Product[];
  const product = products.find((p) => generateSlug(p.Producto) === slug);

  // Structured data solo si el producto existe
  const jsonLdScripts = product
    ? [
        productJsonLd({
          name: product.Producto,
          description:
            product.Descripción ||
            `${product.Producto} — ${categoryDisplayNames[product.Categoría] || product.Categoría} para construcción en seco.`,
          image: (Array.isArray(product.cloudinary_url)
            ? product.cloudinary_url[0]
            : product.cloudinary_url) || DEFAULT_OG_IMAGE,
          brand: product.Marca.trim(),
          category:
            categoryDisplayNames[product.Categoría] || product.Categoría,
          slug,
          inStock: product.STOCK?.toUpperCase() !== 'NO',
        }),
        breadcrumbJsonLd([
          { name: 'Inicio', url: '/' },
          { name: 'Catálogo', url: '/catalogo' },
          {
            name:
              categoryDisplayNames[product.Categoría] || product.Categoría,
            url: `/catalogo?categoria=${generateSlug(product.Categoría)}`,
          },
          { name: product.Producto, url: `/producto/${slug}` },
        ]),
      ]
    : [];

  return (
    <>
      {jsonLdScripts.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <ProductoClient />
    </>
  );
}
