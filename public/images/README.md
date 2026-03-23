# 📁 Fast Page Pro - Imágenes por Sección

## Estructura de Carpetas

Cada carpeta está numerada según el orden de las secciones en la página:

```
public/images/
├── 01-hero/              # Hero Section (fondo, banner principal)
├── 02-demo-en-vivo/      # Demo en Vivo (mockup celular, screenshots)
├── 03-portafolio/        # Portafolio (proyectos, hoteles)
├── 04-beneficios/        # Beneficios (estadísticas, íconos)
├── 05-editorial/         # Editorial (video, featured image)
├── 06-testimonios/       # Testimonios (avatars, fotos clientes)
├── 07-planes/            # Planes (icons, feature images)
├── 08-faq/               # FAQ (illustrations)
├── 09-cta-final/         # CTA Final (banner cierre)
└── 10-general/           # General (logos, icons, misc)
```

## 📋 Cómo agregar imágenes

### 1. Copia tu imagen a la carpeta correspondiente
Ejemplo: `public/images/01-hero/fondo-principal.png`

### 2. Usa el nombre de la sección para identificarla
Cuando digas "agrega imagen a Hero", buscaré en `01-hero/`

### 3. Recomendaciones de formato
- **Formato:** WebP o PNG (mejor compresión)
- **Hero:** 1920x1080px mínimo
- **Testimonios:** 400x400px (avatars cuadrados)
- **Portafolio:** 800x600px
- **General:** SVG para íconos

### 4. Compresión recomendada
Usa estas herramientas para comprimir sin perder calidad:
- [TinyPNG](https://tinypng.com/) - PNG/JPG
- [Squoosh](https://squoosh.app/) - WebP/AVIF
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG

## 🚀 Flujo rápido

```powershell
# Copia imágenes desde tu carpeta local
Copy-Item "C:\Tu\Carpeta\*.png" -Destination "c:\dev\PROYECTOS ONLINE\FASTPAGEPRO2\public\images\01-hero\"

# Luego di: "agrega las imágenes de Hero" y yo las configuro
```

## 📸 Nombres sugeridos por sección

| Sección | Nombre sugerido | Uso |
|---------|----------------|-----|
| Hero | `fondo-hero.webp`, `banner-principal.png` | Background principal |
| Demo | `mockup-celular.png`, `demo-screenshot.png` | Mockup WhatsApp |
| Portafolio | `vuelo78hotel.webp`, `hotel-1.png` | Cards de proyectos |
| Testimonios | `cesar-avatar.jpg`, `cliente-1.png` | Fotos testimonios |
| Planes | `icon-start.svg`, `feature-pro.png` | Íconos de planes |

---

**Nota:** Cuando el usuario diga "agrega imagen a [SECCIÓN]", busca en la carpeta correspondiente y actualiza el código.
