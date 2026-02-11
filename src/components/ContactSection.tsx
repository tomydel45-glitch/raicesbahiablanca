'use client';

import { MapPin, Phone, Mail, Send, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const locations = [
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

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = '5492914637191';
    const nombreCompleto = formData.apellido 
      ? `${formData.nombre} ${formData.apellido}` 
      : formData.nombre;
    
    const mensaje = `Hola, soy ${nombreCompleto}.
Email: ${formData.email}

${formData.mensaje}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirigiendo a WhatsApp",
      description: "Se abrirá WhatsApp con tu mensaje.",
    });
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-to-br from-secondary via-secondary to-primary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-section text-secondary-foreground">
            ¿Tenés un <span className="text-primary">proyecto</span>?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Estamos listos para asesorarte. Contactanos por cualquiera de nuestras sucursales.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Locations Cards */}
          <div className="lg:col-span-2 space-y-4">
            {locations.map((location, index) => (
              <div
                key={location.city}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-secondary-foreground">{location.city}</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <a
                      href={location.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {location.address}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a
                      href={location.waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <a href={`mailto:${location.email}`} className="hover:text-primary transition-colors truncate">
                      {location.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-xl border border-white/50 animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              <h3 className="text-xl font-bold text-secondary-foreground mb-6">
                Envianos un mensaje
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-foreground">Nombre *</label>
                  <Input
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    className="bg-muted/50 border-muted-foreground/20 focus:border-primary h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-foreground">Apellido</label>
                  <Input
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    placeholder="Tu apellido"
                    className="bg-muted/50 border-muted-foreground/20 focus:border-primary h-12"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-secondary-foreground">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  className="bg-muted/50 border-muted-foreground/20 focus:border-primary h-12"
                  required
                />
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-secondary-foreground">Mensaje *</label>
                <Textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="Hola, quería hacer una consulta sobre..."
                  className="bg-muted/50 border-muted-foreground/20 focus:border-primary min-h-[140px] resize-none"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full group">
                Enviar mensaje
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
