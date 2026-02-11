import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Building2 } from 'lucide-react';

const quickLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Obras', href: '/obras' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Contacto', href: '#contacto' },
];

const productLinks = [
  { name: 'Placas', href: '/catalogo?categoria=PLACAS' },
  { name: 'Perfiles', href: '/catalogo?categoria=PERFILES' },
  { name: 'Aislaciones', href: '/catalogo?categoria=AISLACIONES' },
  { name: 'Masillas y Revoques', href: '/catalogo?categoria=MASILLAS Y REVOQUES' },
  { name: 'Herramientas', href: '/catalogo?categoria=HERRAMIENTAS' },
  { name: 'Adhesivos y Selladores', href: '/catalogo?categoria=ADHESIVOS Y SELLADORES' },
  { name: 'Accesorios', href: '/catalogo?categoria=ACCESORIOS' },
  { name: 'Terminaciones', href: '/catalogo?categoria=TERMINACIONES' },
];

const sucursales = [
  {
    city: 'Bahía Blanca',
    address: 'Luiggi 1263',
    phone: '+54 9 2914 63-7191',
    email: 'administracion@raicesbahiablanca.com.ar',
    waLink: 'https://wa.me/message/6GDRS3G3GC4RF1',
    mapsLink: 'https://maps.app.goo.gl/efjFjDz7dkFVN4Wt9',
  },
  {
    city: 'Viedma',
    address: 'Parque Industrial 206 y 207',
    phone: '+54 9 2920 44-6163',
    email: 'viedma@raicesbahiablanca.com.ar',
    waLink: 'https://wa.me/message/DU24YL5VYK57E1',
    mapsLink: 'https://maps.app.goo.gl/DAjsCM5dEsuQrT7X6',
  },
  {
    city: 'Las Grutas',
    address: 'Colectora 995',
    phone: '+54 9 2920 36-6569',
    email: 'lasgrutas@raicesbahiablanca.com.ar',
    waLink: 'https://wa.me/542920366569',
    mapsLink: 'https://maps.app.goo.gl/Rh2ydLvtYnDZ6G6m6',
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container-wide py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo-raices.png" alt="Raíces" width={56} height={56} className="h-14 w-auto brightness-0 invert" />
              <div>
                <span className="font-bold text-lg block leading-tight">Raíces</span>
                <span className="text-white/50 text-xs">Tecnología en Construcción</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Soluciones integrales en sistemas de construcción en seco desde 1994.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/raices.bahia.blanca"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/raices.construccion?igsh=cnZtaGhuamV5enY3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/message/6GDRS3G3GC4RF1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-base mb-4 text-white">Productos</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base mb-4 text-white">Contacto</h4>
            <ul className="space-y-2">
              {sucursales.map((suc) => (
                <li key={suc.city}>
                  <a
                    href={suc.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <span>{suc.city} (WhatsApp)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Raíces Bahía Blanca. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
