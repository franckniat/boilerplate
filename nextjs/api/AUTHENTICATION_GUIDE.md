# Authentication Guide

This project supports two auth patterns:

- Session cookie (server-first, Next.js internal pages protection)
- Bearer token (client-first, external API consumption)

Both can coexist.

## 1) Current architecture

### Session cookie flow

- Token creation and verification: `lib/encode.ts`
- Cookie lifecycle: `lib/auth.ts`
- Route protection: `proxy.ts`
- Server-side guard for user data: `lib/user.ts`

Cookie name: `session`

JWT algorithm: `HS256`

### Bearer token flow

- HTTP client: `lib/api-client.ts`
- Auth hooks: `hooks/use-auth.ts`
- User hooks: `hooks/use-users.ts`

Token storage: `localStorage` key `auth_token`

## 2) Why the JWSInvalid error happened

Error seen:

- Failed to verify session: JWSInvalid: Invalid Compact JWS

Typical causes:

- Cookie `session` exists but does not contain a JWT compact format
- `SESSION_SECRET` missing or not consistent across environments
- Old cookie value from previous auth implementation

## 3) Fixes applied

### Robust JWT verification

In `lib/encode.ts`:

- returns `null` when token is empty
- returns `null` when token is not compact JWT format
- returns `null` when secret is missing
- avoids noisy stack traces for expected invalid tokens

### Safer proxy cookie read

In `proxy.ts`:

- reads cookie from `req.cookies` directly

### Session refresh consistency

In `lib/auth.ts`:

- `updateSession` now re-signs a fresh JWT instead of only extending cookie expiration
- cookie `secure` is enabled only in production (`NODE_ENV === 'production'`)

### Stronger server guard

In `lib/user.ts`:

- explicit runtime check on `session.userId` type

## 4) Required environment variables

Add in `.env.local`:

```bash
SESSION_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Notes:

- For internal Next.js API routes, you can keep `NEXT_PUBLIC_API_URL` empty and rely on `/api`.
- `SESSION_SECRET` must be stable and identical for every runtime instance that needs to verify sessions.

## 5) Internal API vs external API

### Internal API (Next.js route handlers)

- Use relative endpoints (`/api/...`)
- Session cookie is ideal for SSR/page protection

### External API

- Use `NEXT_PUBLIC_API_URL`
- Bearer token via `api-client` and React Query hooks

## 6) Recommended strategy by use case

- If you build a dashboard with protected Next.js pages: keep session cookie guard (`proxy.ts` + `verifySession`).
- If you build a SPA-style client against external backend: rely on bearer token hooks, and keep session guard only if you also protect Next.js pages.

## 7) Troubleshooting checklist

If you still see invalid session errors:

1. Clear browser cookies for this domain.
2. Ensure `SESSION_SECRET` is set.
3. Restart dev server after env changes.
4. Verify no legacy code writes non-JWT value to `session` cookie.
5. If switching auth provider, rotate cookie name to avoid collisions.

## 8) Security notes

- Keep `SESSION_SECRET` out of source control.
- Use `secure` cookies in production only.
- Keep `httpOnly` and `sameSite=lax` for session cookie.
- Do not expose session JWT to client-side JavaScript.

## 9) Next hardening steps (optional)

- Add CSRF protection for state-changing server actions.
- Add refresh-token rotation if external API supports it.
- Add auth integration tests for `proxy.ts`, `lib/encode.ts`, and `lib/auth.ts`.
