/**
 * Configuración SEO por categoría de catálogo.
 * Las claves son los slugs usados en el URL param `?categoria=`.
 * Cada entrada contiene metadata, H1 y texto introductorio visible para SEO.
 * 
 * ACTUALIZADO: Basado en análisis de inventario real (4773 productos)
 * Marcas principales: Knauf, Barbieri, Fischer, Eternit, Weber, DeWalt, Stanley, Perfiles Revestidos
 */
export interface CategorySEO {
  title: string;
  description: string;
  h1: string;
  intro: string;
  canonical: string;
  keywords: string[];
}

export const seoCategorias: Record<string, CategorySEO> = {
  accesorios: {
    title: 'Accesorios para Construcción en Seco - Tornillos, Anclajes y Fijaciones | Raíces Bahía Blanca',
    description:
      'Amplio stock de accesorios para steel frame y durlock: tornillos autoperforantes, anclajes Fischer, grampas, cinta papel Knauf, esquineros y alambres galvanizados. Envíos a Bahía Blanca, Viedma y Las Grutas.',
    h1: 'Accesorios para Construcción en Seco',
    intro:
      'Completá tu proyecto con accesorios profesionales de primera calidad: tornillos autoperforantes, anclajes químicos Fischer, cinta papel para juntas Knauf, esquineros metálicos, grampas, alambres galvanizados y elementos de fijación especializados. Stock permanente de marcas líderes como Fischer, Knauf, Barbieri y RC para garantizar la máxima durabilidad en tus instalaciones.',
    canonical: '/catalogo?categoria=accesorios',
    keywords: [
      'tornillos autoperforantes steel frame',
      'anclajes Fischer',
      'cinta papel juntas Knauf',
      'esquineros metálicos',
      'grampas cielorraso',
      'anclajes químicos',
      'alambre galvanizado',
      'tarugos Fischer',
      'ampollas vinilester',
      'fijaciones durlock Bahía Blanca',
      'accesorios construcción en seco Viedma'
    ],
  },
  'adhesivos-y-selladores': {
    title: 'Adhesivos y Selladores Profesionales - Weber, Eternit, Fischer | Raíces Bahía Blanca',
    description:
      'Adhesivos y selladores de alta performance: adhesivo cementicio Eternit Simplísima, ampollas químicas Fischer, Sikaflex, pegamentos multiuso ATZ-280. Stock permanente de marcas Weber, Eternit y Fischer en Bahía Blanca.',
    h1: 'Adhesivos y Selladores',
    intro:
      'Adhesivos y selladores profesionales para cada aplicación: adhesivo cementicio Eternit Simplísima 25kg para placas cementicias, ampollas químicas Fischer RM 12/16 para anclajes estructurales, selladores Sikaflex para juntas elásticas, adhesivos multiuso ATZ-280 para molduras y zócalos. Soluciones de pegado y sellado de alta resistencia para interior y exterior, avaladas por marcas reconocidas como Weber, Eternit, Fischer y Perfiles Revestidos.',
    canonical: '/catalogo?categoria=adhesivos-y-selladores',
    keywords: [
      'adhesivo cementicio Eternit Simplísima',
      'ampollas químicas Fischer',
      'sellador Sikaflex',
      'adhesivo ATZ-280 molduras',
      'ampollas vinilester RC',
      'pegamento placas cementicias',
      'sellador juntas Weber',
      'adhesivo multiuso construcción',
      'anclaje químico RM Fischer',
      'adhesivos Bahía Blanca',
      'selladores profesionales Viedma'
    ],
  },
  aislaciones: {
    title: 'Aislaciones Térmicas y Acústicas - Lana de Vidrio Isover, EPS, Wichi Roofing | Raíces',
    description:
      'Materiales de aislación térmica y acústica: lana de vidrio Isover, poliestireno expandido EPS densidades 10-20-30kg, membrana Wichi Roofing, barreras de vapor. Stock permanente para steel frame y durlock en Bahía Blanca.',
    h1: 'Aislaciones Térmicas y Acústicas',
    intro:
      'Mejorá el confort térmico y acústico de tu obra con aislaciones de primera línea: lana de vidrio Isover en rollos y paneles (espesores 50-70-100mm), poliestireno expandido EPS en densidades 10, 20 y 30 kg/m³, membrana Wichi Roofing hidrófuga para techos (1.16m x 13/26m), barreras de vapor y soluciones específicas para steel frame y construcción en seco. Productos certificados que cumplen normativas de eficiencia energética para viviendas, comercios e industrias en Bahía Blanca y zona.',
    canonical: '/catalogo?categoria=aislaciones',
    keywords: [
      'lana de vidrio Isover',
      'poliestireno expandido EPS',
      'membrana Wichi Roofing',
      'aislación térmica steel frame',
      'barrera de vapor',
      'EPS densidad 20kg',
      'lana de vidrio 100mm',
      'aislante acústico',
      'membrana hidrófuga techo',
      'aislación Bahía Blanca',
      'Isover Viedma',
      'telgopor construcción'
    ],
  },
  herramientas: {
    title: 'Herramientas Profesionales - DeWalt, Stanley, Skil, Fischer | Raíces Bahía Blanca',
    description:
      'Herramientas profesionales para construcción en seco: amoladoras DeWalt DWE4010, atornilladores Skil, cortadoras de placas, espátulas Stanley, niveles, llanas. Equipamiento completo para instaladores en Bahía Blanca.',
    h1: 'Herramientas Profesionales',
    intro:
      'Equipate con herramientas profesionales de marcas líderes: amoladoras DeWalt 115mm 700W DWE4010 y Skil 4½", atornilladores para drywall, cortadoras de placas de yeso, espátulas y llanas Stanley, niveles láser, tijeras para corte de perfiles, brocas y mechas especializadas Fischer. Todo el equipamiento necesario para instalación, corte, atornillado y terminación en construcción en seco, respaldado por garantía de fábrica y servicio técnico autorizado.',
    canonical: '/catalogo?categoria=herramientas',
    keywords: [
      'amoladora DeWalt DWE4010',
      'atornillador drywall Skil',
      'cortadora placas yeso',
      'espátulas Stanley',
      'llanas construcción en seco',
      'tijera corte perfiles',
      'nivel láser',
      'herramientas Fischer',
      'brocas durlock',
      'mechas DeWalt',
      'herramientas Bahía Blanca',
      'equipamiento construcción Viedma'
    ],
  },
  'masillas-y-revoques': {
    title: 'Masillas y Revoques - Knauf, Weber, Tomecol | Raíces Bahía Blanca',
    description:
      'Masillas para juntas y revoques de primera calidad: Knauf Uniflott, Tomecol Weber, Goldband, yeso proyectable MP75/MP40, enduidos, bases y acabados. Soluciones profesionales para terminaciones perfectas en Bahía Blanca.',
    h1: 'Masillas y Revoques',
    intro:
      'Terminaciones perfectas con masillas y revoques profesionales: masilla Knauf Uniflott para juntas (secado rápido), Tomecol Weber para tomado de juntas, yeso proyectable Knauf MP75 y MP40 (25-30kg), yeso tradicional Goldband, Rotband revoque controlado, yeso Baugips para revoques manuales, enduidos plásticos, bases niveladoras y acabados finales. Productos de alta calidad para aplicación manual o proyectada, ideales para revestimientos interiores, nivelación de superficies y tomado de juntas en placas de yeso.',
    canonical: '/catalogo?categoria=masillas-y-revoques',
    keywords: [
      'masilla Knauf Uniflott',
      'Tomecol Weber',
      'yeso proyectable MP75 Knauf',
      'Goldband yeso',
      'Rotband revoque controlado',
      'yeso Baugips',
      'enduido plástico',
      'base niveladora',
      'masilla secado rápido',
      'tomado de juntas durlock',
      'yeso proyectable Bahía Blanca',
      'masilla profesional Viedma'
    ],
  },
  perfiles: {
    title: 'Perfiles Metálicos para Steel Frame - Barbieri, Knauf, Eternit | Raíces Bahía Blanca',
    description:
      'Perfiles galvanizados para steel frame y durlock: montantes 70-100-150mm Barbieri, soleras 35-70-100mm, omega, perfiles F47 Knauf, riel U Eternit, esquineros. Stock completo de estructuras metálicas en Bahía Blanca, Viedma y Las Grutas.',
    h1: 'Perfiles para Construcción en Seco',
    intro:
      'Estructurá tu proyecto con perfiles de acero galvanizado de primera calidad: montantes estructurales Barbieri en medidas 70, 100 y 150mm (espesores 0.48-0.90mm), soleras 35-70-100mm, perfiles omega para cielorrasos, sistema F47 Knauf para cielorrasos suspendidos, rieles U Eternit, esquineros PVC y metálicos, perfiles J, U, C, guardacantos y complementos para tabiquería, revestimientos y cielorrasos. Productos certificados bajo normas IRAM para estructuras de steel frame y sistemas de durlock.',
    canonical: '/catalogo?categoria=perfiles',
    keywords: [
      'montantes 70 Barbieri',
      'soleras galvanizadas 35-70-100mm',
      'perfil omega cielorraso',
      'perfil F47 Knauf',
      'riel U Eternit',
      'montante estructural 100mm',
      'perfiles steel frame',
      'esquinero PVC',
      'perfil J durlock',
      'guardacantos metálico',
      'perfiles galvanizados Bahía Blanca',
      'estructura steel frame Viedma',
      'montantes Las Grutas'
    ],
  },
  placas: {
    title: 'Placas de Yeso - Durlock Knauf, Superboard, Eternit | Raíces Bahía Blanca',
    description:
      'Placas para construcción en seco: Durlock Knauf estándar/verde/rosa (1.20x2.40-2.60-3.00m), placas cementicias Superboard 6-8-10mm, Eternit, placas ignífugas y antihumedad. Stock permanente en Bahía Blanca, envíos a Viedma y Las Grutas.',
    h1: 'Placas de Yeso y Cementicias',
    intro:
      'Encontrá la placa ideal para tu proyecto: placas de yeso Durlock Knauf en formato estándar (1.20 x 2.40-2.60-3.00m, espesor 9.5-12.5mm), placas verdes resistentes a la humedad para baños y cocinas, placas rosas ignífugas tipo F (resistencia al fuego), placas cementicias Superboard en 6, 8 y 10mm para exterior e interior húmedo, placas Eternit fibrocemento, placas ranuradas acústicas y de alta performance. Soluciones certificadas para tabiques, cielorrasos, revestimientos y aplicaciones que requieren resistencia especial al fuego, humedad o impacto.',
    canonical: '/catalogo?categoria=placas',
    keywords: [
      'Durlock Knauf estándar',
      'placa verde antihumedad',
      'placa rosa ignífuga tipo F',
      'Superboard 8mm cementicia',
      'placa Eternit fibrocemento',
      'placas de yeso 12.5mm',
      'placa drywall 2.40m',
      'cielorraso Knauf',
      'placa resistente fuego',
      'Superboard exterior',
      'Durlock Bahía Blanca',
      'placas cementicias Viedma',
      'Knauf Las Grutas'
    ],
  },
  terminaciones: {
    title: 'Terminaciones - Molduras, Zócalos, Cornisas Perfiles Revestidos | Raíces Bahía Blanca',
    description:
      'Terminaciones decorativas para construcción en seco: molduras, zócalos PZ-56L/78/87/103/126, cornisas, guardacantos, buñas, perfiles decorativos Perfiles Revestidos. Acabados perfectos para tu obra en Bahía Blanca.',
    h1: 'Terminaciones y Revestimientos',
    intro:
      'Dale el acabado perfecto a tu obra con terminaciones de alta calidad: molduras decorativas para techos y paredes, zócalos lisos y con diseño Perfiles Revestidos (PZ-56L, PZ-78, PZ-87, PZ-103, PZ-126 en espesores 2.60-2.75mm), cornisas para cielorrasos, guardacantos PVC y metálicos, buñas para juntas, esquineros de terminación, perfiles J y U decorativos, y revestimientos complementarios. Elementos esenciales para lograr terminaciones profesionales que realzan la estética de tabiques, cielorrasos y revestimientos en construcción en seco.',
    canonical: '/catalogo?categoria=terminaciones',
    keywords: [
      'molduras decorativas Perfiles Revestidos',
      'zócalos PZ-56L durlock',
      'cornisas cielorraso',
      'guardacantos PVC',
      'buñas juntas',
      'zócalo PZ-78 alto',
      'zócalo PZ-103 terminación',
      'esquinero terminación',
      'molduras techo',
      'perfiles decorativos',
      'zócalos Bahía Blanca',
      'molduras Viedma',
      'terminaciones Las Grutas'
    ],
  },
};

/** Metadata por defecto para el catálogo sin categoría específica */
export const catalogoDefaultSEO: CategorySEO = {
  title: 'Catálogo de Materiales de Construcción en Seco | Raíces Bahía Blanca',
  description:
    'Catálogo completo de materiales para steel frame y durlock: placas Knauf, perfiles Barbieri, aislaciones Isover, herramientas DeWalt, masillas Weber. +4500 productos con stock permanente y asesoramiento técnico en Bahía Blanca, Viedma y Las Grutas.',
  h1: 'Catálogo de Materiales',
  intro:
    'Explorá nuestra selección completa de más de 4500 productos para construcción en seco. Trabajamos con las marcas líderes del mercado: Knauf, Barbieri, Fischer, Eternit, Weber, DeWalt, Stanley, Isover, Perfiles Revestidos y más. Stock permanente de placas de yeso y cementicias, perfiles galvanizados para steel frame, aislaciones térmicas y acústicas, herramientas profesionales, masillas, revoques y terminaciones. Filtrá por categoría, marca o tipo de uso para encontrar exactamente lo que necesitás. Atendemos obras en Bahía Blanca, Viedma, Las Grutas y zona con asesoramiento técnico especializado.',
  canonical: '/catalogo',
  keywords: [
    'catálogo construcción en seco',
    'materiales drywall Bahía Blanca',
    'Durlock Knauf',
    'steel frame Barbieri',
    'placas de yeso Viedma',
    'perfiles galvanizados Las Grutas',
    'aislaciones Isover',
    'herramientas DeWalt Stanley',
    'masillas Weber Tomecol',
    'Fischer anclajes',
    'Eternit placas cementicias',
    '+4500 productos stock permanente'
  ],
};