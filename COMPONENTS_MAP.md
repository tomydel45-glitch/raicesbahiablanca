# Mapa de Componentes - Cliente vs Servidor

## 🎯 LEYENDA
- 🔴 = Requiere "use client" (hooks, estado, eventos)
- 🟡 = Puede ser Server Component con partes cliente
- 🟢 = Server Component puro (sin interactividad)

---

## 📄 PÁGINAS

### 🔴 app/page.tsx (Index)
**Tipo:** Puede ser Server Component  
**Componentes hijos:**
- 🟢 HeroSection
- 🟢 BrandsSection
- 🔴 ProductsSection (si usa carousel)
- 🟢 ServicesSection
- 🟢 AboutSection
- 🔴 ClientsSection (si usa carousel)
- 🔴 ContactSection (formulario)
- 🔴 MapSection (Leaflet)

**Decisión:** Mantener como Server Component, solo los hijos interactivos usan "use client"

---

### 🔴 app/catalogo/page.tsx
**Tipo:** Client Component  
**Razón:** 
- useState: filtros, búsqueda, paginación
- useSearchParams
- useMemo
- onClick handlers

**Código:**
```typescript
"use client";

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
// ...resto del código
```

---

### 🟡 app/producto/[slug]/page.tsx
**Tipo:** Server Component con Client Components anidados  
**Estrategia:**
```typescript
// page.tsx - Server Component (obtiene datos)
export default async function ProductoPage({ params }) {
  const product = await getProduct(params.slug);
  
  return (
    <>
      <Navbar />
      <ProductoClient product={product} /> {/* Client Component */}
      <Footer />
    </>
  );
}

// ProductoClient.tsx - Client Component
"use client";
export function ProductoClient({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  // ... lógica interactiva
}
```

**Beneficios:** SEO, SSG con generateStaticParams

---

### 🟢 app/obras/page.tsx
**Tipo:** Server Component  
**Razón:** Solo renderiza lista estática de obras  
**Sin hooks ni estado**

---

### 🟡 app/obras/[slug]/page.tsx
**Tipo:** Server Component con Carousel cliente  
**Estrategia:**
```typescript
// page.tsx - Server Component
export default async function ObraDetallePage({ params }) {
  const obra = await getObra(params.slug);
  
  return (
    <>
      <Navbar />
      {/* Contenido estático */}
      <ObraCarousel images={obra.cloudinary_url} /> {/* Client */}
      <Footer />
    </>
  );
}
```

---

### 🔴 app/not-found.tsx
**Tipo:** Client Component (opcional)  
**Razón:** Puede usar useEffect para logging  
**Alternativa:** Eliminar useEffect y hacerlo Server Component

---

## 🧩 COMPONENTES

### LAYOUT Y NAVEGACIÓN

#### 🔴 Navbar.tsx
```typescript
"use client";

import { useState, useEffect } from 'react';
// Scroll state, mobile menu
```

#### 🟢 Footer.tsx
```typescript
// No necesita "use client"
// Solo links y contenido estático
```

---

### SECCIONES DE CONTENIDO

#### 🟢 HeroSection.tsx
```typescript
// Server Component
// Solo presentación
```

#### 🟢 BrandsSection.tsx
```typescript
// Server Component
// Solo imágenes de marcas
```

#### 🟡 ProductsSection.tsx
```typescript
// Verificar si usa carousel
// Si usa carousel → "use client"
// Si no → Server Component
```

#### 🟢 ServicesSection.tsx
```typescript
// Server Component
// Solo presentación
```

#### 🟢 AboutSection.tsx
```typescript
// Server Component
// Solo presentación
```

#### 🟡 ClientsSection.tsx
```typescript
// Si usa carousel → "use client"
// Revisar implementación actual
```

#### 🔴 ContactSection.tsx
```typescript
"use client";

import { useState } from 'react';
// Formulario con estado
```

#### 🔴 MapSection.tsx
```typescript
"use client";

import dynamic from 'next/dynamic';

// Leaflet requiere window
// Usar dynamic import
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false
});
```

---

### UTILIDADES

#### 🔴 WhatsAppButton.tsx
```typescript
// Verificar si usa onClick
// Probablemente necesita "use client"
```

#### 🟢 CTASection.tsx
```typescript
// Server Component (si existe)
// Solo presentación
```

---

## 🎨 COMPONENTES UI (shadcn/ui)

### Componentes que YA tienen "use client"
- ✅ accordion.tsx
- ✅ alert-dialog.tsx
- ✅ button.tsx
- ✅ calendar.tsx
- ✅ carousel.tsx
- ✅ checkbox.tsx
- ✅ dialog.tsx
- ✅ dropdown-menu.tsx
- ✅ input.tsx
- ✅ select.tsx
- ✅ sheet.tsx
- ✅ toast.tsx
- ✅ Y otros componentes interactivos

### Componentes que pueden ser Server
- ✅ badge.tsx
- ✅ card.tsx
- ✅ separator.tsx
- ✅ avatar.tsx (sin interactividad)

---

## 🗂️ DECISIONES DE ARQUITECTURA

### Estrategia General
1. **Server Component por defecto** para todo
2. **"use client" solo cuando sea necesario:**
   - Hooks (useState, useEffect, etc.)
   - Event handlers (onClick, onChange, etc.)
   - Browser APIs (window, document, localStorage)
   - Librerías que requieren cliente (Leaflet)

### Patrones de Composición

#### Patrón 1: Server Component con Client hijo
```typescript
// app/page.tsx - Server
export default function Page() {
  return (
    <>
      <StaticContent />      {/* Server */}
      <InteractiveForm />    {/* "use client" */}
    </>
  );
}
```

#### Patrón 2: Server Component que obtiene datos
```typescript
// app/producto/[slug]/page.tsx
export default async function ProductPage({ params }) {
  const product = await fetchProduct(params.slug);
  
  return <ProductClient product={product} />;
}
```

#### Patrón 3: Dynamic import para cliente
```typescript
// app/page.tsx
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/MapSection'), {
  ssr: false,
  loading: () => <Skeleton />
});

export default function Page() {
  return (
    <>
      <Content />
      <Map />
    </>
  );
}
```

---

## 🔄 PROVIDERS

### app/providers.tsx
```typescript
"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
```

### app/layout.tsx
```typescript
// Server Component
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## 📊 RESUMEN

| Tipo | Cantidad | Ejemplos |
|------|----------|----------|
| 🔴 Client Components | ~8 | Navbar, Catalogo, ContactSection, MapSection |
| 🟡 Híbridos | ~3 | Producto, ObraDetalle, ProductsSection |
| 🟢 Server Components | ~8 | Hero, About, Services, Footer, Obras |

**Ratio Server:Client = ~50:50**

Esto es muy bueno para performance y SEO, maximizando Server Components mientras mantenemos la interactividad necesaria.

---

## ✅ PRÓXIMOS PASOS

1. Crear estructura app/
2. Implementar layout.tsx y providers
3. Migrar componentes siguiendo estos patrones
4. Agregar "use client" selectivamente
5. Probar funcionalidad

**Objetivo:** Mantener máximo 30-40% de componentes como Client Components
