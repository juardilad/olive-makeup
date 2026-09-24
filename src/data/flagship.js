// Producto insignia usado para demostrar la Ficha de Producto (PDP) completa
// con selector de subtono. Nombre, marca, precio y los 10 tonos son reales,
// tomados directamente de la tira de swatches fotografiada en la página 5
// del catálogo (public/catalog/page-05.jpg). La clasificación Frío/Neutro/
// Cálido de cada tono es una estimación editorial nuestra para ilustrar el
// componente — conviene validarla con el fabricante antes de publicar.
export const flagshipProduct = {
  id: 'base-2-en-1-bloomshell',
  name: 'Base 2 en 1',
  brand: 'Bloomshell',
  fullName: 'Base 2 en 1 Bloomshell — Concealer + Foundation con Ácido Hialurónico',
  price: 34000,
  category: 'Bases',
  page: 5,
  rating: 4.9,
  reviewCount: 1247,
  image: './catalog/hero-bloomshell-base.jpg',
  catalogSheet: './catalog/page-05.jpg',
  description:
    'Base 2 en 1 (corrector + foundation) fórmula hidratante con Ácido Hialurónico. Cobertura buildable de ligera a media, acabado natural. Referencia real del catálogo Olive Makeup.',
  shades: [
    { code: '02', name: 'Natural', undertone: 'neutro', hex: '#E8C6A0' },
    { code: '03', name: 'Nude', undertone: 'frio', hex: '#E3C09E' },
    { code: '04', name: 'Almendra', undertone: 'calido', hex: '#DDB48C' },
    { code: '4.2', name: 'Neutral Beige', undertone: 'neutro', hex: '#D9AC81' },
    { code: '4.5', name: 'Neutral Medium', undertone: 'neutro', hex: '#CE9E71' },
    { code: '4.8', name: 'Vainilla', undertone: 'frio', hex: '#E6C8A8' },
    { code: '05', name: 'Medium Beige', undertone: 'calido', hex: '#C79161' },
    { code: '6.5', name: 'Golden Tan', undertone: 'calido', hex: '#B87D48' },
    { code: '07', name: 'Honey', undertone: 'calido', hex: '#A56A3B' },
    { code: '08', name: 'Cocoa', undertone: 'calido', hex: '#7C4A2A' },
  ],
  ingredients: [
    {
      inci: 'Ácido Hialurónico (Sodium Hyaluronate)',
      benefit: 'Retiene hasta 1000 veces su peso en agua: hidratación profunda que dura todo el día.',
    },
    {
      inci: 'Dimeticona',
      benefit: 'Difumina líneas de expresión y da ese "efecto filtro" suave típico del acabado velvet.',
    },
    {
      inci: 'Óxidos de hierro (CI 77491, 77492, 77499)',
      benefit: 'Pigmentos minerales responsables del tono — por eso cada número de la tira representa un matiz distinto.',
    },
    {
      inci: 'Glicerina',
      benefit: 'Humectante que evita el efecto "craquelado" en piel seca durante el uso prolongado.',
    },
  ],
}

// Guía rápida de equivalencia de tono — apoya la heurística "Reconocimiento
// antes que recuerdo" (Shade Finder). Sustituye por una tabla validada con
// tu equipo de producto antes de publicar en producción.
export const shadeFinderGuide = [
  { skinTone: 'Piel muy clara, se quema fácil al sol', suggested: ['02', '03'] },
  { skinTone: 'Piel clara con subtono rosado', suggested: ['03', '4.2'] },
  { skinTone: 'Piel media, se broncea con facilidad', suggested: ['04', '4.5', '05'] },
  { skinTone: 'Piel morena/trigueña', suggested: ['6.5', '07'] },
  { skinTone: 'Piel oscura', suggested: ['08'] },
]
