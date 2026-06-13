# FairSplit

Split restaurant bills fairly — upload a receipt, assign items to people, and instantly see exactly what everyone owes.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- React Router (HashRouter, for zero-config static hosting)
- jsPDF for PDF export
- lucide-react icons
- Local Storage for persistence (no backend required)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The build output is written to `dist/`.

## Deploying

This project is pre-configured for zero-config deployment:

- **Vercel**: import the repo — Vercel auto-detects the Vite project (`npm run build`, output `dist`).
- **GitHub Pages**: build the project, then publish the `dist/` folder (e.g. with `gh-pages` or a GitHub Action). The app uses `HashRouter` and a relative `base: './'` in `vite.config.js`, so it works from any subpath without extra configuration.
- **Netlify / any static host**: serve the `dist/` folder.

## Project structure

```
src/
  components/   Reusable UI building blocks (Button, ItemsTable steps, cards, etc.)
  pages/        Landing page and the multi-step app flow
  hooks/        useLocalStorage, useTheme, useBill (state), useToast
  utils/        Calculation helpers, sample/demo data, PDF export
```

## How it works (MVP notes)

- **Receipt OCR** is simulated. Uploading an image/PDF and clicking "Extract items" populates the sample line items from `src/utils/sampleData.js`. Swap this out for a real OCR/receipt-parsing API when ready.
- **All data lives in `localStorage`** under the key `fairsplit-bill`, so a reload won't lose progress. "Reset bill" clears it.
- **"Try Demo"** loads a fully pre-filled bill (items, friends, and assignments) so you can see the results screen immediately.
- **"Share link"** and amounts are simulated/client-side only — no server or accounts involved.
