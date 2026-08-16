@echo off
chcp 65001 >nul
echo ✨ Invitación Kimberly - Setup Docker Local ✨
echo.

REM 1. Verificar Docker
docker --version >nul 2>&1
if errorlevel 1 (
  echo ❌ Docker no esta instalado. Instala Docker Desktop y vuelve a intentar.
  exit /b 1
)

docker compose version >nul 2>&1
if errorlevel 1 (
  echo ❌ Docker Compose no esta disponible. Actualiza Docker Desktop.
  exit /b 1
)

REM 2. Levantar stack
echo 🐳 Levantando contenedores (web + postgres)...
docker compose up --build -d

if errorlevel 1 (
  echo ❌ No se pudo levantar Docker Compose
  exit /b 1
)

echo ✅ Contenedores arriba
echo.

REM 3. Info de próximos pasos
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✨ Setup completado!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📋 PRÓXIMOS PASOS:
echo.
echo 1️⃣  Ver estado de contenedores:
echo    docker compose ps
echo.
echo 2️⃣  Ver logs de la app:
echo    docker compose logs -f web
echo.
echo 3️⃣  Visita:
echo    - http://localhost:3000          (inicio)
echo    - http://localhost:3000/admin    (panel admin)
echo.
echo 4️⃣  Detener contenedores:
echo    docker compose down
echo.
echo 📚 Documentación:
echo    - QUICKSTART.md  ← Lee esto primero
echo    - TROUBLESHOOTING.md ← Soluciones rápidas
echo    - ADMIN_GUIDE.md ← Cómo usar admin
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pause
