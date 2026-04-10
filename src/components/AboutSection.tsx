import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-muted">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-up">
            <span className="text-subtitle">SOBRE NOSOTROS</span>
            <h2 className="heading-section">
              La <span className="text-primary">empresa</span>
            </h2>
            <div className="w-20 h-1 bg-primary" />
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                <strong className="text-foreground">Raíces Bahía Blanca</strong> nace con el objetivo de brindar
                soluciones integrales en sistemas de construcción en seco, trabajando
                con marcas líderes y un equipo técnico especializado.
              </p>
              <p>
                Desde 1994, realizamos obras civiles, metalúrgicas y de mantenimiento
                en grandes empresas. En 1999, comenzamos la comercialización de
                productos Knauf GMBH, generando un nuevo mercado en el ámbito privado.
              </p>
              <p>
                Hoy, disponemos de una amplia gama de productos para construcción
                en seco que nos permiten atender áreas como cielorrasos,
                revestimientos, tabiques, steel frame, aislantes termo acústicos
                y aberturas.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-6">
              <div>
                <div className="text-4xl font-bold text-primary">30+</div>
                <div className="text-muted-foreground">Años de experiencia</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Proyectos completados</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">15+</div>
                <div className="text-muted-foreground">Marcas asociadas</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover aspect-[4/3] md:aspect-auto md:h-[500px]">
              <Image
                src="/about-local.jpg"
                alt="Raíces Bahía Blanca"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 left-2 md:-bottom-6 md:-left-6 bg-primary text-white p-4 md:p-6 rounded-xl shadow-lg">
              <div className="text-2xl md:text-3xl font-bold">RAÍCES</div>
              <div className="text-xs md:text-sm opacity-80">Tecnología en Construcción</div>
            </div>
          </div>
        </div>

        {/* Equipo */}
        <div className="mt-24 animate-fade-up">
          <div className="text-center mb-12">
            <h3 className="heading-section">
              Nuestro <span className="text-primary">equipo</span>
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Fernanda', role: 'Dirección Administrativa', description: 'Gestiona la administración general de la empresa, la relación con proveedores y el área contable.' },
              { name: 'Sergio', role: 'Director de Obras', description: 'Encargado de la planificación y ejecución de cada proyecto' },
              { name: 'Pamela', role: 'Administradora de Operaciones', description: 'Supervisa la atención al cliente y coordina la gestión entre clientes, proveedores y el equipo de trabajo.' },
              { name: 'Lucia', role: 'Administración y Desarrollo de Proyectos' },
              { name: 'Pilar', role: 'Comunicación y Marketing' },
              { name: 'Romina', role: 'Atención al cliente.' },
              { name: 'Carolina', role: 'Atención al cliente y Administración de Obras.' },
              { name: 'Ismael', role: 'Depósito y repartos', description: 'Recepción de mercadería, organización del depósito y entrega de materiales a clientes.' },
              { name: 'Joaquin', role: 'Depósito y repartos', description: 'Recepción de mercadería, organización del depósito y entrega de materiales a clientes.' },
              { name: 'Diego', role: 'Depósito', description: 'Recepción de mercadería, organización del depósito.' },
            ].map((member) => (
              <div
                key={member.name}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card-hover group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                tabIndex={0}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://res.cloudinary.com/depi6dfdz/image/upload/w_400,h_530,c_fill,g_face,q_auto,f_auto/v1772229943/${member.name}.png`}
                  alt={`Foto de ${member.name}, ${member.role} en Raíces Bahía Blanca`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-10">
                  <p className="text-white font-bold text-sm leading-tight">{member.name}</p>
                  <p className="text-primary text-xs font-medium leading-tight">{member.role}</p>
                  {member.description && (
                    <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
                      <p className="text-white/80 text-xs mt-1 leading-snug">{member.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
