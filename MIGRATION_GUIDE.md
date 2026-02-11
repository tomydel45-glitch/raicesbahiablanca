# Migración a Next.js 15 - Guía de Pasos

## PASO 1: Análisis y Setup ✅ COMPLETADO

### Archivos Creados:
- ✅ `package.json.next` - Nuevo package.json con Next.js 15
- ✅ `tsconfig.json.next` - TSConfig actualizado para Next.js
- ✅ `next.config.ts` - Configuración de Next.js
- ✅ `tailwind.config.ts` - Actualizado con paths de Next.js
- ✅ `postcss.config.mjs` - Config de PostCSS para Next.js
- ✅ `.env.local.example` - Template de variables de entorno

### Resumen del Análisis:

#### Páginas Identificadas:
1. `/` → `app/page.tsx` (Index - página principal)
2. `/catalogo` → `app/catalogo/page.tsx` (Catálogo con filtros)
3. `/producto/:slug` → `app/producto/[slug]/page.tsx` (Detalle de producto)
4. `/obras` → `app/obras/page.tsx` (Listado de obras)
5. `/obras/:slug` → `app/obras/[slug]/page.tsx` (Detalle de obra)
6. `*` → `app/not-found.tsx` (404)

#### Componentes que Necesitan "use client":
- Navbar.tsx (scroll state, mobile menu)
- ContactSection.tsx (formulario)
- MapSection.tsx (Leaflet - solo cliente)
- Catalogo.tsx (filtros, búsqueda, paginación)
- Producto.tsx (imagen seleccionada, acordeones)
- NotFound.tsx (useEffect, useLocation)
- Componentes UI de shadcn/ui con interactividad

#### Cambios Principales:
- ❌ Eliminar: React Router DOM, Vite, plugins de Vite
- ✅ Agregar: Next.js 15, eslint-config-next
- ✅ Mantener: Todas las dependencias de Radix UI, TanStack Query, Tailwind
- ✅ Configurar: Transpilación de paquetes Radix UI en next.config.ts
- ✅ Optimizar: Imágenes de Cloudinary con next/image

---

## PRÓXIMOS PASOS:

### PASO 2: Reestructurar Carpetas
- Crear estructura `app/` con App Router
- Mover componentes a sus ubicaciones correctas
- Crear layouts raíz y específicos

### PASO 3: Migrar Páginas y Componentes
- Convertir páginas a componentes de servidor/cliente
- Adaptar rutas dinámicas con [slug]
- Agregar "use client" donde sea necesario

### PASO 4: Actualizar Rutas y Links
- Reemplazar React Router con next/link y next/navigation
- Actualizar useNavigate, useParams, useSearchParams

### PASO 5: Testing y Optimización
- Probar todas las rutas
- Optimizar imágenes
- Verificar SEO y metadatos

---

## INSTRUCCIONES PARA CONTINUAR:

Una vez listo para proceder:

1. **Renombrar archivos de configuración:**
   ```bash
   mv package.json package.json.vite
   mv package.json.next package.json
   mv tsconfig.json tsconfig.json.vite
   mv tsconfig.json.next tsconfig.json
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   # o
   pnpm install
   # o
   yarn install
   ```

3. **Continuar con PASO 2** (creación de estructura app/)
