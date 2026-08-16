# ✅ Checklist Paso a Paso - Configuración Completa

## Fase 1: Preparación (5 minutos)

### 1.1 - Abre Terminal
```bash
# En la carpeta del proyecto
cd /home/edwin/Personal\ Projects/invitacion-kimberly
```
- [ ] Terminal lista

### 1.2 - Verifica Node.js
```bash
node --version  # Debe ser v18 o superior
npm --version   # Debe ser v9 o superior
```
- [ ] Node v18+
- [ ] NPM v9+

---

## Fase 2: Instalación de Dependencias (3 minutos)

### 2.1 - Ejecuta instalación automática
```bash
# Para Mac/Linux
bash setup.sh

# Para Windows
setup.bat
```

**O manual:**
```bash
npm install
npm run db:generate
```

- [ ] `npm install` completó sin errores
- [ ] `npm run db:generate` completó sin errores
- [ ] `node_modules/` existe y tiene archivos

---

## Fase 3: Configuración de Base de Datos (10 minutos)

### 3.1 - Crea `.env.local` (si no existe)

**Archivo ya debe existir**, pero verifica:
```bash
cat .env.local
```

Debe contener:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/invitacion-kimberly"
ADMIN_PASSWORD="contraseña_simple"
NEXT_PUBLIC_ADMIN_PASSWORD="contraseña_simple"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

- [ ] `.env.local` existe
- [ ] Tiene `DATABASE_URL`
- [ ] Tiene `ADMIN_PASSWORD`

### 3.2 - Elige proveedor de BD (Elige 1)

#### Opción A: PostgreSQL Local (Recomendado para desarrollo)

**En Mac (con Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
createdb invitacion-kimberly
```

**En Linux:**
```bash
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb invitacion-kimberly
```

**En Windows:**
- Descarga: https://www.postgresql.org/download/windows/
- Instala PostgreSQL 15
- Crea BD: `invitacion-kimberly`

**Luego, actualiza `.env.local`:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/invitacion-kimberly"
```

- [ ] PostgreSQL instalado
- [ ] Base de datos `invitacion-kimberly` creada
- [ ] `.env.local` actualizado con URL correcta

#### Opción B: PostgreSQL Online en Render (Más fácil)

1. Ve a https://render.com/
2. Crea cuenta (gratis)
3. Haz clic en "New +" → "PostgreSQL"
4. Nombre: `invitacion-kimberly-db`
5. Region: Selecciona más cercana (ej: Ohio USA, Frankfurt EU)
6. Blueprint: Deja en "Standard" (gratis)
7. Haz clic en "Create Database"
8. Espera 2-3 minutos a que se cree
9. Copia el "External Database URL"
10. Pega en `.env.local`:

```env
DATABASE_URL="postgresql://user:password@host.render.com:5432/dbname"
```

- [ ] Cuenta Render criada
- [ ] PostgreSQL creado en Render
- [ ] URL copiada a `.env.local`

### 3.3 - Ejecuta migraciones
```bash
npm run db:migrate
```

Verás mensaje: `✔ Successfully created 2 migrations`

- [ ] Migraciones ejecutadas exitosamente

---

## Fase 4: Inicio del Servidor (2 minutos)

### 4.1 - Inicia servidor de desarrollo
```bash
npm run dev
```

Deberías ver:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Environments: .env.local
```

- [ ] Servidor ejecutándose en puerto 3000
- [ ] Sin errores en terminal

---

## Fase 5: Prueba del Panel Admin (5 minutos)

### 5.1 - Abre panel admin
1. Abre navegador: http://localhost:3000/admin
2. Verás campo de contraseña
3. Ingresa: `contraseña_simple`
4. Haz clic en "Acceder"

- [ ] Panel admin abierto sin errores
- [ ] Ves tabla de invitados (vacía al inicio)

### 5.2 - Crea primer invitado de prueba

1. En el panel admin, llena el formulario:
   - **Nombre:** Helen y Andrés
   - **Número de Invitados:** 2
2. Haz clic en "Crear Invitado"
3. Deberías ver el invitado en la tabla

- [ ] Invitado creado exitosamente
- [ ] Aparece en tabla con slug: `helen-andres`

---

## Fase 6: Prueba de Invitación (5 minutos)

### 6.1 - Abre invitación personalizada

1. En el panel admin, verás enlace junto al invitado
2. O accede directamente: http://localhost:3000/i/helen-andres
3. Deberías ver:
   - ✨ Pantalla oscura elegante
   - 🕯️ Velas flotantes
   - 📝 Texto de bienvenida personalizado
   - ✉️ Botón "ABRIR CARTA"

- [ ] Invitación se abre sin errores
- [ ] Ves decoraciones (velas, partículas)
- [ ] Ves nombre personalizado

### 6.2 - Interactúa con las 5 escenas

1. Haz clic en "ABRIR CARTA"
   - [ ] Escena 1: Intro (oscuro, elegante)

2. Haz clic en botón de siguiente
   - [ ] Escena 2: Hogwarts Letter (sobre que se abre)

3. Espera o haz clic para continuar
   - [ ] Escena 3: Magic Wand (varita aparece)

4. Espera las revelaciones
   - [ ] Ves fecha, hora, ubicación

5. Haz clic en "Seleccionar Casa"
   - [ ] Escena 4: Sorting Hat (sombrerogira)
   - [ ] Se elige casa aleatoria (Gryffindor, Slytherin, etc)

6. Botón "Continuar"
   - [ ] Escena 5: Marauders Map (3 botones finales)

- [ ] Todas 5 escenas se reproducen
- [ ] Animaciones funcionan suavemente

### 6.3 - Responde RSVP

En Escena 5 (Marauders Map):
1. Haz clic en botón "📍 Responder RSVP"
2. Verás formulario
3. Selecciona: "Sí, iré" o "No puedo ir"
4. Si confirmas, selecciona número de personas
5. Haz clic en "Confirmar Asistencia"

- [ ] RSVP confirmado sin errores
- [ ] Mensaje de éxito aparece
- [ ] Al refrescar página, RSVP se mantiene

### 6.4 - Verifica en panel admin

1. Regresa a http://localhost:3000/admin
2. En tabla, junto a "Helen y Andrés" verás:
   - Estado: "confirmado"
   - Personas: "2"
3. En sección de estadísticas verás:
   - Total: 1
   - Confirmados: 1
   - Personas confirmadas: 2

- [ ] Panel admin actualiza RSVP automáticamente
- [ ] Estadísticas correctas

---

## Fase 7: Pruebas Adicionales (10 minutos)

### 7.1 - Prueba en móvil

1. Encuentra IP local de tu computadora:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. En teléfono, abre:
   ```
   http://[TU_IP_LOCAL]:3000/i/helen-andres
   ```

- [ ] Funciona en teléfono
- [ ] Animaciones suaves
- [ ] Responsive/adaptado

### 7.2 - Prueba en incógnito

```
1. Abre ventana incógnito (Ctrl+Shift+N)
2. Entra a: http://localhost:3000/i/helen-andres
3. Debe funcionar igual (sin efectos de cache)
```

- [ ] Funciona en modo incógnito

### 7.3 - Ver datos de BD con Prisma Studio

```bash
npm run db:studio
```

Se abrirá interfaz visual en http://localhost:5555

Verás:
- Tabla `Guest`: Helen y Andrés
- Tabla `RSVP`: Confirmación guardada

- [ ] Prisma Studio abre exitosamente
- [ ] Ves datos en tablas

---

## Fase 8: Agrega Más Invitados (5 minutos)

En panel admin, crea varios invitados para prueba:

```
1. Juan García (1 persona)
2. Familia Pérez (4 personas)
3. Sofia y Miguel (2 personas)
```

Genera URLs para cada uno:
```
/i/juan-garcia
/i/familia-perez
/i/sofia-y-miguel
```

- [ ] Múltiples invitados creados
- [ ] Cada uno con slug único
- [ ] Cada invitación personalizada

---

## Fase 9: Preparación para Despliegue (Después de todo lo anterior)

### 9.1 - Los invitados reales

Cuando esté listo, crea invitados REALES:

```bash
# Por ejemplo:
Kimberly Mora (NO - es sorpresa!)
Elena González (1)
Carlos Martínez (1)
... (resto de invitados)
```

### 9.2 - Cambia contraseña admin

En `.env.local`, cambia:
```env
ADMIN_PASSWORD="contraseña_super_secreta_123"
```

- [ ] Contraseña fuerte configurada

### 9.3 - Sube a Vercel

```bash
# Instala CLI de Vercel
npm i -g vercel

# Inicia despliegue
vercel
```

- [ ] Proyecto deployado en Vercel
- [ ] URL de producción obtenida

### 9.4 - Configura BD de producción

1. Ve a Render.com
2. Copia URL de BD de PRODUCCIÓN (diferente a desarrollo)
3. En Vercel → Environment Variables
4. Agrega: `DATABASE_URL` con la URL de producción

---

## ✅ Checklist Final de Verificación

### Desarrollo ✓
- [ ] Servidor ejecuta en `npm run dev`
- [ ] Panel admin accesible en `/admin`
- [ ] Invitación personalizada en `/i/[slug]`
- [ ] RSVP guarda datos en BD
- [ ] Estadísticas se actualizan

### Datos ✓
- [ ] Invitados creados exitosamente
- [ ] Slugs generados correctamente
- [ ] BD se conecta sin errores
- [ ] Prisma Studio funciona

### Estética ✓
- [ ] Tema Hogwarts/mágico visible
- [ ] Animaciones suaves
- [ ] Responsive en móvil
- [ ] Colores: dorado, oscuro, parchment

### Funcionalidad ✓
- [ ] 5 escenas completas
- [ ] Efectos (partículas, velas, destellos)
- [ ] RSVP funciona end-to-end
- [ ] Admin CRUD completo

---

## 🚀 Siipienso que Algo Falló

### No puedo instalar dependencias
```bash
# Limpia cache
npm cache clean --force

# Intenta de nuevo
npm install
```

### No puedo conectar a BD
```bash
# Verifica .env.local
cat .env.local

# Verifica que el servidor PostgreSQL está corriendo
# Luego reinicia dev server
```

### Panel admin no responde
```bash
# Detén servidor (Ctrl+C)
# Espera 5 segundos
# Reinicia: npm run dev
# Limpia cache navegador (Ctrl+Shift+Del)
```

---

## 🎉 ¡Listo!

Si completaste TODO el checklist, tu sistema está:
- ✅ 100% funcional
- ✅ Listo para producción
- ✅ Con datos de prueba
- ✅ Completamente documentado

**Próximo paso:** Agrega invitados reales y comparte URLs por WhatsApp

---

**Tiempo total estimado: 30-45 minutos en primera ejecución** ⏱️
