# 📚 Índice de Archivos - Invitación Kimberly Mora

## 🎯 Inicio Rápido

👉 **Lee primero:** [`QUICKSTART.md`](./QUICKSTART.md)

## 📋 Documentación Completa

- [`README.md`](./README.md) - Guía completa del proyecto
- [`ADMIN_GUIDE.md`](./ADMIN_GUIDE.md) - Cómo usar el panel administrativo
- [`QUICKSTART.md`](./QUICKSTART.md) - Pasos para empezar (QUÉ LEER PRIMERO)

---

## 🏗️ Estructura del Proyecto

### `/app` - Páginas y Rutas Next.js

```
app/
├── page.tsx                      # Página de inicio
├── layout.tsx                    # Layout global
├── globals.css                   # Estilos globales
│
├── i/[guestSlug]/
│   ├── page.tsx                  # ⭐ Invitación personalizada por slug
│   └── not-found.tsx             # Página 404 para invitados inexistentes
│
├── admin/
│   ├── page.tsx                  # ⭐ Panel administrativo (protegido por contraseña)
│   └── layout.tsx                # Layout del admin
│
└── api/
    ├── guests/
    │   ├── route.ts              # GET: lista invitados | POST: crear invitado
    │   ├── [id]/route.ts         # GET/PUT/DELETE: operaciones en invitado
    │   └── stats/route.ts        # GET: estadísticas RSVP
    │
    └── rsvp/
        └── [guestId]/route.ts    # GET/POST: confirmación de asistencia
```

### `/components` - Componentes React

#### Experiencia Invitación (Las 5 Escenas)
```
components/invitation/
├── InvitationExperience.tsx      # ⭐ Orquestador de las 5 escenas
├── InvitationIntro.tsx           # ESCENA 1: Intro mágica
├── HogwartsLetter.tsx            # ESCENA 2: Carta Hogwarts
├── MagicWandReveal.tsx           # ESCENA 3: Varita revela información
├── SortingHat.tsx                # ESCENA 4: Sombrero Seleccionador
├── MaraudersMap.tsx              # ESCENA 5: Mapa final
└── RSVPForm.tsx                  # Formulario de confirmación (usado en Escena 5)
```

#### Efectos Mágicos
```
components/magic/
├── ParticleEffect.tsx            # Partículas con Canvas (performance)
├── MagicSparkles.tsx             # Destellos pequeños
├── MagicFlash.tsx                # Flash/destello de impacto
├── Wand.tsx                      # ⭐ Varita mágica animada
├── SVGWand.tsx                   # SVG de la varita
└── FloatingCandles.tsx           # Velas flotantes
```

#### Componentes UI Base
```
components/ui/
├── Button.tsx                    # Botón reutilizable (variantes)
├── Card.tsx                      # Card/tarjeta
└── Container.tsx                 # Contenedor responsivo
```

#### Panel Administrativo
```
components/admin/
├── RSVPStats.tsx                 # ⭐ Estadísticas RSVP
├── GuestForm.tsx                 # ⭐ Formulario crear/editar invitado
└── GuestList.tsx                 # ⭐ Tabla de invitados
```

### `/lib` - Lógica y Utilidades

```
lib/
├── db.ts                         # Cliente Prisma (conexión BD)
├── guests.ts                     # 🔌 Server actions para invitados
├── rsvp.ts                       # 🔌 Server actions para RSVP
├── utils.ts                      # Utilidades (slugs, casas, validaciones)
└── animations.ts                 # ⭐ Presets de animaciones Framer Motion
```

### `/types` - Tipos TypeScript

```
types/
└── index.ts                      # Todos los tipos de la app
   - Guest
   - RSVP
   - EventConfig
   - HogwartsHouse
   - InvitationSession
   - ApiResponse
```

### `/data` - Configuración del Evento

```
data/
└── eventConfig.ts                # ⭐⭐⭐ CONFIGURACIÓN CENTRAL
   - Celebrante: Kimberly Mora, 32 años
   - Fecha/Hora/Lugar/DressCode
   - Casas Hogwarts
   - Información adicional
```

### `/prisma` - Base de Datos

```
prisma/
├── schema.prisma                 # ⭐ Esquema de datos (Guest, RSVP)
└── seed.ts                       # Script para cargar datos de prueba
```

### `/public` - Archivos Estáticos

```
public/
├── fonts/                        # Fuentes personalizadas
└── images/                       # SVGs y imágenes
```

---

## 🎨 Componentes por Escena

### ESCENA 1: Introducción Mágica
- Archivo: `components/invitation/InvitationIntro.tsx`
- Usa: ParticleEffect, FloatingCandles
- Muestra: Intro oscura + nombre personalizado
- Acción: Botón "Abrir Carta"

### ESCENA 2: Carta Hogwarts
- Archivo: `components/invitation/HogwartsLetter.tsx`
- Usa: Animaciones 3D con Framer Motion
- Muestra: Sobre/carta con sello de Hogwarts
- Acción: Click para abrir

### ESCENA 3: Varita Mágica
- Archivo: `components/invitation/MagicWandReveal.tsx`
- Usa: Wand, MagicSparkles, ParticleEffect
- Muestra: Varita revela información progresivamente
- Contenido: Fecha, hora, lugar

### ESCENA 4: Sombrero Seleccionador
- Archivo: `components/invitation/SortingHat.tsx`
- Usa: SVG animado del sombrero
- Muestra: Casa asignada aleatoriamente
- Casas: Gryffindor, Slytherin, Ravenclaw, Hufflepuff

### ESCENA 5: Mapa del Merodeador
- Archivo: `components/invitation/MaraudersMap.tsx`
- Usa: RSVPForm, Button
- Muestra: Panel final con 3 acciones
- Acciones:
  1. 📍 Ver ubicación (Google Maps / Waze)
  2. 🦉 Confirmar asistencia (RSVP)
  3. 📜 Información (dress code, etc)

---

## 🔌 Flujo de Datos

### Invitación Personalizada

```
URL: /i/helen-andres
  ↓
page.tsx obtiene slug "helen-andres"
  ↓
getGuestBySlug("helen-andres") → BD
  ↓
Retorna Guest { id, name, numberOfGuests, ... }
  ↓
Renderiza InvitationExperience con esos datos
  ↓
Todas las 5 escenas personalizadas con el nombre
```

### RSVP Flow

```
RSVPForm → onClick "Confirmar"
  ↓
POST /api/rsvp/[guestId]
  ↓
submitRSVP() en lib/rsvp.ts
  ↓
Crea/actualiza registro en BD
  ↓
Retorna éxito
  ↓
Muestra confirmación: "¡Excelente! Kimberly estará encantada..."
```

### Panel Admin

```
/admin (página protegida por contraseña)
  ↓
Si no autenticado: login form
  ↓
Si autenticado:
  - GET /api/guests → Listar todos
  - GET /api/guests/stats → Estadísticas
  ↓
Acciones disponibles:
  - POST /api/guests → Crear
  - PUT /api/guests/[id] → Editar
  - DELETE /api/guests/[id] → Eliminar
  ↓
Generar enlaces y QRs automáticamente
```

---

## ⚙️ Configuración

### `.env.local` (Local)

```env
DATABASE_URL=postgresql://...        # Conexión BD
ADMIN_PASSWORD=contraseña_simple     # Contraseña admin
NEXT_PUBLIC_ADMIN_PASSWORD=...       # Misma (visible en cliente)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### `data/eventConfig.ts` (Evento)

```typescript
// ÚNICO LUGAR donde cambiar:
// - Nombre, edad celebrante
// - Fecha y hora
// - Ubicación
// - Dress code
// - Información adicional
```

---

## 🎬 Animaciones

Todas las presets en `lib/animations.ts`:

- `fadeInUp`, `fadeInDown`, `fadeIn`
- `scaleIn`, `slideInRight`, `slideInLeft`
- `letterOpen`, `typeWriter`
- `floatingAnimation`, `glowAnimation`
- `shimmerAnimation`, `rotateAnimation`
- `pulseAnimation`
- `containerStagger`, `itemStagger`
- `pageTransition`

Uso:

```tsx
<motion.div {...fadeInUp}>
  Contenido
</motion.div>
```

---

## 🎯 Archivos Clave a Recordar

| Archivo | Propósito |
|---------|-----------|
| `data/eventConfig.ts` | ⭐⭐⭐ CONFIGURACIÓN DEL EVENTO |
| `app/i/[guestSlug]/page.tsx` | Punto de entrada invitación |
| `components/invitation/InvitationExperience.tsx` | Orquestador de escenas |
| `app/admin/page.tsx` | Panel administrativo |
| `.env.local` | Variables de entorno |
| `prisma/schema.prisma` | Esquema BD |

---

## 🚀 Próximos Pasos

1. **Instalar**: `npm install`
2. **Configurar BD**: Render PostgreSQL
3. **Migrar**: `npm run db:migrate`
4. **Iniciar**: `npm run dev`
5. **Testear**: http://localhost:3000
6. **Panel Admin**: http://localhost:3000/admin
7. **Agregar invitados**: Panel Admin
8. **Compartir**: Copia los enlaces

---

## 📞 Ayuda Rápida

- **"¿Dónde cambio la fecha?"** → `data/eventConfig.ts`
- **"¿Cómo cambian contraseña admin?"** → `.env.local` + restart
- **"¿Probar en celular?"** → ngrok o en la misma red WiFi
- **"¿Error en BD?"** → `npm run db:migrate`
- **"¿Invitado no aparece?"** → Verifica en Panel Admin

---

**¡Toda la magia está en estos archivos!** ✨

