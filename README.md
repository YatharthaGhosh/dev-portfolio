# dev-portfolio

Portfolio of **Yathartha Ghosh**, AI engineer: RAG, multi-agent systems and production LLM features, with full-stack engineering behind them.

A dark, blue-themed single-page site built with React and Vite, with an interactive 3D hero, project case studies with screenshots and evaluation charts, and a contact form.

## Tech stack

| Purpose | Tool |
|---|---|
| UI | React 19 |
| Build / dev server | Vite |
| Animation | Motion (formerly Framer Motion) |
| 3D hero | Three.js + React Three Fiber (lazy-loaded) |
| Icons | Lucide React |
| Styling | Plain CSS with design tokens (`src/styles/global.css`) |

## Getting started

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build locally
```

## Editing content

All text, links, projects, experience and skills are in **`src/data/site.js`**.

Project screenshots live in `public/projects/` (WebP) and are listed in each project's `shots`. A project's `chart` draws a bar chart of its evaluation results.

## Contact form

The form sends submissions to [Formspree](https://formspree.io) (free tier).

1. Create a form on Formspree and copy its endpoint.
2. Copy `.env.example` to `.env.local` and set `VITE_CONTACT_ENDPOINT`.
3. On Vercel or Netlify, add the same variable in the project's environment settings.

Without an endpoint, the form opens the visitor's email app (if `site.email` is set). Otherwise it shows an error that points to LinkedIn.

## Project structure

```
src/
├── App.jsx                 # page layout: puts the sections in order
├── main.jsx                # entry point: mounts React
├── data/site.js            # ALL content and links
├── hooks/useActiveSection.js
├── styles/global.css       # design tokens, buttons, cards, reset
└── components/
    ├── Navbar, Experience, Skills, About, Contact, Footer, Backdrop (+ .css)
    ├── hero/               # Hero section + lazy-loaded 3D scene
    ├── projects/           # case studies, screenshot gallery, bar chart
    └── ui/                 # reusable pieces: Reveal, SpotlightCard, SectionHeading, icons
```

## Accessibility and performance

- Respects the OS "reduce motion" setting: CSS animations, Motion transforms and the 3D loop all stop.
- The 3D scene loads after the page renders, stops rendering when scrolled out of view, and uses fewer points on phones.
- Skip link, visible focus styles, semantic landmarks and labelled form fields.
