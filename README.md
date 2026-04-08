# AP Learning Center

A Vite + React 19 + TypeScript + Tailwind CSS v4 site covering all 38 AP courses with exam schedules, score predictor, and study resources.

## Tech Stack

- React 19 + React Router v7
- Tailwind CSS v4 (`@tailwindcss/vite`) with `@theme` directive
- Framer Motion v12
- `date-fns` v4

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # production build (tsc + vite build)
npm run preview   # preview production build locally
```

## URL Structure

Courses are served at the root slug directly:

```
musaserver.org/AP-Physics-2
musaserver.org/AP-Environmental-Science
musaserver.org/AP-Calculus-AB
```

Shorthand aliases redirect to the canonical slug:

```
musaserver.org/apes  →  musaserver.org/AP-Environmental-Science
musaserver.org/apush →  musaserver.org/AP-US-History
```

All aliases are case-insensitive. See `src/data/slugAliases.ts` for the full map.

## Nginx Config

For client-side routing to work correctly, configure Nginx to fall back to `index.html`:

```nginx
server {
    listen 80;
    server_name musaserver.org;
    root /var/www/ap/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Content Updates (Markdown)

Unit content lives in `public/content/<slug>/unit-N.md` and is fetched at runtime — no rebuild required:

```
public/
  content/
    AP-Biology/
      unit-1.md
      unit-2.md
      ...
```

To update content: edit the relevant `.md` file on the server and refresh the browser.

## Attribution

Exam dates and course info sourced from College Board. Not affiliated with or endorsed by College Board.

© Musa Ali 2026

