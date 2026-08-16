# 🎭 Guía de Uso: Panel Administrativo

## Acceso al Panel

1. Ve a `https://tudominio.com/admin`
2. Ingresa la contraseña (la que configuraste en `.env.local`)
3. ¡Listo! Ya estás en el panel

## 📋 Gestión de Invitados

### Agregar Invitado

1. Haz clic en **"+ Agregar Invitado"**
2. Completa el formulario:
   - **Nombre:** El nombre o nombres de los invitados
     - Ejemplos: "Helen y Andrés", "Laura", "Familia García"
   - **Número de invitados:** Cuántas personas vienen
     - 1 → Individual
     - 2 → Pareja
     - 3-4 → Familia
     - 5+ → Grupo

3. Haz clic en **"Crear"**

Sistema generará automáticamente:
- ✅ URL personalizada → `/i/helen-andres`
- ✅ Código QR
- ✅ Estado RSVP (pendiente)

### Editar Invitado

1. Encuentra al invitado en la tabla
2. Haz clic en el ícono **✏️ Editar**
3. Modifica los datos
4. Guarda

### Eliminar Invitado

1. Encuentra al invitado en la tabla
2. Haz clic en el ícono **🗑️ Eliminar**
3. Confirma

> ⚠️ **Esto también elimina sus RSVPs**

### Ver Estado RSVP

En la tabla ves las columnas:

| Invitado | Personas | **Estado** | Enlace |
|----------|----------|-----------|--------|
| Helen y Andrés | 2 | 🔄 Pendiente | `/i/helen-andres` |
| Laura | 1 | ✅ Confirmado | `/i/laura` |
| Carlos | 4 | ❌ Declinado | `/i/carlos` |

## 🔗 Generar Enlace / QR

### Copiar Enlace

1. Haz clic en el botón **🔗** junto al invitado
2. Se copia automáticamente a tu portapapeles
3. Puedes compartir por WhatsApp, email, etc.

Ejemplo:
```
https://tudominio.com/i/helen-andres
```

### Descargar QR

1. Haz clic en el ícono **📋** (QR code)
2. Se descarga como PNG
3. Puedes:
   - Imprimirlo y darlo en persona
   - Compartirlo digitalmente
   - Agregarlo a invitaciones físicas

## 📊 Estadísticas

En la parte superior del panel ves:

- **Total de invitados:** Cuántas personas fueron invitadas
- **Confirmados:** Cuántos van a asistir
- **Pendientes:** Esperando respuesta
- **Declinados:** Que no pueden asistir
- **Total de personas:** Suma de todos los invitados

Ejemplo:
```
📊 Invitados: 15 | ✅ Confirmados: 8 | ⏳ Pendientes: 5 | ❌ Declinados: 2
```

## 🎯 Flujo Típico

1. **Preparar invitados:**
   - Lista a TODAS las personas que quieres invitar
   - Agrégalas al panel

2. **Generar enlaces/QRs:**
   - Copia los enlaces o descarga QRs
   - Comparte por WhatsApp/email

3. **Seguimiento:**
   - Chequea el panel periódicamente
   - Ve quién confirmó

4. **Recordatorios:**
   - Días antes, recuerda a pendientes
   - Panel te muestra exactamente quiénes no respondieron

## ✨ Experiencia del Invitado

Cuando alguien abre el enlace, ve:

1. **Escena 1:** Intro mágica personal
   - "Estimados Helen y Andrés..."
   - "Una correspondencia mágica ha llegado para ti..."

2. **Escena 2:** Carta de Hogwarts que se abre

3. **Escena 3:** Varita revela información
   - Fecha: Domingo, 13 de septiembre de 2026
   - Hora: 3:00 PM
   - Lugar: Farfala Blu Barrio el Hoyon

4. **Escena 4:** Sombrero Seleccionador
   - Se asigna aleatoriamente a una casa
   - Gryffindor 🦁, Slytherin 🐍, Ravenclaw 🦅, Hufflepuff 🦡

5. **Escena 5:** Mapa del Merodeador
   - Ver ubicación en Google Maps
   - **Confirmar asistencia** ← Importante
   - Ver información adicional

## 🔔 Confirmación de Asistencia

Cuando el invitado confirma:

- Su estado en el panel cambia a ✅ **Confirmado**
- Se guarda automáticamente en la BD
- Puedes ver cuántos van realmente a ir

El invitado verá:
```
¡Excelente! Kimberly estará encantada de verte. 🪄
```

## 🎁 Tips Útiles

### Para máximo impacto:

1. **Envía en WhatsApp:**
   - Dale más calidez que un email
   - Usa emoji: ✨📜🪄

   "¡Hola! 📜✨ Recibiste una invitación mágica. Ábrela:"
   (enlace aquí)

2. **Menciona que es sorpresa:**
   - "¡Es una sorpresa! No se lo comentes a Kimberly 🤫"
   - Cada invitación dice claramente que es sorpresa

3. **Da un poco de contexto:**
   - "Es una experiencia interactiva, así que tómate tu tiempo"
   - "Abre desde tu teléfono para la mejor experiencia"

4. **Recordatorios:**
   - Unos días antes: "¿Ya confirmaste? 🎉"
   - Recordar dress code: "Puedes ir con algo de Hogwarts 🪄"

## ⚙️ Troubleshooting

### Olvidé contraseña

En `invitacion-kimberly/.env.local`, bushc:

```
ADMIN_PASSWORD="tu_contraseña"
```

Puedes cambiarla aquí.

### No funcionan los enlaces/QRs

Verifica en `.env.local`:

```
NEXT_PUBLIC_APP_URL="https://tudominio.com"
```

Debe ser la URL correcta de tu app (no localhost).

### La BD no funciona

```bash
# Verifica conexión
npm run db:migrate

# Si hay error, revisa DATABASE_URL en .env.local
```

## 🚀 Próximas Funciones (Futura)

- 📨 Enviar emails automáticamente
- 🔔 Notificaciones de RSVPs
- 📋 Descargar lista de confirmados (Excel)
- 🎫 Generar boletos o tarjetas
- 📸 Galería mágica post-fiesta

---

**¡Diviértete organizando esta celebración mágica! 🪄✨**
