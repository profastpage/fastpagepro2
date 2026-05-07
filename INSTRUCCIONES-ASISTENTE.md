# 🤖 Instrucciones para el Asistente de Código - FASTPAGEPRO2

## ⚡ REGLA PRINCIPAL: AUTOMÁTICO SIEMPRE

**Después de CUALQUIER cambio en el código:**
```bash
git add -A
git commit -m "[tipo]: descripción del cambio"
git push origin main
```

**NO preguntar** "¿quieres que haga push?" → **HACERLO DIRECTAMENTE**

---

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

### 5. Hacer commit y push AUTOMÁTICAMENTE (SIN PREGUNTAR)
```bash
git add -A
git commit -m "feat: imágenes en [SECCIÓN] - [DESCRIPCIÓN]"
git push origin main
```

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

## 🚨 IMPORTANTE - NO OLVIDAR

**Siempre** confirmar al final con este formato:
```
✅ Push completado a GitHub → Vercel desplegando.

Commit: [HASH] - [MENSAJE DEL COMMIT]
```

El usuario quiere deploy continuo a Vercel después de CADA cambio.

**NUNCA** preguntar:
- ❌ "¿Quieres que haga push?"
- ❌ "¿Debo subir los cambios?"
- ❌ "¿Procedo con el deploy?"

**SIEMPRE** hacer:
- ✅ `git push` inmediatamente después del commit
- ✅ Confirmar que Vercel desplegará en 1-2 minutos

---

## 🔄 Comandos Útiles

### Verificar estado antes de cambios:
```bash
git status
git log -n 1 --oneline
```

### Después de cambios (AUTOMÁTICO):
```bash
git add -A
git commit -m "tipo: descripción"
git push origin main
```

### Tipos de commit:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `style:` Cambios de estilo/CSS
- `docs:` Documentación
- `refactor:` Refactorización
- `chore:` Tareas de mantenimiento

---

## 📞 En caso de error

Si `git push` falla:
1. Intentar de nuevo
2. Si persiste el error, informar al usuario inmediatamente
3. NO continuar con más cambios hasta resolver

---

## 🎯 Objetivo Final

El usuario debe poder:
1. Copiar imágenes a las carpetas
2. Decir "Agrega imágenes de [SECCIÓN]"
3. Recibir confirmación de push completado
4. Ver los cambios en Vercel en 1-2 minutos

**Todo sin preguntas intermedias, todo automático.**
