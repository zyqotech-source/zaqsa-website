# ZAQSA

ZAQSA is a digital transformation consultancy website. The application is built with TanStack Start, React, TypeScript, Vite, and Nitro.

## Local development

Use Node.js 22 and npm 11.11.0:

```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 3000
```

Run the routing tests with `npm test`. Build the production Node server with `LOVABLE_NITRO_PRESET=node-server npm run build`.

## Production runtime

The root `Dockerfile` builds the app and runs the Nitro Node server on port 3000. The `/_health` endpoint is used for container readiness. `public/manus-routes.json` lists the site's page routes, including the dynamic service-detail route.
