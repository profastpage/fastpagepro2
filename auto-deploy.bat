@echo off
REM =====================================================
REM 🚀 FastPagePro - Auto Deploy GLOBAL (Windows)
REM =====================================================
REM Uso: auto-deploy.bat "mensaje del commit"
REM Ejemplo: auto-deploy.bat "feat: imágenes en Hero"
REM =====================================================

REM Verificar que se pasó un mensaje
if "%~1"=="" (
    echo ⚠️  Uso: auto-deploy.bat "mensaje del commit"
    echo    Ejemplo: auto-deploy.bat "feat: imágenes en Hero"
    exit /b 1
)

REM Verificar que hay cambios
git status --porcelain > nul 2>&1
if errorlevel 1 (
    echo ℹ️  No hay cambios para commit
    exit /b 0
)

REM Echo del mensaje
echo 📝 Commit: %~1

REM Agregar todos los cambios
echo ⏳ Agregando cambios...
git add -A

REM Hacer commit
echo ⏳ Creando commit...
git commit -m "%~1"
if errorlevel 1 (
    echo ⚠️  Error en el commit
    exit /b 1
)

REM Hacer push
echo ⏳ Subiendo a GitHub (Vercel deployará automáticamente)...
git push origin main
if errorlevel 1 (
    echo ⚠️  Error en el push
    exit /b 1
)

echo.
echo ✅ Push completado a GitHub → Vercel desplegando
echo    Los cambios estarán en vivo en 1-2 minutos
echo.
git log -n 1 --format="Commit: %%h - %%s"
echo.
