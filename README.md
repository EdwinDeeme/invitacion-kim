# ✨ Invitación Interactiva - Cumpleaños de Kimberly Mora

Una experiencia web premium, inmersiva e interactiva inspirada en el universo de **Harry Potter / Hogwarts** para el cumpleaños número 32 de Kimberly Mora.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Desarrollo](#desarrollo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API](#api)
- [Deployment](#deployment)

## ✨ Características

- 🎭 Experiencia narrativa cinematográfica en 5 escenas
- 🎨 Diseño elegante basado en paleta de colores mágica
- 📱 Optimizado para dispositivos móviles (prioridad)
- 🎬 Animaciones fluidas con Framer Motion
- 👤 Personalización automática por invitado
- 📊 Panel administrativo simple para gestionar invitados
- 📋 Sistema RSVP integrado
- 🔗 Generación automática de URLs y códigos QR
- 🔐 Autenticación simple para admin
- ⚡ Performance optimizado

## 🛠️ Requisitos

- Docker + Docker Compose
- Node.js 18+ (opcional, solo si quieres correr sin Docker)
- npm o yarn

## 📦 Instalación

### 1. Clonar el repositorio

```bash
cd invitacion-kimberly
```

### 2. Levantar con Docker (recomendado)

```bash
docker compose up --build
```

La app estará disponible en `http://localhost:3000` y PostgreSQL corre en el contenedor `db`.

Para ejecutar en background:

```bash
docker compose up --build -d
```

Para detener:

```bash
docker compose down
```

### 3. Instalar dependencias (modo sin Docker)

```bash
npm install
# o
yarn install
```

### 4. Configurar base de datos

#### Opción A: Render (Gratuito)

1. Ve a [render.com](https://render.com)
2. Crea una base de datos PostgreSQL nueva
3. Copia la connection string
4. Pégalo en `.env.local` como `DATABASE_URL`

#### Opción B: Local con PostgreSQL

```bash
# Asume que tienes PostgreSQL instalado
# Crea una BD:
createdb invitacion_kimberly

# Obtén la connection string:
DATABASE_URL="postgresql://user:password@localhost:5432/invitacion_kimberly"
```

### 5. Configurar variables de entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` y configura:

```env
# Base de datos
DATABASE_URL="tu_postgres_url_aqui"

# Admin
ADMIN_PASSWORD="tu_contraseña_simple"

# App URL (para desarrollo)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 6. Ejecutar migraciones de base de datos

```bash
npm run db:migrate
```

Esto creará las tablas automáticamente usando Prisma.

### 7. Iniciar servidor de desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## 🐳 Variables para Docker

Cuando usas Docker Compose, ya se inyecta automáticamente:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/invitacion_kimberly?schema=public"
ADMIN_PASSWORD="contraseña_simple"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

No necesitas configurar Render para probar localmente.

## ⚙️ Configuración

### Configuración del Evento

**Archivo:** `data/eventConfig.ts`

Todos los detalles del evento están centralizados aquí:

```typescript
export const eventConfig: EventConfig = {
  celebrant: {
    name: 'Kimberly Mora',
    age: 32,
  },
  event: {
    date: '2026-09-13',
    time: '15:00',
    location: 'Farfala Blu Barrio el Hoyon',
    address: 'Farfala Blu, Barrio el Hoyon',
    dressCode: 'Opcional: Caracterizar la casa a la que perteneces...',
    additionalInfo: '⚠️ IMPORTANTE: ¡ESTO ES UNA SORPRESA!',
    mapsUrl: 'https://www.google.com/maps/search/...',
    wazeUrl: 'https://waze.com/ul?place=...',
  },
};
```

Cambias la información UNA VEZ aquí, y se refleja automáticamente en toda la app.

### Variables de Entorno

Archivo `.env.local`:

```env
# ✅ REQUERIDO
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="contraseña_simple"

# URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # o tu dominio en producción
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""           # Opcional
```

## 🚀 Desarrollo

### Estructura de Carpetas

```
app/                   # Next.js App Router
  i/[guestSlug]/      # Invitación personalizada
  admin/              # Panel administrativo
  api/                # API routes
  layout.tsx
  globals.css
  page.tsx

components/           # Componentes React
  invitation/         # Las 5 escenas
  magic/              # Efectos visuales
  ui/                 # Componentes base
  admin/              # UI para admin

lib/                  # Lógica y utilidades
  db.ts               # Cliente Prisma
  guests.ts           # Queries de invitados
  rsvp.ts             # Queries de RSVP
  utils.ts            # Utilidades

types/                # Tipos TypeScript
  index.ts

data/                 # Configuración y datos
  eventConfig.ts      # ⭐ CONFIGURACIÓN CENTRAL

prisma/               # Base de datos
  schema.prisma       # Esquema

public/               # Archivos estáticos
  images/
  fonts/
```

### Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build
npm start

# Base de datos
npm run db:migrate    # Ejecutar migraciones
npm run db:studio     # Ver datos en Prisma Studio

# Linting
npm run lint
```

### Componentes Principales

#### Invitación (5 escenas)

- `InvitationExperience` - Orquestador
- `InvitationIntro` - Intro mágica
- `HogwartsLetter` - Carta Hogwarts
- `MagicWandReveal` - Varita revela info
- `SortingHat` - Sombrero Seleccionador
- `MaraudersMap` - Mapa final

#### Efectos Mágicos

- `ParticleEffect` - Partículas
- `MagicSparkles` - Destellos
- `Wand` - Varita SVG
- `FloatingCandles` - Velas flotantes

#### Admin

- `GuestList` - Tabla de invitados
- `GuestForm` - Crear/editar invitados
- `RSVPStats` - Estadísticas
- `QRGenerator` - Generar QRs

## 🔌 API

### Endpoints de Invitados

#### GET `/api/guests/:slug`

Obtiene invitado por slug (personalización de invitación).

```bash
curl http://localhost:3000/api/guests/helen-andres
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "helen-andres",
    "name": "Helen y Andrés",
    "numberOfGuests": 2,
    "guestType": "couple",
    "status": "pending",
    "createdAt": "2026-08-16T...",
    "updatedAt": "2026-08-16T..."
  }
}
```

#### POST `/api/guests`

Crear nuevo invitado (requiere autenticación admin).

```bash
curl -X POST http://localhost:3000/api/guests \
  -H "X-Admin-Password: tu_contraseña" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Helen y Andrés",
    "numberOfGuests": 2
  }'
```

#### PUT `/api/guests/by-id/:id`

Actualizar invitado.

#### DELETE `/api/guests/by-id/:id`

Eliminar invitado.

### Endpoints de RSVP

#### GET `/api/rsvp/:guestId`

Obtener estado RSVP.

#### POST `/api/rsvp/:guestId`

Confirmar o declinar asistencia.

```bash
curl -X POST http://localhost:3000/api/rsvp/uuid \
  -H "Content-Type: application/json" \
  -d '{
    "attending": true,
    "numberOfGuestsAttending": 2,
    "guestName": "Helen"
  }'
```

## 🚀 Deployment

### En Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### En Render

1. Crea cuenta en [render.com](https://render.com)
2. Conecta tu repositorio GitHub
3. Crea nuevo "Web Service"
4. Configura variables de entorno en dashboard
5. Deploy automático en cada push

### En otro servidor

```bash
# Build
npm run build

# Start
npm start
```

## 📱 Mobile-First

La aplicación está diseñada primero para móvil:

- ✅ Touch-friendly con botones comfortables
- ✅ Responsive en todas las pantallas
- ✅ Sin dependencias de hover
- ✅ Animaciones optimizadas para CPU móvil
- ✅ Imágenes optimizadas con Next.js
- ✅ SVG para elementos visuales
- ✅ Detección de `prefers-reduced-motion`

## 🔐 Seguridad

- ✅ Autenticación simple pero efectiva
- ✅ Validación servidor-side
- ✅ No exponer IDs sensibles
- ✅ Variables en `.env`
- ✅ CORS configurado
- ✅ Rate limiting en API

## ⚡ Performance

- ✅ Code splitting dinámico
- ✅ SSR con Next.js
- ✅ Lazy loading de componentes
- ✅ Optimización de imágenes
- ✅ SVG en lugar de imágenes pesadas
- ✅ CSS animations optimizadas
- ✅ Caché de datos inteligente

## 📝 Licencia

Proyecto personalizado para Kimberly Mora. Desarrollado con ❤️ y magia ✨

---

**¿Preguntas o problemas?**

Revisa la estructura del proyecto o consulta la documentación.
