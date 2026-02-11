# Análisis Detallado del Proyecto - Migración Vite → Next.js 15

## 📋 RESUMEN EJECUTIVO

**Proyecto:** Raíces Bahía Blanca - Sitio web de materiales de construcción  
**Stack Actual:** Vite + React + TypeScript + Tailwind CSS + shadcn/ui  
**Stack Objetivo:** Next.js 15 (App Router) + React + TypeScript + Tailwind CSS + shadcn/ui  
**Fecha de Análisis:** 10 de febrero de 2026

---

## 🗺️ MAPA DE RUTAS

### Rutas Actuales (React Router)
```
/ ................................. Index (página principal)
/catalogo ......................... Catálogo de productos con filtros
/producto/:slug ................... Detalle individual de producto
/obras ............................ Listado de obras realizadas
/obras/:slug ...................... Detalle individual de obra
* ................................. 404 Not Found
```

### Rutas en Next.js 15 (App Router)
```
app/
├── page.tsx ....................... / (Index)
├── catalogo/
│   └── page.tsx ................... /catalogo
├── producto/
│   └── [slug]/
│       └── page.tsx ............... /producto/[slug]
├── obras/
│   ├── page.tsx ................... /obras
│   └── [slug]/
│       └── page.tsx ............... /obras/[slug]
├── not-found.tsx .................. 404
└── layout.tsx ..................... Root Layout
```

---

## 📦 DEPENDENCIAS

### ✅ MANTENER (Compatible con Next.js)
- **UI Components:** Todas las librerías de @radix-ui/*
- **State Management:** @tanstack/react-query
- **Forms:** react-hook-form, @hookform/resolvers, zod
- **Styling:** tailwindcss, tailwindcss-animate, class-variance-authority, clsx, tailwind-merge
- **Icons:** lucide-react
- **Maps:** leaflet, react-leaflet, @react-leaflet/core
- **Carousels:** embla-carousel-react, embla-carousel-autoplay
- **Utils:** date-fns, input-otp, cmdk
- **Themes:** next-themes
- **Charts:** recharts
- **Notifications:** sonner
- **Modals:** vaul

### ❌ ELIMINAR (Incompatible / No necesario)
- **react-router-dom** → Reemplazar con next/link y next/navigation
- **vite** → Reemplazado por Next.js
- **@vitejs/plugin-react-swc** → No necesario
- **eslint-plugin-react-refresh** → Reemplazar con eslint-config-next

### ➕ AGREGAR (Nuevas dependencias)
- **next** (^15.1.6)
- **eslint-config-next** (^15.1.6)

---

## 🧩 COMPONENTES - ANÁLISIS DE INTERACTIVIDAD

### Componentes "use client" (Con hooks/estado/eventos)

#### 1. **Navbar.tsx** 🔴 CRÍTICO
```typescript
// Hooks usados:
- useState: isScrolled, isMobileMenuOpen
- useEffect: scroll listener, body scroll lock

// Migraciones necesarias:
- Mantener "use client"
- Link → next/link
- Asegurar hidratación correcta del estado de scroll
```

#### 2. **ContactSection.tsx** 🟡 MEDIO
```typescript
// Hooks usados:
- useState: formData (nombre, apellido, email, mensaje)
- onChange handlers para inputs

// Migraciones necesarias:
- "use client"
- Posibilidad de usar Server Actions para el envío del formulario
```

#### 3. **MapSection.tsx** 🔴 CRÍTICO
```typescript
// Hooks usados:
- useEffect: inicialización de Leaflet

// Migraciones necesarias:
- "use client" (Leaflet requiere window/DOM)
- Dynamic import con { ssr: false } desde layout/page padre
```

#### 4. **Catalogo.tsx** 🔴 CRÍTICO
```typescript
// Hooks usados:
- useState: selectedCategory, selectedSubcategories, searchQuery, isFilterOpen, currentPage
- useEffect: scroll on filter change
- useMemo: filteredProducts, paginatedProducts, uniqueCategories
- useSearchParams (React Router)

// Migraciones necesarias:
- "use client"
- useSearchParams (React Router) → useSearchParams (next/navigation)
- Considerar Server Components para SEO del catálogo
```

#### 5. **Producto.tsx** 🟡 MEDIO
```typescript
// Hooks usados:
- useState: selectedImage, expandedSections
- useParams (React Router)

// Migraciones necesarias:
- "use client" o hacer Server Component con Client Component anidado
- useParams (React Router) → useParams (next/navigation)
- Posibilidad de generateStaticParams para SSG
```

#### 6. **ObraDetalle.tsx** 🟡 MEDIO
```typescript
// Hooks usados:
- useParams (React Router)

// Migraciones necesarias:
- Puede ser Server Component con Client Components para carousel
- useParams (React Router) → useParams (next/navigation)
- generateStaticParams para SSG
```

#### 7. **NotFound.tsx** 🟢 BAJO
```typescript
// Hooks usados:
- useEffect: logging
- useLocation

// Migraciones necesarias:
- Convertir a not-found.tsx de Next.js (estructura especial)
- Eliminar useLocation (no necesario en Next.js)
```

#### 8. **Componentes UI (shadcn/ui)** 🟡 VARIOS
```typescript
// Los siguientes necesitan "use client":
- carousel.tsx (useState, useCallback, useEffect)
- dialog.tsx (interactividad)
- dropdown-menu.tsx (interactividad)
- sheet.tsx (interactividad)
- toast.tsx (interactividad)
- Y otros componentes interactivos de Radix UI

// Ya tienen "use client" en su definición original de shadcn/ui
```

### Componentes Server Component (Sin interactividad)

#### Pueden ser Server Components:
- **HeroSection.tsx** → Solo presentación estática
- **BrandsSection.tsx** → Solo imágenes/texto
- **ServicesSection.tsx** → Solo presentación
- **AboutSection.tsx** → Solo presentación
- **ClientsSection.tsx** → Puede requerir "use client" si usa carousel
- **ProductsSection.tsx** → Verificar si usa carousel
- **Footer.tsx** → Solo links y presentación
- **WhatsAppButton.tsx** → Verificar si usa onClick
- **CTASection.tsx** → Solo presentación

---

## 🎨 TAILWIND CSS

### Configuración Actual
```typescript
content: [
  "./pages/**/*.{ts,tsx}",      // Vite
  "./components/**/*.{ts,tsx}",  // Vite
  "./app/**/*.{ts,tsx}",         // Ya incluido para Next.js
  "./src/**/*.{ts,tsx}"          // Catchall
]
```

### Configuración para Next.js
```typescript
content: [
  "./app/**/*.{ts,tsx}",           // Páginas App Router
  "./src/components/**/*.{ts,tsx}", // Componentes
  "./src/app/**/*.{ts,tsx}",       // Si usas src/app
]
```

### Variables CSS Personalizadas
- ✅ Mantener todas las variables CSS en `index.css`
- ✅ Las animaciones personalizadas son compatibles
- ✅ Los shadows y borders radius personalizados funcionan

---

## 🗂️ ESTRUCTURA DE ARCHIVOS

### Estructura Actual (Vite)
```
src/
├── pages/
│   ├── Index.tsx
│   ├── Catalogo.tsx
│   ├── Producto.tsx
│   ├── Obras.tsx
│   ├── ObraDetalle.tsx
│   └── NotFound.tsx
├── components/
│   ├── [múltiples componentes]
│   └── ui/
├── data/
│   ├── obras.json
│   └── products.json
├── lib/
│   ├── brandLogos.ts
│   └── utils.ts
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── assets/
├── App.tsx
├── main.tsx
└── index.css
```

### Estructura Propuesta (Next.js 15)
```
src/
├── app/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Index
│   ├── not-found.tsx            # 404
│   ├── globals.css              # Styles
│   ├── catalogo/
│   │   └── page.tsx
│   ├── producto/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── obras/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── [componentes existentes]
│   └── ui/
├── data/
│   ├── obras.json
│   └── products.json
├── lib/
│   ├── brandLogos.ts
│   └── utils.ts
└── hooks/
    ├── use-mobile.tsx
    └── use-toast.ts

public/
└── [assets estáticos]
```

---

## 🔄 CAMBIOS DE API

### React Router → Next.js Navigation

| React Router | Next.js | Ubicación |
|--------------|---------|-----------|
| `<Link to="/catalogo">` | `<Link href="/catalogo">` | next/link |
| `useNavigate()` | `useRouter()` | next/navigation |
| `useParams()` | `useParams()` | next/navigation |
| `useSearchParams()` | `useSearchParams()` | next/navigation |
| `useLocation()` | `usePathname()` | next/navigation |
| `<Navigate />` | `redirect()` | next/navigation |
| `<BrowserRouter>` | (no necesario) | - |
| `<Routes>` | (no necesario) | - |

### Otros Cambios de API

| Vite/React | Next.js | Notas |
|------------|---------|-------|
| `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` | Variables de entorno |
| `<img src={...}>` | `<Image src={...}>` | next/image (recomendado) |
| CSS Imports | CSS Modules o globals.css | En layout.tsx |

---

## 🚀 OPTIMIZACIONES POSIBLES

### 1. **Static Site Generation (SSG)**
```typescript
// Para páginas de productos y obras con slugs conocidos
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
```

### 2. **Image Optimization**
```typescript
// Cloudinary + next/image
import Image from 'next/image';

<Image 
  src={product.cloudinary_url} 
  alt={product.Producto}
  width={800}
  height={600}
  priority={isFirstImage}
/>
```

### 3. **Metadata y SEO**
```typescript
// En cada page.tsx
export const metadata: Metadata = {
  title: 'Catálogo - Raíces Bahía Blanca',
  description: 'Catálogo completo de materiales...',
  openGraph: {
    title: '...',
    description: '...',
    images: ['...'],
  },
};
```

### 4. **Server Components por Defecto**
- La mayoría de componentes pueden ser Server Components
- Solo agregar "use client" cuando sea estrictamente necesario
- Mejor performance y SEO

### 5. **Lazy Loading de Mapas**
```typescript
// En el componente padre
const MapSection = dynamic(() => import('@/components/MapSection'), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>
});
```

---

## ⚠️ PUNTOS CRÍTICOS

### 1. **Leaflet (Mapas)**
- ⚠️ Leaflet requiere `window` y DOM
- Solución: Dynamic import con `ssr: false`
- Agregar configuración en next.config.ts

### 2. **Radix UI**
- ✅ Compatible con Next.js
- Algunos componentes necesitan "use client"
- Considerar transpilePackages en next.config.ts

### 3. **TanStack Query**
- ✅ Compatible con Next.js
- Requiere QueryClientProvider con "use client"
- Crear provider wrapper component

### 4. **Rutas Dinámicas**
- Cambiar `:slug` por `[slug]` en nombres de carpetas
- useParams devuelve un objeto, no un hook
- Considerar generateStaticParams para SSG

### 5. **Assets Estáticos**
- Mover de `src/assets/` a `public/`
- Actualizar imports en componentes

---

## 📊 MÉTRICAS ESTIMADAS

### Complejidad de Migración
- **Configuración:** 🟢 Baja (archivos ya creados)
- **Reestructuración:** 🟡 Media (6 páginas + layouts)
- **Componentes:** 🟡 Media (~15 componentes a revisar)
- **Rutas:** 🟢 Baja (6 rutas totales)
- **Testing:** 🟡 Media (todas las funcionalidades)

### Tiempo Estimado
- PASO 1 (Setup): ✅ Completado
- PASO 2 (Estructura): ~1-2 horas
- PASO 3 (Migración): ~3-4 horas
- PASO 4 (Rutas/Links): ~1-2 horas
- PASO 5 (Testing): ~2-3 horas
- **Total:** ~7-11 horas

### Riesgo
- **Bajo:** Configuración, rutas simples
- **Medio:** Componentes con estado, mapas
- **Alto:** Ninguno identificado

---

## ✅ CHECKLIST DE MIGRACIÓN

### PASO 1: Setup ✅
- [x] Analizar estructura actual
- [x] Listar todas las páginas y rutas
- [x] Identificar dependencias
- [x] Revisar configuración Tailwind
- [x] Identificar componentes con hooks
- [x] Crear package.json para Next.js
- [x] Crear next.config.ts
- [x] Crear tsconfig.json para Next.js
- [x] Actualizar tailwind.config.ts
- [x] Crear postcss.config.mjs
- [x] Crear .env.local.example
- [x] Crear documentación de migración

### PASO 2: Estructura (Pendiente)
- [ ] Crear carpeta app/
- [ ] Crear layout.tsx raíz
- [ ] Crear providers.tsx (Query, Toast, Tooltip)
- [ ] Mover index.css → app/globals.css
- [ ] Crear estructura de carpetas para rutas
- [ ] Mover assets a public/

### PASO 3: Migración de Páginas (Pendiente)
- [ ] Migrar Index → app/page.tsx
- [ ] Migrar Catalogo → app/catalogo/page.tsx
- [ ] Migrar Producto → app/producto/[slug]/page.tsx
- [ ] Migrar Obras → app/obras/page.tsx
- [ ] Migrar ObraDetalle → app/obras/[slug]/page.tsx
- [ ] Migrar NotFound → app/not-found.tsx
- [ ] Agregar "use client" donde corresponda
- [ ] Agregar metadata a cada página

### PASO 4: Actualizar Rutas (Pendiente)
- [ ] Reemplazar react-router Link por next/link
- [ ] Actualizar useParams de React Router
- [ ] Actualizar useSearchParams de React Router
- [ ] Actualizar useNavigate por useRouter
- [ ] Eliminar BrowserRouter, Routes, Route

### PASO 5: Testing (Pendiente)
- [ ] Probar página principal
- [ ] Probar catálogo y filtros
- [ ] Probar detalle de productos
- [ ] Probar listado de obras
- [ ] Probar detalle de obras
- [ ] Probar 404
- [ ] Verificar mapas (Leaflet)
- [ ] Verificar formularios
- [ ] Verificar navegación
- [ ] Verificar responsive
- [ ] Probar build de producción
- [ ] Verificar SEO y metadata

---

## 📚 RECURSOS

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

---

**Análisis completado el:** 10 de febrero de 2026  
**Próximo paso:** PASO 2 - Reestructuración de carpetas
