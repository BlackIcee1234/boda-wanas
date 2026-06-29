# Invitación de Boda — Ailyn & Oswaldo

Invitación digital elegante y responsiva para la boda del 27 de noviembre de 2026.

## Características

- Diseño elegante, minimalista y responsivo
- Cuenta regresiva en tiempo real
- Información de ceremonia y recepción con Google Maps
- Galería de fotos (placeholders listos para reemplazar)
- RSVP con código de invitación y límite de acompañantes
- Mesa de regalos con datos bancarios
- Panel de administración para los novios
- Importación y exportación de invitados vía Excel

## Desarrollo local

```bash
npm install
cp .env.example .env
# Configura DATABASE_URL en .env
npx prisma db push
npm run db:seed
npm run dev
```

- Invitación: http://localhost:3000
- Panel admin: http://localhost:3000/admin (contraseña en `ADMIN_PASSWORD`)

## Códigos de prueba

| Código    | Invitado           | Máx. personas |
|-----------|--------------------|---------------|
| DEMO01    | Invitado de Prueba | 2             |
| FAMILIA01 | Familia Pérez      | 4             |
| AMIGOS01  | Carlos Rodríguez   | 1             |

## Importar invitados (Excel)

Columnas requeridas: `codigo`, `nombre`, `telefono`, `max_invitados`

## Variables de entorno

| Variable         | Descripción                          |
|------------------|--------------------------------------|
| DATABASE_URL     | PostgreSQL (Vercel Postgres / Neon)  |
| ADMIN_PASSWORD   | Contraseña del panel de novios       |
| ADMIN_SECRET     | Secreto JWT para sesión admin        |

## Deploy en Vercel

1. Conecta el repositorio en Vercel
2. Agrega Vercel Postgres desde el Marketplace
3. Configura `ADMIN_PASSWORD` y `ADMIN_SECRET`
4. Deploy automático en cada push
