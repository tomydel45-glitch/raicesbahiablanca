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
      </div>
    </section>
  );
}
