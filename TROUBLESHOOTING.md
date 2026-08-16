# 🔧 Troubleshooting - Solución de Problemas

## ❌ Problemas Comunes y Soluciones

### 1. **"DATABASE_URL no configurada"**

**Síntoma:** Error al ejecutar `npm run db:migrate`

**Solución:**
```bash
# Asegúrate de que .env.local existe
ls -la .env.local

# Verifica que contiene:
cat .env.local
```

Debe tener:
```
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
```

---

### 2. **"Error: Cannot find module '@prisma/client'"**

**Síntoma:** Error cuando intentas iniciar `npm run dev`

**Solución:**
```bash
# Regenerar cliente Prisma
npm run db:generate

# Luego reinicia
npm run dev
```

---

### 3. **"Error en npm install"**

**Síntoma:** Falla al instalar dependencias

**Solución:**
```bash
# Limpiar cache
npm cache clean --force

# Intentar de nuevo
npm install

# Si sigue fallando, usa yarn (si tienes)
yarn install
```

---

### 4. **"Página en blanco al abrir invitación"**

**Síntoma:** Visitas `/i/helen-andres` y aparece página en blanco

**Solución:**

1. **Verifica que el invitado existe:**
   ```bash
   # Abre http://localhost:3000/admin
   # Debería aparecer en la tabla
   ```

2. **Verifica que la BD tiene datos:**
   ```bash
   npm run db:studio
   # Abre Prisma Studio
   # Vé a tabla "Guest"
   # Busca el slug "helen-andres"
   ```

3. **Revisa la consola del navegador:**
   - Abre DevTools (F12)
   - Ve a Consola
   - Busca errores rojos

---

### 5. **"Error 404 - Invitación no encontrada"**

**Síntoma:** Ves página con emoji ❌ y "Invitación no encontrada"

**Solución:**

1. Verifica la URL - debe ser: `/i/SLUG`
   - Slug correcto: "helen-andres" (minúsculas, con guiones)
   - Slug INCORRECTO: "Helen y Andrés" (espacios, mayúsculas)

2. Verifica que el invitado existe en Panel Admin

3. Recrear el invitado:
   - Elimina el invitado del Panel Admin
   - Vuelve a crearlo
   - Copia el nuevo enlace

---

### 6. **"RSVP no se guarda"**

**Síntoma:** Confirmas asistencia pero al refrescar aparece como pendiente

**Solución:**

1. Verifica que la BD está conectada:
   ```bash
   # Abre Prisma Studio
   npm run db:studio
   ```

2. Verifica que hay tabla RSVP con datos de la confirmación

3. Revisa la consola del servidor (terminal donde ejecutaste `npm run dev`)
   - Busca errores en rojo

4. Si aún no funciona:
   ```bash
   # Ejecuta migraciones de nuevo
   npm run db:migrate
   ```

---

### 7. **"Animaciones lentas en móvil"**

**Síntoma:** Las animaciones se ven pixeladas o lentas

**Solución (NORMAL):**
- Es comportamiento esperado en dispositivos antiguos o de bajo rendimiento
- Las animaciones son opcionales - la experiencia funciona igual sin ellas
- Verifica que está habilitada la opción `prefers-reduced-motion`

**Qué probar:**

1. Mejor conexión WiFi (no 3G)
2. Cierra otras apps en el teléfono
3. Actualiza navegador
4. Intenta en otro dispositivo

---

### 8. **"Panel Admin pide contraseña y no funciona"**

**Síntoma:** Contraseña no acepta ningún valor

**Solución:**

1. Verifica la contraseña en `.env.local`:
   ```bash
   cat .env.local | grep ADMIN_PASSWORD
   ```

2. Asegúrate de que coincidan:
   - `.env.local`: `ADMIN_PASSWORD="contraseña_simple"`
   - `.env.local`: `NEXT_PUBLIC_ADMIN_PASSWORD="contraseña_simple"`

3. **IMPORTANTE:** Después de cambiar `.env.local`:
   ```bash
   # Detén npm run dev (Ctrl+C)
   # Y reinicia:
   npm run dev
   ```

4. Limpia cache del navegador:
   - Abre DevTools (F12)
   - Haz click derecho en reload
   - Elige "Vaciar cache y recargar"

---

### 9. **"Error al crear invitado en Panel Admin"**

**Síntoma:** Haces clic en "Crear Invitado" y aparece error

**Solución:**

1. Verifica que completaste TODOS los campos:
   - Nombre: requerido
   - Número de invitados: debe ser ≥ 1

2. Revisa la consola del navegador (F12 → Consola)
   - Busca mensajes de error

3. Verifica que la BD está conectada:
   ```bash
   npm run db:studio
   ```

4. Si aún no funciona:
   ```bash
   # Reinicia el servidor
   npm run dev
   ```

---

### 10. **"Rutas API retornan error 500"**

**Síntoma:** Llamadas a API (RSVP, crear invitado) retornan error 500

**Solución:**

1. Revisa la terminal donde ejecutas `npm run dev`
   - Busca errores en rojo
   - Léelos cuidadosamente

2. Verifica la BD:
   ```bash
   npm run db:studio
   ```

3. Prueba la migración de nuevo:
   ```bash
   npm run db:migrate
   ```

4. Si aún persiste:
   ```bash
   # Reinstala todo
   rm -rf node_modules
   npm install
   npm run db:generate
   npm run db:migrate
   npm run dev
   ```

---

## 📋 Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] `.env.local` existe y tiene `DATABASE_URL`
- [ ] Ejecutaste `npm run db:migrate` exitosamente
- [ ] Ejecutaste `npm install` sin errores
- [ ] Reiniciaste `npm run dev` después de cambiar `.env`
- [ ] Probaste en modo incógnito (sin cache)
- [ ] Visitaste http://localhost:3000 (no localhost:80)
- [ ] Probaste en otra navegador
- [ ] Revisaste la consola del navegador (F12)
- [ ] Revisaste los logs de terminal

---

## 🆘 Si Nada Funciona

1. **Captura el error exacto** (pantalla, mensaje completo)
2. **Anota pasos para reproducir**
3. **Ejecuta comandos de debug:**
   ```bash
   # Estado de BD
   npm run db:studio
   
   # Ver logs detallados
   npm run dev 2>&1 | tee debug.log
   
   # Reinstalar limpio
   rm -rf node_modules .next
   npm install
   npm run db:migrate
   ```

---

## 💡 Tips Útiles

**Para limpiar todo y empezar de cero:**
```bash
# Detén npm run dev (Ctrl+C)

# Limpia cache
npm cache clean --force

# Elimina carpetas generadas
rm -rf node_modules .next

# Reinstala
npm install

# Regenera cliente Prisma
npm run db:generate

# Ejecuta migraciones
npm run db:migrate

# Inicia de nuevo
npm run dev
```

**Para ver los datos de la BD:**
```bash
npm run db:studio
```

Esto abre Prisma Studio - una interfaz visual para ver/editar datos de la BD.

---

## 📞 Últimos Recursos

- **Documentación Prisma:** https://www.prisma.io/docs
- **Documentación Next.js:** https://nextjs.org/docs
- **Framer Motion:** https://www.framer.com/motion
- **Tailwind CSS:** https://tailwindcss.com/docs

---

**¿Aún con problemas? Revisa los logs en detalle - generalmente te dicen exactamente qué está mal.** 🔍
