# Acelya Klinik Psikoloji - React Site

This project is built with React + Vite and is configured for GitHub Pages deployment.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

Before first deploy:

1. Create a GitHub repository and push this project to it.
2. In GitHub repo settings, enable Pages and set Source to the `gh-pages` branch (if requested).

Then deploy with one command:

```bash
npm run deploy
```

Notes:

1. Routing uses hash URLs (`/#/yetiskin`) so direct page refresh works on GitHub Pages.
2. Static asset base is configured to work from project subpaths on GitHub Pages.
