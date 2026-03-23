# 🤖 Instrucciones para el Asistente de Código

## 📋 Flujo de Trabajo para Imágenes

Cuando el usuario diga **"Agrega imágenes de [SECCIÓN]"**:

### 1. Leer imágenes de la carpeta correspondiente
```
public/images/
├── 01-hero/           → Hero
├── 02-demo-en-vivo/   → Demo en Vivo
├── 03-portafolio/     → Portafolio
├── 04-beneficios/     → Beneficios
├── 05-editorial/      → Editorial
├── 06-testimonios/    → Testimonios
├── 07-planes/         → Planes
├── 08-faq/            → FAQ
├── 09-cta-final/      → CTA Final
└── 10-general/        → General
```

### 2. Identificar imágenes por nombre
- Los nombres de archivo deben coincidir con títulos de cards/secciones
- Ejemplo: `conversión.png` → Card "Conversión" o "Recibe reservas directas en tu WhatsApp"

### 3. Actualizar el código en `src/App.jsx`
- Reemplazar imágenes de stock por las locales
- Usar formato: `/images/[CARPETA]/[ARCHIVO].png`

### 4. Renombrar archivos si es necesario
- Espacios → guiones: `mi imagen.png` → `mi-imagen.png`
- Caracteres especiales: mantener ñ y acentos (UTF-8)

### 5. Hacer commit y push AUTOMÁTICAMENTE
```bash
git add -A
git commit -m "feat: imágenes en [SECCIÓN] - [DESCRIPCIÓN]"
git push origin main
```

**Importante:** Siempre hacer push después de cambios, el usuario quiere deploy automático a Vercel.

---

## 🎨 Sistema de Mapeo Inteligente

Usar este patrón en las secciones con cards:

```javascript
const imageMap = {
  "Título Exacto del Card": "/images/[CARPETA]/archivo.png",
  // ...
};
```

Esto permite que el código asigne automáticamente las imágenes según el título.

---

## 📸 Compresión de Imágenes (Recomendación)

Antes de subir, recomendar al usuario:
- **TinyPNG**: https://tinypng.com/ (PNG/JPG)
- **Squoosh**: https://squoosh.app/ (WebP/AVIF)
- **SVGOMG**: https://jakearchibald.github.io/svgomg/ (SVG)

---

## ✅ Checklist después de cada cambio

- [ ] Imágenes copiadas a la carpeta correcta
- [ ] Nombres de archivos normalizados (guiones, sin espacios)
- [ ] Código actualizado en App.jsx
- [ ] Commit hecho con mensaje descriptivo
- [ ] **Push a GitHub realizado** (Vercel deploya automático)
- [ ] Confirmar al usuario el commit hash

---

## 🚨 IMPORTANTE

**Siempre** confirmar al final:
```
✅ Push completado a GitHub → Vercel desplegando.

Commit: [HASH] - [MENSAJE]
```

El usuario quiere deploy continuo a Vercel después de cada cambio.
