'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Importar MapSection dinámicamente sin SSR (Leaflet requiere window)
const MapSectionDynamic = dynamic(() => import('@/components/MapSection').then(mod => ({ default: mod.MapSection })), {
  ssr: false,
  loading: () => (
    <div className="py-24 bg-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Cargando mapa...</p>
      </div>
    </div>
  ),
});

export default function MapWrapper() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Solo renderizar después del montaje inicial
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return (
      <div className="py-24 bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return <MapSectionDynamic />;
}
