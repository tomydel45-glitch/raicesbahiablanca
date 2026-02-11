import { Users, Award, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Equipo Profesional',
    description: 'Contamos con especialistas en construcción en seco que combinan experiencia, compromiso e innovación. Estamos capacitados para brindarte soluciones precisas y acompañarte en cada paso de tu proyecto.',
  },
  {
    icon: Award,
    title: 'Materiales de Calidad',
    description: 'Trabajamos con materiales de primeras marcas, seleccionados para garantizar durabilidad, eficiencia y excelentes resultados. Cada producto cumple con los más altos estándares.',
  },
  {
    icon: Sparkles,
    title: 'Expertos en la Materia',
    description: 'Con amplia experiencia en construcción en seco, nos hemos especializado en ofrecer soluciones innovadoras y de alta calidad, adaptando nuestras propuestas a cada proyecto.',
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Por qué{' '}
            <span className="text-primary">escogernos</span>?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Somos tu aliado en construcción en seco, combinando materiales de calidad, asesoramiento personalizado y soluciones eficientes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/60">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
