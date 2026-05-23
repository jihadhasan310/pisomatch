# PisoMatch — Documentación de Base de Datos

## Proveedor

- **Supabase** (PostgreSQL 15+)
- **Región recomendada**: EU West (Frankfurt)
- **Schema**: `public`

---

## Diagrama Entidad-Relación

```
                    ┌─────────────────┐
                    │   auth.users    │
                    │   (Supabase)    │
                    └────────┬────────┘
                             │ 1:1
                             ▼
┌────────────┐      ┌─────────────────┐      ┌────────────┐
│  contacts  │◄────-│     users       │-────►│  matches   │
└────────────┘      └────────┬────────┘      └────────────┘
                             │ 1:N
                             ▼
                    ┌─────────────────┐
                    │    listings     │
                    └─────────────────┘
```

---

## Tabla: `users`

Almacena el perfil público de cada usuario registrado.

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'Madrid',
  budget_min INTEGER NOT NULL DEFAULT 300,
  budget_max INTEGER NOT NULL DEFAULT 600,
  lifestyle TEXT NOT NULL DEFAULT 'social'
    CHECK (lifestyle IN ('quiet', 'social', 'party')),
  smoking BOOLEAN NOT NULL DEFAULT false,
  pets BOOLEAN NOT NULL DEFAULT false,
  description TEXT DEFAULT '',
  premium BOOLEAN NOT NULL DEFAULT false,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Notas
- `id` referencia `auth.users(id)` — se elimina en cascada
- `lifestyle` tiene CHECK constraint: solo 'quiet', 'social', 'party'
- `premium` se gestiona manualmente (preparado para Stripe)
- `last_active` se actualiza en cada visita al dashboard

---

## Tabla: `listings`

Almacena los anuncios de habitaciones.

```sql
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('ofrezco', 'busco')),
  city TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  images TEXT[] DEFAULT '{}',
  preferences TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Notas
- `type`: 'ofrezco' (tengo habitación) o 'busco' (necesito habitación)
- `images`: Array de URLs de Supabase Storage
- `preferences`: Texto libre describiendo al compañero ideal
- Se elimina en cascada si el usuario se borra

---

## Tabla: `matches`

Almacena scores de compatibilidad calculados (cache opcional).

```sql
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, target_user_id)
);
```

### Notas
- Constraint UNIQUE evita duplicados
- Actualmente el score se calcula en tiempo real (server-side)
- Esta tabla está preparada para cachear scores en el futuro

---

## Tabla: `contacts`

Registra cada intento de contacto entre usuarios.

```sql
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  method TEXT NOT NULL DEFAULT 'view',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Notas
- `method`: 'view' (vio la página), 'whatsapp', 'telegram', 'email'
- Útil para limitar contactos en plan Free (5/mes)
- Útil para analytics de conversión

---

## Índices

```sql
-- Búsqueda de listings por usuario
CREATE INDEX idx_listings_user_id ON listings(user_id);

-- Filtro por ciudad (SEO pages, matching)
CREATE INDEX idx_listings_city ON listings(city);

-- Filtro por tipo de anuncio
CREATE INDEX idx_listings_type ON listings(type);

-- Matches del usuario
CREATE INDEX idx_matches_user_id ON matches(user_id);

-- Contactos del usuario
CREATE INDEX idx_contacts_user_id ON contacts(user_id);

-- Usuarios por ciudad (matching)
CREATE INDEX idx_users_city ON users(city);

-- Usuarios premium (ranking)
CREATE INDEX idx_users_premium ON users(premium);
```

---

## Row Level Security (RLS)

### Tabla `users`

| Operación | Política | Condición |
|-----------|----------|-----------|
| SELECT | Todos los autenticados | `true` (perfiles son públicos) |
| INSERT | Solo propio | `auth.uid() = id` |
| UPDATE | Solo propio | `auth.uid() = id` |

### Tabla `listings`

| Operación | Política | Condición |
|-----------|----------|-----------|
| SELECT (auth) | Todos los autenticados | `true` |
| SELECT (anon) | Público para SEO | `true` |
| INSERT | Solo propio | `auth.uid() = user_id` |
| UPDATE | Solo propio | `auth.uid() = user_id` |
| DELETE | Solo propio | `auth.uid() = user_id` |

### Tabla `matches`

| Operación | Política | Condición |
|-----------|----------|-----------|
| SELECT | Solo propios | `auth.uid() = user_id` |
| INSERT | Solo propios | `auth.uid() = user_id` |

### Tabla `contacts`

| Operación | Política | Condición |
|-----------|----------|-----------|
| SELECT | Solo propios | `auth.uid() = user_id` |
| INSERT | Solo propios | `auth.uid() = user_id` |

---

## Queries frecuentes

### Obtener perfil del usuario actual

```sql
SELECT * FROM users WHERE id = auth.uid();
```

### Obtener listings con datos del usuario

```sql
SELECT l.*, u.*
FROM listings l
JOIN users u ON l.user_id = u.id
WHERE l.user_id != auth.uid();
```

### Obtener listings por ciudad (SEO)

```sql
SELECT * FROM listings
WHERE city ILIKE 'Madrid'
ORDER BY created_at DESC
LIMIT 6;
```

### Contar contactos del mes (para límite Free)

```sql
SELECT COUNT(*) FROM contacts
WHERE user_id = auth.uid()
AND created_at >= date_trunc('month', NOW());
```

### Obtener mis anuncios

```sql
SELECT * FROM listings
WHERE user_id = auth.uid()
ORDER BY created_at DESC;
```

---

## Migraciones futuras

### Añadir campo de barrio

```sql
ALTER TABLE users ADD COLUMN neighborhood TEXT DEFAULT '';
ALTER TABLE listings ADD COLUMN neighborhood TEXT DEFAULT '';
CREATE INDEX idx_listings_neighborhood ON listings(neighborhood);
```

### Añadir fecha de disponibilidad

```sql
ALTER TABLE listings ADD COLUMN available_from DATE;
ALTER TABLE listings ADD COLUMN min_stay_months INTEGER DEFAULT 1;
```

### Añadir verificación de usuario

```sql
ALTER TABLE users ADD COLUMN verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN verified_at TIMESTAMP WITH TIME ZONE;
```
