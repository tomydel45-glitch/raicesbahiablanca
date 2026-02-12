'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Obras', href: '/obras' },
  { name: 'Contacto', href: '/#contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on a page other than home
  const isNotHome = pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Use dark text on non-home pages or when scrolled
  const useDarkText = isScrolled || isNotHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useDarkText
            ? 'bg-background/95 backdrop-blur-md shadow-card'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="z-50">
              <Image src="/logo-raices.png" alt="Raíces Bahía Blanca" width={112} height={112} className="h-28 w-auto" priority />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors duration-300 hover:text-primary ${
                    useDarkText ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant={useDarkText ? 'default' : 'hero'} size="default" asChild>
                <Link href="/catalogo">Catálogo</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className={`h-6 w-6 ${useDarkText ? 'text-foreground' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-0 top-0 z-40 md:hidden transition-[height,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
          isMobileMenuOpen 
            ? 'h-[50vh] opacity-100 pointer-events-auto' 
            : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div 
          className={`absolute inset-0 bg-white shadow-lg rounded-b-3xl transition-[border-radius] duration-500 ${
            isMobileMenuOpen ? 'rounded-b-3xl' : 'rounded-b-none'
          }`}
        />
        
        {/* Backdrop to close menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 -z-10 bg-black/10 animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Menu Content */}
        <div className={`relative h-full flex flex-col justify-center items-center pt-16 pb-6 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
        }`}>
          {/* Navigation Links */}
          <nav className="flex flex-col items-center gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xl font-semibold text-foreground hover:text-primary transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
                  isMobileMenuOpen 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-6 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${150 + index * 75}ms` : '0ms' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className={`mt-6 transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-90'
          }`} style={{ transitionDelay: isMobileMenuOpen ? '500ms' : '0ms' }}>
            <Button 
              variant="default" 
              size="default" 
              className="px-8 py-5 text-base rounded-full shadow-lg"
              asChild
            >
              <Link href="/catalogo" onClick={() => setIsMobileMenuOpen(false)}>
                Catálogo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
