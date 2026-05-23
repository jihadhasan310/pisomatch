# PisoMatch — Guía de Deployment

## Requisitos

- Cuenta en [Supabase](https://supabase.com) (free tier)
- Cuenta en [Vercel](https://vercel.com) (free tier)
- Repositorio en GitHub, GitLab o Bitbucket

---

## Paso 1: Configurar Supabase

### Crear proyecto

1. Inicia sesión en [supabase.com](https://supabase.com)
2. Click "New Project"
3. Configuración recomendada:
   - **Name**: pisomatch
   - **Database Password**: genera una contraseña segura
   - **Region**: EU West (Frankfurt) — más cercano a España
4. Click "Create new project"
5. Espera ~2 minutos a que se inicialice

### Ejecutar schema

1. En el sidebar, click **SQL Editor**
2. Click "New query"
3. Copia y pega TODO el contenido de `supabase/schema.sql`
4. Click "Run" (o Ctrl+Enter)
5. Verifica que no hay errores en la consola

### Verificar tablas

En el sidebar, click **Table Editor**. Deberías ver:
- `users`
- `listings`
- `matches`
- `contacts`

### Verificar RLS

1. Click en cualquier tabla
2. En la pestaña "RLS", verifica que está **enabled**
3. Verifica que las políticas están listadas

### Configurar Auth

1. Sidebar > **Authentication** > **URL Configuration**
2. En "Site URL": `https://tu-dominio.vercel.app`
3. En "Redirect URLs", añade:
   - `https://tu-dominio.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (para desarrollo)

### Obtener credenciales

1. Sidebar > **Settings** > **API**
2. Anota:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGci...`
   - **service_role** key: `eyJhbGci...`

---

## Paso 2: Deploy en Vercel

### Opción A: Desde el Dashboard

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click **"Add New..." > "Project"**
3. Importa tu repositorio
4. Vercel detectará Next.js automáticamente
5. En **Environment Variables**, añade:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` |

6. Click **"Deploy"**
7. Espera ~1-2 minutos

### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (primera vez)
vercel

# Deploy a producción
vercel --prod
```

### Configurar dominio personalizado (opcional)

1. En Vercel: **Settings > Domains**
2. Añade tu dominio: `pisomatch.es`
3. Configura DNS:
   - Tipo: CNAME
   - Nombre: `@` o `www`
   - Valor: `cname.vercel-dns.com`
4. Espera propagación DNS (~5 min a 48h)
5. Vercel genera certificado SSL automáticamente

---

## Paso 3: Verificación post-deploy

### Checklist

- [ ] Landing page carga correctamente
- [ ] Registro funciona (crear usuario)
- [ ] Login funciona (iniciar sesión)
- [ ] Dashboard redirige a login si no autenticado
- [ ] Perfil se guarda correctamente
- [ ] Crear anuncio funciona
- [ ] Eliminar anuncio funciona
- [ ] Páginas SEO cargan (`/madrid-compartir-piso`)
- [ ] Contacto muestra botones de WhatsApp/Telegram/Email

### Verificar en Supabase

1. **Authentication > Users**: Verifica que los usuarios se crean
2. **Table Editor > users**: Verifica que los perfiles se guardan
3. **Table Editor > listings**: Verifica que los anuncios se crean

---

## Paso 4: Monitorización

### Vercel Analytics (gratis)

1. En Vercel Dashboard > **Analytics**
2. Activa Web Analytics
3. Monitoriza: page views, visitors, performance

### Supabase Dashboard

- **Auth**: Usuarios registrados, sesiones activas
- **Database**: Uso de storage, queries/segundo
- **Logs**: Errores de API, queries lentas

---

## Mantenimiento

### Actualizar dependencias

```bash
# Ver actualizaciones disponibles
npm outdated

# Actualizar
npm update

# Actualizar major versions (con cuidado)
npx npm-check-updates -u
npm install
```

### Backup de base de datos

Supabase hace backups automáticos diarios (free tier: 7 días).

Para backup manual:
1. Supabase Dashboard > **Settings > Database**
2. Click "Download backup"

### Escalar

| Límite Free Tier | Supabase | Vercel |
|-----------------|----------|--------|
| Base de datos | 500 MB | — |
| Storage | 1 GB | — |
| Auth users | Ilimitados | — |
| Bandwidth | 2 GB/mes | 100 GB/mes |
| Serverless | — | 100 GB-hrs |

Si necesitas más, upgrade a:
- Supabase Pro: $25/mes
- Vercel Pro: $20/mes
