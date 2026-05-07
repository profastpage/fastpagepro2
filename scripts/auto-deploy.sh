#!/bin/bash

# 🚀 FastPagePro2 - Auto Deploy Script
# Uso: ./scripts/auto-deploy.sh "mensaje del cambio"

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que se pasó un mensaje
if [ -z "$1" ]; then
    echo -e "${YELLOW}⚠️  Uso: ./auto-deploy.sh \"mensaje del commit\"${NC}"
    echo -e "${YELLOW}   Ejemplo: ./auto-deploy.sh \"feat: imágenes en Hero\"${NC}"
    exit 1
fi

# Verificar que hay cambios
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${BLUE}ℹ️  No hay cambios para commit${NC}"
    exit 0
fi

# Echo del mensaje
echo -e "${BLUE}📝 Commit: $1${NC}"

# Agregar todos los cambios
echo -e "${YELLOW}⏳ Agregando cambios...${NC}"
git add -A

# Hacer commit
echo -e "${YELLOW}⏳ Creando commit...${NC}"
git commit -m "$1"

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Error en el commit${NC}"
    exit 1
fi

# Hacer push
echo -e "${YELLOW}⏳ Subiendo a GitHub (Vercel deployará automáticamente)...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Push completado a GitHub → Vercel desplegando${NC}"
    echo -e "${GREEN}   Los cambios estarán en vivo en 1-2 minutos${NC}"
    echo ""
    git log -n 1 --format="Commit: %h - %s"
else
    echo -e "${YELLOW}⚠️  Error en el push${NC}"
    exit 1
fi
