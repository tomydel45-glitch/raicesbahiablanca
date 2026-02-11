'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const sucursales = [
  {
    nombre: 'Bahía Blanca',
    direccion: 'Sucursal Bahía Blanca',
    lat: -38.7196,
    lng: -62.2724,
    mapsLink: 'https://maps.app.goo.gl/efjFjDz7dkFVN4Wt9',
  },
  {
    nombre: 'Viedma',
    direccion: 'Sucursal Viedma',
    lat: -40.8135,
    lng: -62.9967,
    mapsLink: 'https://maps.app.goo.gl/DAjsCM5dEsuQrT7X6',
  },
  {
    nombre: 'Las Grutas',
    direccion: 'Sucursal Las Grutas',
    lat: -40.8097,
    lng: -65.0833,
    mapsLink: 'https://maps.app.goo.gl/Rh2ydLvtYnDZ6G6m6',
  },
];

export function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Inicializar mapa con Leaflet directamente
    const map = L.map(mapContainerRef.current, {
      center: [-39.8, -63.5],
      zoom: 7,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    sucursales.forEach((s) => {
      L.marker([s.lat, s.lng])
        .addTo(map)
        .bindPopup(`<strong>${s.nombre}</strong><br/>${s.direccion}<br/><a href="${s.mapsLink}" target="_blank" rel="noopener noreferrer" style="color:#0ea5e9;text-decoration:underline;">Ver en Google Maps</a>`);
    });

    mapInstanceRef.current = map;

    // Cleanup: destruir mapa al desmontar
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-16 bg-muted">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Nuestras <span className="text-primary">Sucursales</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encontranos en Bahía Blanca, Viedma y Las Grutas
          </p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border border-border h-[450px]">
          <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
    </section>
  );
}
