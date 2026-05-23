# PisoMatch

> **Encuentra tu compañero de piso ideal**

PisoMatch es una plataforma SaaS de matching inteligente para encontrar compañeros de piso en España. Conecta personas según compatibilidad de estilo de vida, presupuesto y ciudad, con un sistema de ranking que prioriza usuarios premium y perfiles activos.

---

## Tabla de Contenidos

- [Demo](#demo)
- [Stack Tecnológico](#stack-tecnológico)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Configuración de Supabase](#configuración-de-supabase)
- [Variables de Entorno](#variables-de-entorno)
- [Desarrollo Local](#desarrollo-local)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Sistema de Matching](#sistema-de-matching)
- [Sistema Premium](#sistema-premium)
- [Base de Datos](#base-de-datos)
- [Seguridad](#seguridad)
- [SEO](#seo)
- [Deploy en Producción](#deploy-en-producción)
- [API y Rutas](#api-y-rutas)
- [Componentes](#componentes)
- [Guía de Contribución](#guía-de-contribución)
- [Licencia](#licencia)

---

## Demo

| Página | Ruta |
|--------|------|
| Landing | `/` |
| Login | `/login` |
| Registro | `/registro` |
| Dashboard | `/dashboard` |
| Perfil | `/dashboard/perfil` |
| Mis Anuncios | `/dashboard/mis-anuncios` |
| Nuevo Anuncio | `/dashboard/mis-anuncios/nuevo` |
| Contacto | `/dashboard/contacto/[userId]` |
| Madrid SEO | `/madrid-compartir-piso` |
| Barcelona SEO | `/barcelona-compartir-piso` |
| Valencia SEO | `/valencia-compartir-piso` |
| Sevilla SEO | `/sevilla-compartir-piso` |
| Privacidad | `/privacidad` |
| Términos | `/terminos` |

---

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS | 4.x |
| Auth | Supabase Auth | Latest |
| Base de datos | Supabase (PostgreSQL) | Latest |
| Storage | Supabase Storage | Latest |
| Hosting | Vercel | Free tier |

### ¿Por qué este stack?

- **Next.js App Router**: SSR/SSG híbrido, SEO nativo, layouts anidados
- **Supabase**: Auth + DB + Storage en un solo servicio gratuito
- **Tailwind CSS**: Diseño rápido, consistente y mobile-first
- **Vercel**: Deploy automático con cada push, free tier generoso
- **TypeScript**: Seguridad de tipos en toda la aplicación

---

## Características

### Core
- ✅ Landing page optimizada para conversión
- ✅ Sistema de autenticación completo (email/password)
- ✅ Perfil de usuario con preferencias detalladas
- ✅ Publicación de anuncios (ofrezco/busco habitación)
- ✅ Algoritmo de matching inteligente con scoring
- ✅ Sistema de ranking con premium boost
- ✅ Contacto directo (WhatsApp, Telegram, Email)
- ✅ Dashboard completo con CRUD

### SEO
- ✅ Páginas estáticas por ciudad
- ✅ Meta tags optimizados (Open Graph)
- ✅ URLs semánticas (`/madrid-compartir-piso`)
- ✅ Estructura HTML semántica

### Seguridad
- ✅ Row Level Security (RLS) en todas las tablas
- ✅ Middleware de autenticación
- ✅ Validación de inputs en formularios
- ✅ Sesiones seguras con cookies httpOnly

### UX/UI
- ✅ Diseño mobile-first
- ✅ UI minimalista blanco y negro
- ✅ Cards estilo Airbnb
- ✅ Sin animaciones (rendimiento)
- ✅ Responsive en todos los breakpoints

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTE                             │
│  Next.js App Router (React Server Components + Client)  │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    MIDDLEWARE                             │
│  Auth verification + Session refresh + Route protection  │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    SUPABASE                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │   Auth   │  │ Database │  │      Storage         │  │
│  │  (JWT)   │  │ (Postgres)│  │    (Imágenes)       │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│                      │                                   │
│              ┌───────┴───────┐                           │
│              │      RLS      │                           │
│              │  (Row Level   │                           │
│              │   Security)   │                           │
│              └───────────────┘                           │
└─────────────────────────────────────────────────────────┘
```

### Flujo de datos

1. Usuario accede a una ruta protegida
2. Middleware verifica sesión con Supabase Auth
3. Si no autenticado → redirect a `/login`
4. Si autenticado → Server Component carga datos con RLS
5. Matching se calcula server-side con el perfil del usuario
6. Rankings se ordenan y se renderizan como HTML

---

## Instalación

### Requisitos previos

- Node.js 18+ 
- npm 9+
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Cuenta en [Vercel](https://vercel.com) (gratis, para deploy)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <tu-repo-url>
cd pisomatch

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de Supabase

# 4. Ejecutar en desarrollo
npm run dev
```

---

## Configuración de Supabase

### 1. Crear proyecto

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto (región: EU West para España)
3. Espera a que se inicialice (~2 minutos)

### 2. Ejecutar schema

1. Ve a **SQL Editor** en el panel de Supabase
2. Copia el contenido completo de `supabase/schema.sql`
3. Ejecuta el script

Esto creará:
- Tabla `users` con campos de perfil
- Tabla `listings` para anuncios
- Tabla `matches` para scores calculados
- Tabla `contacts` para tracking de contactos
- Índices para rendimiento
- Políticas RLS para seguridad

### 3. Configurar Auth

1. Ve a **Authentication > URL Configuration**
2. Añade redirect URL: `http://localhost:3000/auth/callback`
3. Para producción añade: `https://tu-dominio.vercel.app/auth/callback`

### 4. Obtener credenciales

1. Ve a **Settings > API**
2. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública (anon) de Supabase | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (solo server-side) | ✅ |

> ⚠️ **Nunca** expongas `SUPABASE_SERVICE_ROLE_KEY` en el cliente. Solo se usa server-side.

---

## Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar build de producción localmente
npm start

# Linting
npm run lint
```

El servidor de desarrollo estará en [http://localhost:3000](http://localhost:3000)

---

## Estructura del Proyecto

```
pisomatch/
├── public/                          # Assets estáticos
├── supabase/
│   └── schema.sql                   # Schema completo de la DB
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Layout raíz (metadata, fuentes)
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css              # Tailwind imports
│   │   ├── login/
│   │   │   └── page.tsx             # Página de login
│   │   ├── registro/
│   │   │   └── page.tsx             # Página de registro
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts         # OAuth callback handler
│   │   ├── [city]/
│   │   │   └── page.tsx             # Páginas SEO por ciudad
│   │   ├── dashboard/
│   │   │   ├── layout.tsx           # Layout protegido del dashboard
│   │   │   ├── page.tsx             # Vista de matches (ranking)
│   │   │   ├── perfil/
│   │   │   │   └── page.tsx         # Editar perfil
│   │   │   ├── mis-anuncios/
│   │   │   │   ├── page.tsx         # Lista de anuncios propios
│   │   │   │   └── nuevo/
│   │   │   │       └── page.tsx     # Crear nuevo anuncio
│   │   │   └── contacto/
│   │   │       └── [userId]/
│   │   │           └── page.tsx     # Página de contacto
│   │   ├── privacidad/
│   │   │   └── page.tsx             # Política de privacidad
│   │   └── terminos/
│   │       └── page.tsx             # Términos de uso
│   ├── components/
│   │   ├── Navbar.tsx               # Navegación pública
│   │   ├── Footer.tsx               # Footer con links
│   │   ├── DashboardNav.tsx         # Navegación del dashboard
│   │   ├── ListingCard.tsx          # Card de anuncio con score
│   │   └── DeleteListingButton.tsx  # Botón eliminar con confirmación
│   ├── lib/
│   │   ├── types.ts                 # Interfaces TypeScript
│   │   ├── matching.ts             # Algoritmo de matching + ranking
│   │   └── supabase/
│   │       ├── client.ts            # Cliente browser (CSR)
│   │       ├── server.ts            # Cliente server (SSR)
│   │       └── middleware.ts        # Lógica de middleware auth
│   └── middleware.ts                # Next.js middleware entry
├── .env.local                       # Variables de entorno (no commitear)
├── next.config.ts                   # Configuración de Next.js
├── tailwind.config.ts               # Configuración de Tailwind
├── tsconfig.json                    # Configuración de TypeScript
└── package.json                     # Dependencias y scripts
```

---

## Sistema de Matching

### Algoritmo de Scoring

El sistema calcula un score de compatibilidad (0-100+) entre el usuario actual y cada anuncio:

```typescript
function calculateMatch(user: UserProfile, target: UserProfile): number {
  let score = 0;

  // Ciudad coincide: +40 puntos
  if (user.city === target.city) score += 40;

  // Presupuesto compatible: +30 puntos
  const budgetOk =
    target.budget_min <= user.budget_max && 
    target.budget_max >= user.budget_min;
  if (budgetOk) score += 30;

  // Mismo estilo de vida: +20 puntos
  if (user.lifestyle === target.lifestyle) score += 20;

  // Misma preferencia de fumar: +5 puntos
  if (user.smoking === target.smoking) score += 5;

  // Misma preferencia de mascotas: +5 puntos
  if (user.pets === target.pets) score += 5;

  return score; // Máximo base: 100
}
```

### Distribución de puntos

| Factor | Puntos | Peso |
|--------|--------|------|
| Misma ciudad | 40 | 40% |
| Presupuesto compatible | 30 | 30% |
| Mismo lifestyle | 20 | 20% |
| Misma pref. fumar | 5 | 5% |
| Misma pref. mascotas | 5 | 5% |
| **Total base** | **100** | **100%** |

### Bonificaciones adicionales

| Bonus | Puntos | Condición |
|-------|--------|-----------|
| Premium boost | +25 | Usuario del anuncio es premium |
| Actividad reciente | +10 | Activo en últimos 3 días |

### Score máximo posible

- Usuario free activo: 100 + 10 = **110**
- Usuario premium activo: 100 + 25 + 10 = **135**

### Sistema de Ranking Final

```typescript
function rankListings(user, listings) {
  return listings
    .map(listing => {
      let score = calculateMatch(user, listing.user);
      score = applyPremiumBoost(listing.user, score);
      
      // Bonus actividad reciente
      if (listing.user.last_active_days < 3) score += 10;
      
      return { ...listing, matchScore: score };
    })
    .sort((a, b) => {
      // En empates (diferencia < 10), premium va primero
      if (Math.abs(a.matchScore - b.matchScore) < 10) {
        if (a.user.premium && !b.user.premium) return -1;
        if (!a.user.premium && b.user.premium) return 1;
      }
      return b.matchScore - a.matchScore;
    });
}
```

---

## Sistema Premium

### Comparativa de planes

| Feature | Free | Premium (9€/mes) |
|---------|------|-------------------|
| Crear perfil | ✅ | ✅ |
| Publicar anuncios | ✅ | ✅ |
| Ver matches | ✅ | ✅ |
| Contactos/mes | 5 | Ilimitados |
| Boost en ranking | ❌ | +25 puntos |
| Prioridad en empates | ❌ | ✅ |
| Visibilidad extra | ❌ | Badge "Premium" |

### Cómo funciona el Premium Boost

1. **Score boost**: +25 puntos añadidos al score de compatibilidad
2. **Prioridad en empates**: Si dos anuncios tienen scores similares (diferencia < 10), el premium aparece primero
3. **Badge visual**: Los anuncios premium muestran una etiqueta negra "Premium"
4. **Contactos ilimitados**: Los usuarios free solo pueden contactar si el match es ≥ 50% o son premium

### Implementación (preparada para Stripe)

El campo `premium` en la tabla `users` es un booleano. Para integrar pagos:

1. Crear webhook de Stripe
2. Al confirmar pago → `UPDATE users SET premium = true WHERE id = ?`
3. Al cancelar suscripción → `UPDATE users SET premium = false WHERE id = ?`

---

## Base de Datos

### Diagrama ER

```
┌──────────────┐       ┌──────────────┐
│    users     │       │   listings   │
├──────────────┤       ├──────────────┤
│ id (PK, FK)  │──────<│ user_id (FK) │
│ email        │       │ id (PK)      │
│ name         │       │ type         │
│ city         │       │ city         │
│ budget_min   │       │ price        │
│ budget_max   │       │ description  │
│ lifestyle    │       │ images[]     │
│ smoking      │       │ preferences  │
│ pets         │       │ created_at   │
│ description  │       └──────────────┘
│ premium      │
│ last_active  │       ┌──────────────┐
│ created_at   │       │   matches    │
│              │──────<├──────────────┤
│              │       │ id (PK)      │
│              │       │ user_id (FK) │
│              │       │ target_id(FK)│
│              │       │ score        │
│              │       │ created_at   │
│              │       └──────────────┘
│              │
│              │       ┌──────────────┐
│              │       │   contacts   │
│              │──────<├──────────────┤
│              │       │ id (PK)      │
└──────────────┘       │ user_id (FK) │
                       │ target_id(FK)│
                       │ method       │
                       │ created_at   │
                       └──────────────┘
```

### Tablas

#### `users`
| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| id | UUID (PK) | auth.uid() | ID del usuario (referencia auth.users) |
| email | TEXT | — | Email del usuario |
| name | TEXT | '' | Nombre visible |
| city | TEXT | 'Madrid' | Ciudad actual |
| budget_min | INTEGER | 300 | Presupuesto mínimo (€/mes) |
| budget_max | INTEGER | 600 | Presupuesto máximo (€/mes) |
| lifestyle | TEXT | 'social' | quiet / social / party |
| smoking | BOOLEAN | false | ¿Fumador? |
| pets | BOOLEAN | false | ¿Tiene mascotas? |
| description | TEXT | '' | Bio del usuario |
| premium | BOOLEAN | false | ¿Es premium? |
| last_active | TIMESTAMPTZ | NOW() | Última actividad |
| created_at | TIMESTAMPTZ | NOW() | Fecha de registro |

#### `listings`
| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| id | UUID (PK) | gen_random_uuid() | ID del anuncio |
| user_id | UUID (FK) | — | Autor del anuncio |
| type | TEXT | — | 'ofrezco' o 'busco' |
| city | TEXT | — | Ciudad del anuncio |
| price | INTEGER | — | Precio mensual (€) |
| description | TEXT | '' | Descripción del anuncio |
| images | TEXT[] | '{}' | URLs de imágenes |
| preferences | TEXT | '' | Preferencias del compañero |
| created_at | TIMESTAMPTZ | NOW() | Fecha de publicación |

#### `matches`
| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| id | UUID (PK) | gen_random_uuid() | ID del match |
| user_id | UUID (FK) | — | Usuario que busca |
| target_user_id | UUID (FK) | — | Usuario del anuncio |
| score | INTEGER | 0 | Score calculado |
| created_at | TIMESTAMPTZ | NOW() | Fecha del cálculo |

#### `contacts`
| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| id | UUID (PK) | gen_random_uuid() | ID del contacto |
| user_id | UUID (FK) | — | Usuario que contacta |
| target_user_id | UUID (FK) | — | Usuario contactado |
| method | TEXT | 'view' | whatsapp / telegram / email / view |
| created_at | TIMESTAMPTZ | NOW() | Fecha del contacto |

### Índices

```sql
CREATE INDEX idx_listings_user_id ON listings(user_id);
CREATE INDEX idx_listings_city ON listings(city);
CREATE INDEX idx_listings_type ON listings(type);
CREATE INDEX idx_matches_user_id ON matches(user_id);
CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_premium ON users(premium);
```

---

## Seguridad

### Row Level Security (RLS)

Todas las tablas tienen RLS activado. Políticas implementadas:

| Tabla | Operación | Política |
|-------|-----------|----------|
| users | SELECT | Todos los autenticados pueden ver perfiles |
| users | INSERT | Solo puedes insertar tu propio perfil |
| users | UPDATE | Solo puedes editar tu propio perfil |
| listings | SELECT | Todos pueden ver (incluido anon para SEO) |
| listings | INSERT | Solo puedes crear con tu user_id |
| listings | UPDATE | Solo puedes editar tus anuncios |
| listings | DELETE | Solo puedes eliminar tus anuncios |
| matches | SELECT | Solo puedes ver tus propios matches |
| matches | INSERT | Solo puedes crear tus propios matches |
| contacts | SELECT | Solo puedes ver tus propios contactos |
| contacts | INSERT | Solo puedes crear tus propios contactos |

### Middleware de Autenticación

```typescript
// Rutas protegidas: /dashboard/*
// Si no hay sesión válida → redirect a /login
// Sesión se refresca automáticamente en cada request
```

### Validación de Inputs

- Todos los formularios validan client-side (required, minLength, type)
- Supabase valida server-side con CHECK constraints
- El campo `lifestyle` solo acepta: 'quiet', 'social', 'party'
- El campo `type` solo acepta: 'ofrezco', 'busco'

---

## SEO

### Páginas optimizadas por ciudad

| URL | Target keyword |
|-----|---------------|
| `/madrid-compartir-piso` | compartir piso en Madrid |
| `/barcelona-compartir-piso` | compartir piso en Barcelona |
| `/valencia-compartir-piso` | compartir piso en Valencia |
| `/sevilla-compartir-piso` | compartir piso en Sevilla |

### Meta tags implementados

```html
<title>Compartir piso en Madrid — PisoMatch</title>
<meta name="description" content="Encuentra compañeros de piso en Madrid..." />
<meta property="og:title" content="Compartir piso en Madrid — PisoMatch" />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
```

### Estrategia SEO

1. **URLs semánticas**: `/madrid-compartir-piso` en vez de `/city/madrid`
2. **Contenido dinámico**: Muestra anuncios reales y estadísticas
3. **HTML semántico**: h1, h2, h3 correctamente jerarquizados
4. **Metadata**: Open Graph para compartir en redes sociales
5. **Keywords globales**: "compartir piso en España", "compañero de piso"

---

## Deploy en Producción

### Vercel (recomendado)

```bash
# 1. Instalar Vercel CLI (opcional)
npm i -g vercel

# 2. Deploy
vercel

# O simplemente conecta tu repo en vercel.com
```

### Pasos en Vercel Dashboard

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click "New Project"
3. Importa tu repositorio de GitHub/GitLab
4. Añade las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click "Deploy"

### Configuración de dominio personalizado

1. En Vercel: Settings > Domains > Add
2. Configura DNS CNAME apuntando a `cname.vercel-dns.com`
3. Actualiza redirect URLs en Supabase Auth

### Checklist pre-producción

- [ ] Variables de entorno configuradas en Vercel
- [ ] Schema SQL ejecutado en Supabase
- [ ] Redirect URLs actualizadas en Supabase Auth
- [ ] RLS verificado (todas las tablas)
- [ ] Build exitoso (`npm run build`)
- [ ] Dominio configurado (opcional)

---

## API y Rutas

### Rutas públicas (sin auth)

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Static | Landing page |
| `/login` | Static | Formulario de login |
| `/registro` | Static | Formulario de registro |
| `/[city]` | Dynamic | Páginas SEO por ciudad |
| `/privacidad` | Static | Política de privacidad |
| `/terminos` | Static | Términos de uso |
| `/auth/callback` | Route Handler | Procesa OAuth callback |

### Rutas protegidas (requieren auth)

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/dashboard` | Dynamic SSR | Matches con ranking |
| `/dashboard/perfil` | Client | Editar perfil |
| `/dashboard/mis-anuncios` | Dynamic SSR | Lista de anuncios propios |
| `/dashboard/mis-anuncios/nuevo` | Client | Crear anuncio |
| `/dashboard/contacto/[userId]` | Dynamic SSR | Contactar usuario |

---

## Componentes

### `Navbar.tsx`
Navegación pública con menú hamburguesa en mobile. Links a: Cómo funciona, Precios, Login, Registro.

### `Footer.tsx`
Footer con 4 columnas: marca, ciudades, producto, legal.

### `DashboardNav.tsx`
Navegación del dashboard con tabs: Matches, Mis anuncios, Perfil. Incluye email del usuario y botón de logout.

### `ListingCard.tsx`
Card de anuncio estilo Airbnb. Muestra: tipo, ciudad, precio, descripción, datos del usuario, score de match, badge premium, y botón de contacto.

### `DeleteListingButton.tsx`
Botón de eliminar con confirmación en dos pasos para evitar borrados accidentales.

---

## Guía de Contribución

### Convenciones de código

- **TypeScript estricto**: No usar `any`
- **Componentes**: PascalCase (`ListingCard.tsx`)
- **Funciones**: camelCase (`calculateMatch`)
- **Archivos de ruta**: kebab-case (`mis-anuncios`)
- **Estilos**: Solo Tailwind CSS, no CSS custom
- **Imports**: Usar `@/` para paths absolutos

### Estructura de commits

```
feat: añadir filtro por barrio
fix: corregir cálculo de presupuesto compatible
docs: actualizar README con nuevas rutas
style: ajustar spacing en ListingCard
```

### Añadir una nueva ciudad

1. Añadir entrada en `cityData` en `src/app/[city]/page.tsx`
2. Añadir opción en el select de `src/app/dashboard/perfil/page.tsx`
3. Añadir opción en el select de `src/app/dashboard/mis-anuncios/nuevo/page.tsx`
4. Añadir link en `src/components/Footer.tsx`
5. Añadir card en la landing page `src/app/page.tsx`

### Añadir un nuevo factor de matching

1. Añadir campo a la interfaz `UserProfile` en `src/lib/types.ts`
2. Añadir lógica en `calculateMatch()` en `src/lib/matching.ts`
3. Añadir campo al formulario de perfil
4. Añadir columna en `supabase/schema.sql`
5. Ejecutar ALTER TABLE en Supabase

---

## Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| dev | `npm run dev` | Servidor de desarrollo (localhost:3000) |
| build | `npm run build` | Build de producción |
| start | `npm start` | Ejecutar build de producción |
| lint | `npm run lint` | Ejecutar ESLint |

---

## Roadmap futuro

- [ ] Integración de pagos con Stripe para Premium
- [ ] Upload de imágenes con Supabase Storage
- [ ] Filtros avanzados (barrio, fecha de entrada, duración)
- [ ] Notificaciones por email de nuevos matches
- [ ] Sistema de verificación de identidad
- [ ] Chat interno (opcional)
- [ ] App móvil con React Native
- [ ] Más ciudades (Málaga, Bilbao, Zaragoza)
- [ ] Sistema de reviews entre compañeros

---

## Licencia

MIT License — libre para uso personal y comercial.

---

Hecho con ❤️ para la comunidad de pisos compartidos en España.
