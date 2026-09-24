# Olive Makeup — Sitio web

Landing page + catálogo interactivo para **Olive Makeup**, construido en React + Vite +
Tailwind CSS v4. Aplica Proxemia Digital, Leyes de la Gestalt y las 10 Heurísticas de
Nielsen sobre la paleta oliva de marca.

## Origen de los datos

- **252 productos reales**, 16 categorías → generados a partir de
  `catalogo olive makeup_20260922_114009_0000.pdf` (extracción automática de texto +
  posición, ver `public/catalog/`).
- Las imágenes en `public/catalog/page-XX.jpg` son renders reales de cada hoja del
  catálogo (diseño original en Canva) — se muestran en cada categoría y en los lightbox
  de zoom.
- El **producto destacado** (Base 2 en 1 Bloomshell, `src/data/flagship.js`) usa los 10
  tonos reales fotografiados en la página 5 del catálogo. La clasificación Frío/Neutro/
  Cálido de cada tono es una estimación editorial — valídala antes de publicar.
- Las **reseñas** (`src/data/reviews.js`) son contenido de ejemplo para mostrar el
  diseño de filtros — reemplázalas por reseñas reales antes de publicar.
- Los sellos "Dermatológicamente probado" y "Cruelty-Free" están marcados con `*` como
  referenciales: confírmalos con cada marca antes de publicar.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build   # genera /dist
npm run preview # sirve /dist localmente para revisar el build
```

## Publicar en GitHub Pages

Ver el paso a paso completo en la conversación con Claude, o usar el workflow ya
incluido en `.github/workflows/deploy.yml` (se activa automáticamente en cada push a
`main` — solo hay que activar GitHub Pages → Source: GitHub Actions en la configuración
del repositorio).
