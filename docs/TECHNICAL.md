# PisoMatch — Documentación Técnica

## Índice

1. [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
2. [Flujo de Autenticación](#flujo-de-autenticación)
3. [Sistema de Matching — Detalle Técnico](#sistema-de-matching--detalle-técnico)
4. [Gestión de Estado](#gestión-de-estado)
5. [Patrones de Datos](#patrones-de-datos)
6. [Rendimiento](#rendimiento)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Arquitectura de la Aplicación

### Server Components vs Client Components

| Componente | Tipo | Razón |
|-----------|------|-------|
| Landing page | Server | SEO, no interactividad |
| Dashboard page | Server | Carga datos con auth |
| Mis anuncios | Server | Lista datos del servidor |
| Contacto | Server | Carga perfil del target |
| Login/Registro | Client | Formularios interactivos |
| Perfil | Client | Formulario con estado |
| Nuevo anuncio | Client | Formulario con estado |
| Navbar | Client | Menú hamburguesa toggle |
| DashboardNav | Client | Logout interactivo |
| DeleteButton | Client | Confirmación interactiva |

### Patrón de Supabase Client

La aplicación usa 3 clientes de Supabase según el contexto:

```
┌─────────────────────────────────────────────────┐
│ client.ts (Browser)                              │
│ - Usado en componentes "use client"              │
│ - createBrowserClient()                          │
│ - Maneja cookies automáticamente en el browser   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ server.ts (Server Components / Route Handlers)   │
│ - Usado en Server Components y API routes        │
│ - createServerClient() con cookieStore           │
│ - Lee/escribe cookies del request                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ middleware.ts (Edge Middleware)                   │
│ - Ejecuta en cada request                        │
│ - Refresca sesiones expiradas                    │
│ - Protege rutas /dashboard/*                     │
│ - createServerClient() con request cookies       │
└─────────────────────────────────────────────────┘
```

---

## Flujo de Autenticación

### Registro

```
Usuario → /registro → Formulario
  │
  ▼
supabase.auth.signUp({ email, password, data: { name } })
  │
  ▼
Supabase crea usuario en auth.users
  │
  ▼
Redirect → /dashboard/perfil (completar perfil)
  │
  ▼
Usuario rellena perfil → supabase.from("users").upsert(...)
  │
  ▼
Perfil guardado en public.users
```

### Login

```
Usuario → /login → Formulario
  │
  ▼
supabase.auth.signInWithPassword({ email, password })
  │
  ▼
Supabase devuelve JWT + refresh token (cookies)
  │
  ▼
Redirect → /dashboard
  │
  ▼
Middleware verifica sesión → permite acceso
```

### Logout

```
Usuario → Click "Salir"
  │
  ▼
supabase.auth.signOut()
  │
  ▼
Cookies eliminadas
  │
  ▼
Redirect → /
```

### Protección de rutas

```
Request → /dashboard/*
  │
  ▼
Middleware intercepta
  │
  ▼
supabase.auth.getUser()
  │
  ├─ user existe → NextResponse.next() (continuar)
  │
  └─ user null → redirect /login
```

---

## Sistema de Matching — Detalle Técnico

### Flujo completo del ranking

```
1. Usuario accede a /dashboard
2. Server Component obtiene perfil del usuario actual
3. Query: SELECT * FROM listings JOIN users ON listings.user_id = users.id
4. Para cada listing:
   a. calculateMatch(currentUser, listing.user) → score base
   b. applyPremiumBoost(listing.user.premium, score) → score + boost
   c. Bonus actividad: si last_active < 3 días → score + 10
5. Sort por score descendente (premium gana empates)
6. Render ListingCard con matchScore
```

### Complejidad algorítmica

- **calculateMatch**: O(1) — comparaciones directas
- **rankListings**: O(n log n) — sort de n listings
- **Total por request**: O(n log n) donde n = número de listings

### Escalabilidad

Para > 10,000 listings, considerar:
- Filtrar por ciudad en la query SQL (reduce n)
- Cachear scores con tabla `matches`
- Paginación server-side
- Índice compuesto en `listings(city, created_at)`

---

## Gestión de Estado

### Sin estado global

La aplicación no usa Redux, Zustand ni Context global. Cada página gestiona su propio estado:

- **Server Components**: Datos cargados directamente de Supabase
- **Client Components**: `useState` local para formularios
- **Revalidación**: `router.refresh()` tras mutaciones

### Patrón de formularios

```typescript
// 1. Estado local del formulario
const [form, setForm] = useState({ ... });

// 2. Loading state
const [loading, setLoading] = useState(false);

// 3. Error state
const [error, setError] = useState("");

// 4. Submit handler
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError("");
  
  const supabase = createClient();
  const { error } = await supabase.from("table").insert(form);
  
  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }
  
  router.push("/success");
}
```

---

## Patrones de Datos

### Upsert de perfil

El perfil usa `upsert` para manejar tanto creación como actualización:

```typescript
await supabase.from("users").upsert({
  id: user.id,        // PK — si existe, actualiza
  email: user.email,
  ...formData,
  last_active: new Date().toISOString(),
});
```

### Relaciones en queries

Para obtener listings con datos del usuario:

```typescript
const { data } = await supabase
  .from("listings")
  .select("*, user:users(*)")  // JOIN implícito
  .neq("user_id", currentUserId);
```

### Tracking de contactos

Cada vez que un usuario ve la página de contacto:

```typescript
await supabase.from("contacts").insert({
  user_id: currentUser.id,
  target_user_id: targetUserId,
  method: "view",
});
```

---

## Rendimiento

### Optimizaciones implementadas

1. **Server Components por defecto**: Menos JS enviado al cliente
2. **Dynamic rendering solo donde necesario**: Landing y auth son estáticas
3. **Índices en DB**: Queries rápidas por city, user_id, premium
4. **Sin animaciones**: Menos repaints del browser
5. **Tailwind CSS**: CSS mínimo, tree-shaking automático
6. **Next.js Image optimization**: Configurado para Supabase Storage

### Métricas objetivo

| Métrica | Objetivo | Cómo |
|---------|----------|------|
| LCP | < 2.5s | Server rendering |
| FID | < 100ms | Minimal client JS |
| CLS | < 0.1 | No lazy loading above fold |
| TTI | < 3.5s | Code splitting automático |

---

## Testing

### Ejecutar tests (cuando se implementen)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

### Áreas a testear

1. **`matching.ts`**: Unit tests para calculateMatch, applyPremiumBoost, rankListings
2. **Formularios**: Validación de inputs
3. **Auth flow**: Login, registro, logout, protección de rutas
4. **RLS**: Verificar que las políticas funcionan correctamente

### Test manual del matching

```typescript
// Ejemplo: usuario en Madrid, presupuesto 400-600, social, no fuma, no mascotas
const user = {
  city: "Madrid", budget_min: 400, budget_max: 600,
  lifestyle: "social", smoking: false, pets: false
};

// Target: Madrid, 300-500, social, no fuma, sí mascotas, premium
const target = {
  city: "Madrid", budget_min: 300, budget_max: 500,
  lifestyle: "social", smoking: false, pets: true, premium: true
};

// Score: 40 (ciudad) + 30 (presupuesto) + 20 (lifestyle) + 5 (smoking) + 0 (pets) = 95
// + 25 (premium) = 120
// + 10 (si activo) = 130
```

---

## Troubleshooting

### Error: "Invalid supabaseUrl"

**Causa**: Las variables de entorno no están configuradas correctamente.

**Solución**:
1. Verifica que `.env.local` tiene URLs válidas (no los placeholders)
2. La URL debe empezar con `https://`
3. Reinicia el servidor de desarrollo tras cambiar `.env.local`

### Error: "Row Level Security policy violation"

**Causa**: Intentando acceder a datos sin autenticación o sin permisos.

**Solución**:
1. Verifica que el usuario está autenticado
2. Verifica que el `user_id` en la operación coincide con `auth.uid()`
3. Revisa las políticas RLS en Supabase Dashboard

### Error: "relation 'users' does not exist"

**Causa**: El schema SQL no se ha ejecutado.

**Solución**:
1. Ve al SQL Editor de Supabase
2. Ejecuta el contenido completo de `supabase/schema.sql`

### El middleware redirige siempre a /login

**Causa**: La sesión no se está refrescando correctamente.

**Solución**:
1. Verifica que las cookies se están enviando
2. Comprueba que el `NEXT_PUBLIC_SUPABASE_URL` es correcto
3. Verifica en Supabase Dashboard que el usuario existe

### Los matches no aparecen

**Causa**: No hay listings de otros usuarios, o el perfil no está completo.

**Solución**:
1. Verifica que tu perfil está guardado en la tabla `users`
2. Crea listings con otro usuario para probar
3. Verifica que los listings tienen `user_id` válido con perfil asociado

### Build falla en Vercel

**Causa**: Variables de entorno no configuradas en Vercel.

**Solución**:
1. Ve a Vercel > Project Settings > Environment Variables
2. Añade las 3 variables de Supabase
3. Redeploy

---

## Contacto y Soporte

Para reportar bugs o sugerir features, abre un issue en el repositorio.
