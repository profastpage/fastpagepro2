# 🚀 FastPagePro2 - Inicio Rápido para Nuevas Sesiones

## 👋 Hola! Si es tu primera vez trabajando en este proyecto:

### 📁 Estructura del Proyecto
```
FASTPAGEPRO2/
├── src/App.jsx              ← Contenido principal (React)
├── public/images/           ← Imágenes por sección
├── INSTRUCCIONES-ASISTENTE.md ← Reglas para el asistente
└── scripts/auto-deploy.sh   ← Script de deploy automático
```

### 🖼️ Carpetas de Imágenes
```
public/images/
├── 01-hero/           → Hero (banner principal)
├── 02-demo-en-vivo/   → Demo en Vivo (mockups)
├── 03-portafolio/     → Portafolio (proyectos)
├── 04-beneficios/     → Beneficios (stats)
├── 05-editorial/      → Editorial (video)
├── 06-testimonios/    → Testimonios (avatars)
├── 07-planes/         → Planes (íconos)
├── 08-faq/            → FAQ (illustrations)
├── 09-cta-final/      → CTA Final (cierre)
└── 10-general/        → General (misc)
```

---

## ⚡ Flujo Automático (Importante!)

### Para agregar imágenes:

1. **Usuario copia imágenes** a la carpeta correspondiente
   ```powershell
   Copy-Item "C:\Mi\Carpeta\*.png" -Destination "c:\dev\PROYECTOS ONLINE\FASTPAGEPRO2\public\images\01-hero\"
   ```

2. **Usuario dice:** _"Agrega imágenes de Hero"_

3. **Asistente (AUTOMÁTICO):**
   - ✅ Lee las imágenes de `01-hero/`
   - ✅ Actualiza `src/App.jsx`
   - ✅ Hace `git add -A && git commit && git push`
   - ✅ Confirma: `✅ Push completado → Vercel desplegando`

### Para otros cambios:

1. **Usuario pide cambio** (ej: "cambia el título del Hero")

2. **Asistente (AUTOMÁTICO):**
   - ✅ Hace el cambio en el código
   - ✅ Hace `git add -A && git commit && git push`
   - ✅ Confirma: `✅ Push completado → Vercel desplegando`

---

## 🚨 Regla de Oro

**Después de CUALQUIER cambio:**
```bash
git add -A
git commit -m "tipo: descripción"
git push origin main
```

**NO preguntar** "¿quieres push?" → **HACERLO DIRECTAMENTE**

---

## 📋 Comandos Útiles

### Deploy manual (si es necesario):
```bash
# Windows PowerShell
.\scripts\auto-deploy.ps1 "mensaje del commit"

# Linux/Mac
./scripts/auto-deploy.sh "mensaje del commit"
```

### Verificar estado:
```bash
git status
git log -n 1 --oneline
```

### Ver cambios recientes:
```bash
git diff HEAD
```

---

## 🎯 Sistema de Mapeo Inteligente

El código detecta automáticamente imágenes por título:

```javascript
// En src/App.jsx
const imageMap = {
  "Atracción": "/images/02-demo-en-vivo/Atracción.png",
  "Interacción": "/images/02-demo-en-vivo/Interacción.png",
  "Recibe reservas directas en tu WhatsApp": "/images/02-demo-en-vivo/conversión.png"
};
```

**Ventaja:** Solo copia imágenes con nombres que coincidan con los títulos.

---

## ✅ Confirmación después de cada cambio

El asistente SIEMPRE debe confirmar:

```
✅ Push completado a GitHub → Vercel desplegando.

Commit: [HASH] - [MENSAJE]
```

---

## 🔗 Links Importantes

- **GitHub:** https://github.com/profastpage/fastpagepro2
- **Vercel:** https://vercel.com/ (deploy automático)
- **Sitio en vivo:** [URL de tu sitio]

---

## 📞 Soporte

Si algo falla:
1. Verificar `git status`
2. Revisar errores de push
3. Informar al usuario inmediatamente

---

## 🎉 Objetivo

El usuario debe poder:
1. Copiar imágenes → carpetas
2. Decir "Agrega imágenes de [SECCIÓN]"
3. Recibir confirmación automática
4. Ver cambios en Vercel en 1-2 minutos

**Todo automático, sin preguntas intermedias.**
