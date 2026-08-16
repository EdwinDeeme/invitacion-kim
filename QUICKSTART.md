# 🚀 FASE 2 COMPLETADA - GUÍA RÁPIDA DE PRÓXIMOS PASOS

## ✅ Lo Que Ya Está Hecho

Todo el código está listo:
- ✨ 5 escenas cinematográficas completamente funcionales
- 🎨 Efectos visuales animados (partículas, destellos, velas)
- 🎬 Animaciones Framer Motion profesionales
- 👤 Personalización automática por invitado
- 📝 Sistema RSVP integrado
- 🛠️ Panel administrativo completo
- 🔌 API routes necesarias

## 🚀 DENTRO DE TU PC: Próximos Pasos

## ✅ Flujo recomendado: Docker local

### PASO 1: Levantar todo con Docker (app + PostgreSQL)

```bash
cd ~/Personal\ Projects/invitacion-kimberly
docker compose up --build
```

Si quieres dejarlo en segundo plano:

```bash
docker compose up --build -d
```

### PASO 2: Abrir la app

- Inicio: http://localhost:3000
- Panel admin: http://localhost:3000/admin

### PASO 3: Ver logs o detener

```bash
docker compose logs -f web
docker compose down
```

## 🔁 Flujo alternativo: sin Docker

### PASO 1: Instalar dependencias (5 min)

```bash
cd ~/Personal\ Projects/invitacion-kimberly
npm install
```

### PASO 2: Configurar Base de Datos PostgreSQL (10 min)

**OPCIÓN A: Render Cloud (RECOMENDADO - Gratuito)**

1. Ve a https://render.com
2. Crea cuenta (si no tienes)
3. Crea una "PostgreSQL Database" nueva
4. Copia la connection string (DATABASE_URL)
5. Pega en `.env.local`:

```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

**OPCIÓN B: PostgreSQL Local**

Si tienes PostgreSQL instalado:

```bash
createdb invitacion_kimberly
# Luego en .env.local:
DATABASE_URL="postgresql://postgres:password@localhost:5432/invitacion_kimberly"
```

### PASO 3: Ejecutar Migraciones de BD (2 min)

```bash
npm run db:migrate
```

Esto creará las tablas automáticamente.

### PASO 4: Iniciar Servidor de Desarrollo (1 min)

```bash
npm run dev
```

Abre http://localhost:3000

### PASO 5: Probar Panel Admin

1. Ve a http://localhost:3000/admin
2. Ingresa contraseña: `contraseña_simple`
3. Crea un invitado de prueba:
   - Nombre: "Test User"
   - Personas: 1
   - Enviar

4. Copia el enlace generado
5. Abre en otra ventana/tab para ver la invitación

### PASO 6: Agregar Invitados Reales

En el Panel Admin:
1. ➕ Nuevo Invitado
2. Agregar todos tus invitados
3. Copiar/compartir enlaces por WhatsApp

**Ejemplo de invitados:**
```
Helen y Andrés (2 personas)
Laura (1 persona)
Familia García (4 personas)
Diego (1 persona)
Sofia y Juan (2 personas)
```

## 🔧 Configuración

### Cambiar Contraseña Admin

En `.env.local`:

```
ADMIN_PASSWORD="tu_nueva_contraseña"
NEXT_PUBLIC_ADMIN_PASSWORD="tu_nueva_contraseña"
```

Luego reinicia `npm run dev`

### Cambiar Evento (Fecha, Hora, Ubicación)

Todo está en un solo archivo: `data/eventConfig.ts`

Abre ese archivo y modifica lo que necesites. Los cambios se reflejan automáticamente en toda la app.

```typescript
export const eventConfig: EventConfig = {
  celebrant: {
    name: 'Kimberly Mora',
    age: 32, // ← cambiar si quieres
  },
  event: {
    date: '2026-09-13',    // ← YYYY-MM-DD
    time: '15:00',         // ← HH:mm (24h)
    location: 'Farfala Blu Barrio el Hoyon', // ← tu ubicación
    // ... más campos
  },
};
```

## 📱 Probar en Teléfono

### Opción 1: Acceso Local en Red

```bash
# Tu PC debe estar en la misma red que el teléfono
# En tu PC, obtén tu IP:
ipconfig getifaddr en0  # Mac
hostname -I            # Linux
ipconfig               # Windows

# Luego en teléfono:
# Ve a http://TU_IP:3000
```

### Opción 2: ngrok (Tunneling)

```bash
npm install -g ngrok
ngrok http 3000
# Usa la URL que te da ngrok para compartir
```

## 🎯 Checklist Antes de Deployment

- [ ] Base de datos configurada (Render)
- [ ] Contraseña admin configurada
- [ ] Evento configurado (fecha, hora, lugar)
- [ ] Invitados agregados en Panel Admin
- [ ] Probado en teléfono móvil
- [ ] RSVP funciona correctamente
- [ ] Comparte enlaces con invitados

## 🚀 Deployment (Cuando Estés Listo)

### En Vercel (Recomendado - Gratuito y Fácil)

```bash
npm install -g vercel
vercel
# Seguir instrucciones
```

Vercel se conectará a tu DB en Render automáticamente.

### Después del Deploy

1. Cambiar `NEXT_PUBLIC_APP_URL` a tu dominio de Vercel
2. Cambiar URLs de Maps/Waze si es necesario
3. Compartir enlace público de invitaciones

## 💡 Tips

1. **Prueba primero localmente** - No deployes hasta estar seguro
2. **Invitado de prueba** - Crea uno para probartodo ántes de invitar
3. **Si algo funciona mal** - Revisa console del navegador (F12)
4. **Contraseña admin segura** - Cambia "contraseña_simple" antes de deploy

## ❓ Problemas Comunes

### "Error: DATABASE_URL no configurada"
→ Verifica que `.env.local` tenga la URL correcta

### "Página en blanco / Error 404 en invitación"
→ Revisa que el invitado esté en la BD (Panel Admin)

### "Animaciones lentas en celular"
→ Es normal en dispositivos antiguos. Sirve sin animaciones igual

### "RSVP no se guarda"
→ Verifica BD en Render está funcionando

## 📞 Soporte

Si tienes problema:
1. Revisa la consola del navegador (F12)
2. Mira los logs en terminal (npm run dev)
3. Verifica `.env.local` está correcto
4. Intenta `npm run db:migrate` de nuevo

---

**¡Estás casi listo para el show! 🎉**

Todos los componentes funcionan. Solo necesitas:
1. Configurar BD
2. Agregar invitados
3. Compartir enlaces

¡A disfrutar la experiencia mágica!
