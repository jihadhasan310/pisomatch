# [P] Piso*Match*

> Encuentra tu compañero de piso ideal

Plataforma SaaS de matching inteligente para encontrar compañeros de piso en España. Conecta personas según compatibilidad de estilo de vida, presupuesto, preferencias y ciudad.

**Live:** https://pisomatch.vercel.app

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16 (App Router) + TypeScript |
| Estilos | Tailwind CSS 4 |
| Auth + DB + Storage | Supabase |
| Hosting | Vercel (free) |

---

## Setup rápido

```bash
# 1. Clonar
git clone https://github.com/jihadhasan310/pisomatch.git
cd pisomatch

# 2. Instalar
npm install

# 3. Configurar env
# Editar .env.local con tus credenciales de Supabase

# 4. Configurar DB (en Supabase SQL Editor, en orden):
#    → supabase/reset.sql    (limpia todo)
#    → supabase/schema.sql   (crea tablas + RLS)
#    → supabase/storage.sql  (crea bucket de imágenes)

# 5. Ejecutar
npm run dev
```

---

## Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica
SUPABASE_SERVICE_ROLE_KEY=tu_clave_secreta
```

---

## Features

- ✅ Landing page con SEO (Playfair Display + retro B&W)
- ✅ Auth completo (email/password, sin confirmación)
- ✅ Perfil con 15+ campos de preferencias
- ✅ Anuncios con upload de hasta 5 fotos
- ✅ Matching inteligente (scoring multi-factor)
- ✅ Ranking con premium boost (+25) + actividad reciente (+10)
- ✅ Filtros por ciudad, tipo, precio
- ✅ Página de detalle estilo Idealista (galería + info + contacto)
- ✅ Contacto directo: WhatsApp, Telegram, Email
- ✅ Páginas SEO por ciudad (/madrid-compartir-piso, etc.)
- ✅ Protección de perfil (no puedes publicar sin perfil)
- ✅ Row Level Security en todas las tablas
- ✅ Modo demo (funciona sin Supabase configurado)
- ✅ Mobile-first responsive
- ✅ Deploy en Vercel

---

## Algoritmo de matching

```
Ciudad coincide           → +30
Presupuesto compatible    → +20
Mismo lifestyle           → +15
Mismo nivel limpieza      → +5
Mismo horario sueño       → +5
Smoking coincide          → +5
Pets coincide             → +5
Work from home            → +3
Guests policy             → +2
Couples policy            → +2
Music policy              → +2
Shared meals              → +2
LGBTQ friendly            → +2
Vegan/vegetarian          → +2
─────────────────────────────
Max base                  = 102

Premium boost             → +25
Actividad reciente (<3d)  → +10
─────────────────────────────
Max total                 = 137
```

En empates (diferencia < 10 puntos), premium aparece primero.

---

## Base de datos

### Tabla `users` (perfil completo)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Referencia auth.users |
| email | TEXT | Email |
| name | TEXT | Nombre |
| age | INTEGER | Edad |
| city | TEXT | Ciudad |
| occupation | TEXT | Ocupación |
| description | TEXT | Bio |
| budget_min/max | INTEGER | Rango presupuesto €/mes |
| move_in_date | TEXT | Fecha entrada |
| min_stay_months | INTEGER | Estancia mínima |
| lifestyle | TEXT | quiet/social/party |
| clean_level | TEXT | relaxed/normal/strict |
| sleep_schedule | TEXT | early/normal/late |
| smoking | BOOLEAN | Fumador |
| pets | BOOLEAN | Mascotas |
| work_from_home | BOOLEAN | Teletrabajo |
| guests_ok | BOOLEAN | Invitados OK |
| couples_ok | BOOLEAN | Parejas OK |
| shared_meals | BOOLEAN | Comidas juntos |
| music_ok | BOOLEAN | Música en casa |
| lgbtq_friendly | BOOLEAN | LGBTQ+ friendly |
| vegan_vegetarian | BOOLEAN | Vegano/vegetariano |
| gender_pref | TEXT | any/male/female |
| age_min/max | INTEGER | Rango edad compañero |
| premium | BOOLEAN | Plan premium |
| last_active | TIMESTAMPTZ | Última actividad |

### Tabla `listings` (anuncios)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID anuncio |
| user_id | UUID (FK) | Autor |
| type | TEXT | ofrezco/busco |
| city | TEXT | Ciudad |
| price | INTEGER | €/mes |
| description | TEXT | Descripción |
| images | TEXT[] | URLs de fotos (max 5) |
| preferences | TEXT | Preferencias compañero |

### Tabla `matches` y `contacts`

Tracking de scores calculados y contactos realizados.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                          # Landing
│   ├── login/ & registro/                # Auth
│   ├── [city]/                           # SEO pages
│   ├── ventajas/                         # Features page
│   ├── privacidad/ & terminos/           # Legal
│   └── dashboard/
│       ├── page.tsx                      # Matches + filtros
│       ├── perfil/                       # Perfil (15+ campos)
│       ├── mis-anuncios/ + nuevo/        # CRUD anuncios
│       ├── anuncio/[id]/                 # Detalle (galería)
│       └── contacto/[userId]/            # Contacto directo
├── components/
│   ├── Logo.tsx                          # Logo component
│   ├── Navbar.tsx & Footer.tsx           # Layout público
│   ├── DashboardNav.tsx                  # Nav dashboard
│   ├── ListingCard.tsx                   # Card con cover
│   ├── ImageGallery.tsx                  # Galería de fotos
│   ├── MatchFilters.tsx                  # Filtros (pills)
│   ├── MatchResults.tsx                  # Wrapper client
│   └── DeleteListingButton.tsx           # Eliminar anuncio
└── lib/
    ├── types.ts                          # TypeScript types
    ├── matching.ts                       # Algoritmo scoring
    ├── mock-data.ts                      # Datos demo
    └── supabase/
        ├── client.ts                     # Browser client
        ├── server.ts                     # Server client
        └── middleware.ts                 # Auth middleware
```

---

## Scripts SQL (ejecutar en orden)

| # | Archivo | Qué hace |
|---|---------|----------|
| 1 | `supabase/reset.sql` | Borra todo (tablas + auth users) |
| 2 | `supabase/schema.sql` | Crea tablas + índices + RLS |
| 3 | `supabase/storage.sql` | Crea bucket de imágenes |

---

## Deploy en Vercel

```bash
npx vercel --prod
```

O conecta el repo en vercel.com. Variables de entorno necesarias:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## Configuración de Supabase

1. Crear proyecto en supabase.com (EU West)
2. Ejecutar los 3 SQLs en orden
3. Authentication → Providers → Email → **Confirm email OFF**
4. Authentication → URL Configuration → añadir redirect URL

---

## Roadmap

- [ ] Stripe para pagos Premium
- [ ] Notificaciones email (nuevos matches)
- [ ] Verificación de identidad
- [ ] Más ciudades (Málaga, Bilbao, Zaragoza)
- [ ] Sistema de reviews
- [ ] App móvil (React Native)

---

## Licencia

MIT
