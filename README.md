# FastPagePro2

Landing hecha con React + Vite + Tailwind CSS.

## Requisitos

- Node.js 20+
- npm 10+

## Instalar y ejecutar local

```bash
npm install
npm run dev
```

## Build de produccion

```bash
npm run build
npm run preview
```

## Deploy en GitHub Pages

1. Crea un repo en GitHub y conecta este proyecto:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git add .
git commit -m "Setup inicial FastPagePro"
git push -u origin main
```

2. Publica la web:

```bash
npm run deploy
```

3. En GitHub, ve a `Settings > Pages`.
4. En `Build and deployment` selecciona:
- `Source`: `Deploy from a branch`
- `Branch`: `gh-pages` y carpeta `/ (root)`
5. Guarda y espera unos minutos.

## Scripts utiles

- `npm run dev`: entorno local
- `npm run lint`: revision de codigo
- `npm run build`: compila para produccion
- `npm run deploy`: publica en rama `gh-pages`
