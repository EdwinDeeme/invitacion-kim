# 🗺️ Mapa Completo de Rutas y Endpoints

## 🌐 Páginas (Frontend Routes)

### Públicas
| Ruta | Descripción | Archivos |
|------|-------------|----------|
| `/` | Página de inicio principal | `app/page.tsx` |
| `/i/[guestSlug]` | ⭐ **INVITACIÓN PERSONALIZADA** | `app/i/[guestSlug]/page.tsx` |
| `/i/[guestSlug]/not-found` | Página de invitación no encontrada | `app/i/[guestSlug]/not-found.tsx` |

### Admin (Protegidas con Contraseña)
| Ruta | Descripción | Archivos |
|------|-------------|----------|
| `/admin` | 🔐 **PANEL ADMINISTRATIVO** | `app/admin/page.tsx` |
| `/admin/layout` | Layout del área admin | `app/admin/layout.tsx` |

---

## 🔌 API Endpoints

### 👥 Gestión de Invitados

#### GET `/api/guests/[slug]`
Obtiene un invitado específico por su slug (para mostrar invitación personalizada)

```bash
curl http://localhost:3000/api/guests/helen-andres
```

**Respuesta:**
```json
{
  "id": "uuid",
  "slug": "helen-andres",
  "name": "Helen y Andrés",
  "numberOfGuests": 2,
  "guestType": "pareja",
  "status": "pendiente"
}
```

---

#### GET `/api/guests/by-id/[id]`
Obtiene un invitado por ID (interno)

```bash
curl http://localhost:3000/api/guests/by-id/uuid-123 \
  -H "x-admin-password: contraseña_simple"
```

---

#### POST `/api/guests`
Crea un nuevo invitado (requiere contraseña admin)

```bash
curl -X POST http://localhost:3000/api/guests \
  -H "Content-Type: application/json" \
  -H "x-admin-password: contraseña_simple" \
  -d '{
    "name": "Juan García",
    "numberOfGuests": 1
  }'
```

**Respuesta:**
```json
{
  "id": "uuid",
  "slug": "juan-garcia",
  "name": "Juan García",
  "numberOfGuests": 1,
  "guestType": "individual",
  "status": "pendiente"
}
```

---

#### PUT `/api/guests/by-id/[id]`
Actualiza un invitado existente

```bash
curl -X PUT http://localhost:3000/api/guests/by-id/uuid-123 \
  -H "Content-Type: application/json" \
  -H "x-admin-password: contraseña_simple" \
  -d '{
    "name": "Juan Carlos García",
    "numberOfGuests": 2
  }'
```

---

#### DELETE `/api/guests/by-id/[id]`
Elimina un invitado

```bash
curl -X DELETE http://localhost:3000/api/guests/by-id/uuid-123 \
  -H "x-admin-password: contraseña_simple"
```

---

#### GET `/api/guests/stats`
Obtiene estadísticas de RSVP

```bash
curl http://localhost:3000/api/guests/stats
```

**Respuesta:**
```json
{
  "total": 25,
  "confirmed": 18,
  "pending": 5,
  "declined": 2,
  "totalGuests": 30
}
```

---

### 📝 Sistema RSVP

#### GET `/api/rsvp/[guestId]`
Obtiene el estado RSVP de un invitado

```bash
curl http://localhost:3000/api/rsvp/uuid-123
```

**Respuesta:**
```json
{
  "guestId": "uuid-123",
  "attending": true,
  "numberOfGuestsAttending": 2,
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

#### POST `/api/rsvp/[guestId]`
Confirma o declina asistencia (NO requiere autenticación)

```bash
curl -X POST http://localhost:3000/api/rsvp/uuid-123 \
  -H "Content-Type: application/json" \
  -d '{
    "attending": true,
    "numberOfGuestsAttending": 2
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "message": "RSVP confirmado"
}
```

---

## 🎯 Flujo de Uso

### Para Invitados (Público)

```
1. Invitado recibe enlace por WhatsApp
   ↓
2. Abre: https://site.com/i/helen-andres
   ↓
3. Ve 5 escenas cinematográficas
   ↓
4. Responde RSVP (confirmar/declinar)
   ↓
5. Sistema guarda en BD
```

### Para Administrador

```
1. Accede: https://site.com/admin (contraseña)
   ↓
2. Ve lista de invitados + estadísticas
   ↓
3. Puede:
   - Crear nuevo invitado
   - Editar invitado
   - Eliminar invitado
   - Copiar enlace de invitación
   - Ver RSVP en tiempo real
```

---

## 📱 URLs de Prueba (Localmente)

```bash
# Página de inicio
http://localhost:3000

# Panel Admin (contraseña: contraseña_simple)
http://localhost:3000/admin

# Invitación para "Juan García"
http://localhost:3000/i/juan-garcia

# API: Obtener estadísticas
http://localhost:3000/api/guests/stats

# Prisma Studio (para ver BD)
npm run db:studio
```

---

## 🔐 Autenticación

### Panel Admin
- **Ubicación:** Campo de contraseña en `/admin`
- **Contraseña:** `contraseña_simple` (en `.env.local`)
- **Método:** Header `Authorization: Bearer <password>`

### API Endpoints
- Endpoints GET públicos: NO necesitan autenticación
- Endpoints POST/PUT/DELETE: Necesitan header `Authorization: Bearer <password>`
- Sistema RSVP (POST): NO necesita autenticación (el invitado simplemente responde)

---

## 🚀 Despliegue URLs

Una vez deployado en **Vercel**:

```
Base URL: https://invitacion-kimberly.vercel.app

Panel Admin:
https://invitacion-kimberly.vercel.app/admin

Invitaciones:
https://invitacion-kimberly.vercel.app/i/[slug]
```

**Ejemplo con invitados reales:**
```
https://invitacion-kimberly.vercel.app/i/helen-andres
https://invitacion-kimberly.vercel.app/i/juan-garcia
https://invitacion-kimberly.vercel.app/i/familia-perez
```

---

## 📊 Estructura de Datos

### Tabla: Guest
```typescript
{
  id: string (UUID)
  slug: string (único, minúsculas con guiones)
  name: string (nombre del invitado)
  numberOfGuests: int (cuántas personas vendrán)
  guestType: "individual" | "pareja" | "familia" | "grupo"
  status: "pendiente" | "confirmado" | "declinado"
  createdAt: datetime
  updatedAt: datetime
}
```

### Tabla: RSVP
```typescript
{
  id: string (UUID)
  guestId: string (FK a Guest)
  attending: boolean (¿confirma asistencia?)
  numberOfGuestsAttending: int
  createdAt: datetime
  updatedAt: datetime
}
```

---

## ✅ Checklist de Verificación

Después de desplegar, verifica:

- [ ] Accedes a `/admin` sin errores
- [ ] Creas un invitado nuevo exitosamente
- [ ] Copia el enlace de invitación
- [ ] Abres el enlace en otro navegador/dispositivo
- [ ] Ves las 5 escenas cinematográficas completas
- [ ] Confirmas asistencia en RSVP
- [ ] Ves la confirmación en panel admin (actualiza estadísticas)
- [ ] Eliminas el invitado y urlse invalida (404)

---

## 🔍 Debugging

### Ver requests/response en tiempo real
1. Abre DevTools (F12)
2. Ve a pestaña "Network"
3. Haz una acción (confirmar RSVP, crear invitado)
4. Ve el request exacto y respuesta

### Ver logs del servidor
1. Terminal donde corre `npm run dev`
2. Busca logs con timestamp
3. Busca valores específicos (nombre, ID)

### Ver datos de la BD
```bash
npm run db:studio
# Se abre interfaz visual en http://localhost:5555
```

---

## 🚨 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| 404 Not Found | Slug incorrecto o invitado no existe | Verifica slug en admin, recrea si es necesario |
| 401 Unauthorized | Contraseña admin incorrecta | Verifica `.env.local` y reinicia servidor |
| 500 Internal Error | Problema con BD | Verifica DATABASE_URL, ejecuta migraciones |
| "Guest not found" | Slug no existe en BD | Crea nuevo invitado en admin |
| RSVP no se guarda | Problema de conectividad BD | Revisa logs, reinicia servidor |

---

**¡Ese es el mapa completo! 🗺️ Ahora tienes toda la información que necesitas para usar el sistema.** 🎉
