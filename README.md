# Acelya Klinik Psikoloji - React Site

This project is built with React + Vite and is configured for Vercel deployment.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

First deploy:

1. Import this GitHub repository into Vercel.
2. Keep default framework detection (`Vite`).
3. Keep default output directory (`dist`).
4. Deploy.

After that, each `git push` to `main` will trigger an automatic production deployment.

You can also deploy from CLI:


```bash
npm run deploy
```

Notes:
1. SPA routing is supported via [vercel.json](vercel.json).
2. For local production testing, run:

```bash
npm run build
npm run preview
```
2. Static asset base is configured to work from project subpaths on GitHub Pages.
