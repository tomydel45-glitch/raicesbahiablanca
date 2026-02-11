# Raíces Bahía Blanca

**Distribuidores Oficiales de Sistemas de Construcción en Seco**

Sitio web corporativo construido con Next.js 15 App Router, React 18, TypeScript y Tailwind CSS.

## 🚀 Tecnologías

- **Framework**: Next.js 15.1.6 (App Router)
- **UI**: React 18.3.1 + TypeScript 5.8.3
- **Estilos**: Tailwind CSS 3.4.17 + shadcn/ui
- **Componentes UI**: Radix UI (Accordion, Dialog, Carousel, etc.)
- **State Management**: TanStack Query 5.83.0
- **Formularios**: React Hook Form + Zod
- **Mapas**: Leaflet + React Leaflet
- **Iconos**: Lucide React

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd raicesbahiablanca-main

# Instalar dependencias
npm install

# Copiar variables de entorno (si existen)
cp .env.local.example .env.local

# Mover assets de src/assets/ a public/ (si aún no se hizo)
# En PowerShell:
Move-Item -Path src/assets/* -Destination public/ -Force
```

## 🏃 Comandos de Desarrollo

```bash
# Desarrollo (modo watch con hot reload)
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
raicesbahiablanca-main/
├── app/                      # Next.js App Router
│   ├── globals.css          # Estilos globales + Tailwind
│   ├── layout.tsx           # Layout raíz con metadata
│   ├── page.tsx             # Página principal (/)
│   ├── not-found.tsx        # Página 404
│   ├── catalogo/            # Catálogo de productos
│   ├── producto/[slug]/     # Detalle de producto dinámico
│   └── obras/               # Obras realizadas
├── src/
│   ├── components/          # Componentes React
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navbar.tsx      # Navegación principal
│   │   ├── Footer.tsx      # Pie de página
│   │   └── ...             # Secciones del sitio
│   ├── data/               # JSON estáticos
│   │   ├── products.json   # Catálogo de productos
│   │   └── obras.json      # Portafolio de obras
│   ├── lib/                # Utilidades y helpers
│   └── hooks/              # Custom React hooks
├── public/                  # Assets estáticos
│   ├── brands/             # Logos de marcas
│   ├── categories/         # Imágenes de categorías
│   ├── clients/            # Logos de clientes
│   ├── products/           # Imágenes de productos
│   └── *.jpg, *.png        # Imágenes generales
├── next.config.ts          # Configuración Next.js
├── tailwind.config.ts      # Configuración Tailwind
└── tsconfig.json           # Configuración TypeScript
```

## 🎨 Características

- ✅ **Next.js 15 App Router** con Server/Client Components
- ✅ **SEO optimizado** con metadata exports
- ✅ **Imágenes optimizadas** con next/image
- ✅ **Responsive design** mobile-first
- ✅ **Sistema de diseño** personalizado (cyan/celeste palette)
- ✅ **Catálogo de productos** con filtros, búsqueda y paginación
- ✅ **Mapas interactivos** con Leaflet (3 sucursales)
- ✅ **Formularios de contacto** con validación
- ✅ **Carruseles automáticos** de marcas y clientes
- ✅ **Portafolio de obras** con detalles dinámicos

## 🌐 Páginas

- `/` - Home con secciones: Hero, Productos, Nosotros, Servicios, Marcas, Clientes, Mapa, Contacto
- `/catalogo` - Catálogo completo con filtros por categoría, subcategoría, marca y búsqueda
- `/producto/[slug]` - Detalle de producto individual con galería
- `/obras` - Listado de obras realizadas
- `/obras/[slug]` - Detalle de obra con imágenes

## 🔧 Configuración

### Variables de Entorno (opcional)

Crear `.env.local` con:

```env
# Cloudinary (si se usa para imágenes optimizadas)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Actualización de Assets

Si los assets aún están en `src/assets/`, moverlos a `public/`:

```powershell
# PowerShell
Move-Item -Path src/assets/brands -Destination public/ -Force
Move-Item -Path src/assets/categories -Destination public/ -Force
Move-Item -Path src/assets/clients -Destination public/ -Force
Move-Item -Path src/assets/products -Destination public/ -Force
Move-Item -Path src/assets/*.jpg -Destination public/ -Force
Move-Item -Path src/assets/*.png -Destination public/ -Force
```

## 📝 Notas de Migración

Este proyecto fue migrado de **Vite + React Router** a **Next.js 15 App Router**:

- ✅ Todos los componentes actualizados a Next.js navigation
- ✅ Server Components por defecto, Client Components donde se necesita
- ✅ Imágenes críticas convertidas a `next/image`
- ✅ Routing dinámico con App Router
- ✅ Metadata SEO en cada página

Para más detalles, consultar los archivos de documentación:
- `MIGRATION_GUIDE.md`
- `ANALYSIS.md`
- `COMPONENTS_MAP.md`

## 🚀 Deploy

```bash
# Build de producción
npm run build

# Probar build localmente
npm start
```

Deploy recomendado: **Vercel** (optimizado para Next.js)

---

**Raíces Bahía Blanca** - Tecnología en Construcción desde 1994

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
