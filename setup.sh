#!/bin/bash

# Setup con Docker para pruebas locales

echo "✨ Invitación Kimberly - Setup Docker Local ✨"
echo ""

# 1. Verificar Docker
if ! command -v docker >/dev/null 2>&1; then
  echo "❌ Docker no está instalado. Instálalo y vuelve a ejecutar este script."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "❌ Docker Compose no está disponible. Actualiza Docker e inténtalo de nuevo."
  exit 1
fi

# 2. Levantar stack
echo "🐳 Levantando contenedores (web + postgres)..."
docker compose up --build -d

if [ $? -ne 0 ]; then
  echo "❌ No se pudo levantar Docker Compose"
  exit 1
fi

echo "✅ Contenedores arriba"
echo ""

# 3. Info de próximos pasos
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Setup completado!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo ""
echo "1️⃣  Ver estado de contenedores:"
echo "   docker compose ps"
echo ""
echo "2️⃣  Ver logs de la app:"
echo "   docker compose logs -f web"
echo ""
echo "3️⃣  Visita:"
echo "   • http://localhost:3000          (inicio)"
echo "   • http://localhost:3000/admin    (panel admin)"
echo ""
echo "4️⃣  Comandos útiles:"
echo "   • npm run docker:down   (detener contenedores)"
echo "   • npm run docker:up     (volver a levantar)"
echo ""
echo "📚 Documentación:"
echo "   • QUICKSTART.md  ← Lee esto primero"
echo "   • TROUBLESHOOTING.md ← Soluciones rápidas"
echo "   • ADMIN_GUIDE.md ← Cómo usar admin"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
