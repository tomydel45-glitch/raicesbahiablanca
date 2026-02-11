import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section id="contacto" className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Construí con materiales de{' '}
            <span className="text-primary">calidad</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Contactanos hoy y recibí asesoramiento personalizado para tu proyecto de construcción.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="default">
              Contactanos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="hero">
              Solicitar presupuesto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
