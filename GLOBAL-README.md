# 🚀 CONFIGURACIÓN GLOBAL - Todos los Proyectos FastPagePro

## 📁 Instalación Única (para todos los proyectos)

### Paso 1: Copiar archivos a la carpeta principal

```powershell
# Desde PowerShell (como administrador si es necesario)
$source = "C:\dev\PROYECTOS ONLINE\FASTPAGEPRO2"
$dest = "C:\dev\PROYECTOS ONLINE"

# Copiar script global
Copy-Item "$source\auto-deploy.bat" -Destination "$dest\auto-deploy.bat"

# Copiar instrucciones globales
Copy-Item "$source\GLOBAL-README.md" -Destination "$dest\README-DEPLOY.md"
```

### Paso 2: Agregar al PATH (opcional, para usar desde cualquier lado)

```powershell
# Agregar C:\dev\PROYECTOS ONLINE al PATH de usuario
[Environment]::SetEnvironmentVariable(
    "Path",
    $env:Path + ";C:\dev\PROYECTOS ONLINE",
    "User"
)
```

---

## ⚡ Uso en CUALQUIER Proyecto

### Desde PowerShell:

```powershell
cd "C:\dev\PROYECTOS ONLINE\[NOMBRE-PROYECTO]"

# Hacer cambios...

# Deploy automático
.\auto-deploy.bat "feat: descripción del cambio"
```

### O simplemente:

```powershell
cd "C:\dev\PROYECTOS ONLINE\[NOMBRE-PROYECTO]"
git add -A
git commit -m "feat: descripción"
git push origin main
```

---

## 🤖 Para Asistentes de IA (Nuevo Chat)

**Al iniciar cualquier sesión en cualquier proyecto, decir:**

```
📋 REGLAS PARA ESTE PROYECTO:

1. Después de CUALQUIER cambio en el código:
   - git add -A
   - git commit -m "tipo: descripción"
   - git push origin main (SIN preguntar)

2. Confirmar siempre:
   ✅ Push completado a GitHub → [PLATAFORMA] desplegando.
   Commit: [HASH] - [MENSAJE]

3. NUNCA preguntar:
   - ❌ "¿Quieres que haga push?"
   - ❌ "¿Debo subir los cambios?"

4. SIEMPRE hacer:
   - ✅ Push automático después de cada commit
   - ✅ Confirmar con hash de commit

📁 Ver: C:\dev\PROYECTOS ONLINE\README-DEPLOY.md
```

---

## 📂 Proyectos que usan este sistema

Todos los proyectos en `C:\dev\PROYECTOS ONLINE\`:

```
C:\dev\PROYECTOS ONLINE\
├── auto-deploy.bat          ← Script global
├── README-DEPLOY.md         ← Este archivo
├── FASTPAGEPRO2/            ← Proyecto 1
│   ├── INSTRUCCIONES-ASISTENTE.md
│   └── ...
├── MI-OTRO-PROYECTO/        ← Proyecto 2
│   ├── INSTRUCCIONES-ASISTENTE.md (copiar si es necesario)
│   └── ...
└── TERCER-PROYECTO/         ← Proyecto 3
    └── ...
```

---

## ✅ Checklist para CADA Proyecto Nuevo

Cuando crees un nuevo proyecto:

1. ✅ Inicializar git:
   ```powershell
   git init
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   ```

2. ✅ Copiar instrucciones:
   ```powershell
   Copy-Item "C:\dev\PROYECTOS ONLINE\FASTPAGEPRO2\INSTRUCCIONES-ASISTENTE.md" -Destination ".\"
   Copy-Item "C:\dev\PROYECTOS ONLINE\FASTPAGEPRO2\INICIO-RAPIDO.md" -Destination ".\"
   ```

3. ✅ Configurar deploy automático (Vercel/Netlify/GitHub Pages)

4. ✅ Listo! El sistema automático funciona en este proyecto

---

## 🎯 Objetivo

**Un solo comando para TODOS los proyectos:**

```powershell
# En cualquier proyecto dentro de C:\dev\PROYECTOS ONLINE\
.\auto-deploy.bat "mensaje del commit"
```

**O automáticamente con el asistente:**
- Tú: _"Cambia el título del Hero"_
- Asistente: Hace el cambio → `git push` automático → Confirma

---

## 🔗 Links

- **GitHub:** https://github.com/profastpage
- **Vercel:** https://vercel.com/
- **Proyectos:** `C:\dev\PROYECTOS ONLINE\`

---

**Esta configuración es GLOBAL para todos los proyectos FastPagePro**
