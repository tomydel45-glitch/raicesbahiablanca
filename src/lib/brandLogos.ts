// Brand logos map - usando rutas públicas para Next.js
const brandLogoMap: Record<string, string> = {
  'STANLEY': '/brands/stanley.png',
  'DEWALT': '/brands/dewalt.png',
  'BARBIERI': '/brands/barbieri.png',
  'FISCHER': '/brands/fischer.png',
  'OBLAK': '/brands/oblak.png',
  'ATENNEAS': '/brands/atenneas.png',
  'AQUAPANEL': '/brands/aquapanel.png',
  'AMF': '/brands/amf.png',
  'AISPLAC': '/brands/aisplac.png',
  'KNAUF': '/brands/knauf.png',
  'SUPERBOARD': '/brands/superboard.png',
  'ETERNIT': '/brands/eternit.png',
  'TEL': '/brands/tel.png',
  'ISOVER': '/brands/isover.png',
  'TUSSOK': '/brands/tussok.png',
  '3M': '/brands/3m.png',
  'BAROVO': '/brands/barovo.png',
  'BUL': '/brands/bul.png',
  'EMTOP': '/brands/emtop.png',
  'ESSAMET': '/brands/essamet.png',
  'FERROHOUSE': '/brands/ferrohouse.png',
  'HAMILTON': '/brands/hamilton.png',
  'LP': '/brands/lp.png',
  'POLIPOR': '/brands/polipor.png',
  'POLYTEMP': '/brands/polytemp.png',
  'TYPAR': '/brands/typar.png',
  'WEBER': '/brands/weber.png',
  'WICHI': '/brands/wichi.png',
  'POTENZA': '/brands/potenza.png',
  'QUIMTEX': '/brands/quimtex.png',
  'RC': '/brands/rc.png',
  'SKIL': '/brands/skil.png',
  'FIBROFLEX': '/brands/fibroflex.png',
  'PERFILES REVESTIDOS': '/brands/perfiles-revestidos.png',
};

export function getBrandLogo(brand: string): string | null {
  return brandLogoMap[brand.toUpperCase()] || null;
}

export function getBrandDisplay(brand: string): string {
  if (!brand || brand.trim() === '') return '';
  return brand;
}

export function getBrandForFilter(brand: string): string {
  if (!brand || brand.trim() === '') return 'Genérico';
  return brand;
}
