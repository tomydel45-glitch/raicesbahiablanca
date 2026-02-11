import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';

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

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo-raices.png" alt="Raíces" className="h-12 w-auto brightness-0 invert" />
              <span className="font-bold text-xl">Raíces Bahía Blanca</span>
            </Link>
            <p className="text-white/60">
              Soluciones integrales en sistemas de construcción en seco desde 1994.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/raices.bahia.blanca"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/raices.construccion?igsh=cnZtaGhuamV5enY3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/message/6GDRS3G3GC4RF1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-lg mb-6">Productos</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/60">
                  Bahía Blanca, Buenos Aires, Argentina
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-white/60">Sucursales / WhatsApp</span>
                </div>
                <div className="flex flex-col ml-8 mt-1 space-y-1">
                  <a
                    href="https://wa.me/message/6GDRS3G3GC4RF1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors"
                  >
                    Bahía Blanca (WhatsApp)
                  </a>
                  <a
                    href="https://wa.me/message/DU24YL5VYK57E1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors"
                  >
                    Viedma (WhatsApp)
                  </a>
                  <a
                    href="https://wa.me/542920366569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors"
                  >
                    Las Grutas (WhatsApp)
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@raicesbahiablanca.com.ar"
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  info@raicesbahiablanca.com.ar
                </a>
              </li>
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
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-primary transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
