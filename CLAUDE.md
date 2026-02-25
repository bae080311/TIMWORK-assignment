# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

No test runner is configured in this project.

## Architecture

This project uses **Feature-Sliced Design (FSD)** with strict layer separation:

```
src/
  app/        # Router setup (App.tsx) and global styles
  pages/      # Route targets — draws/ and detail/
  widgets/    # Composite UI — draws/ (list) and drawing-detail/ (tabs)
  entities/   # Domain logic — drawing/ entity only
  features/   # (empty)
  shared/     # config/, lib/, types/, data/, ui/
```

**Layer import rules (FSD):** upper layers can import from lower layers only. `pages` → `widgets` → `entities` → `shared`. Never import upward.

**Path aliases** (configured in both `tsconfig.app.json` and `vite.config.ts`):
`@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`

## Data Flow

All data comes from a single static JSON file at `src/shared/data/metadata.json`.

1. Raw JSON types defined in `src/shared/types/metadata.ts`
2. `src/shared/config/index.ts` re-exports the loaded metadata
3. **Selectors** in `src/entities/drawing/model/` transform raw data into domain types:
   - `selectors.ts` → `getDrawingList()` for the list page
   - `detail.selectors.ts` → `getDrawingById(id)`, `buildHistory()`, `getOverlayImage()`
4. Components receive normalized data; no state management library is used

## Routing

Two routes in `App.tsx`:
- `/draws` → `DrawsPage` (list)
- `/draws/detail/:id` → `DetailPage` (detail, reads `:id` param)
- Default redirect to `/draws`

## Key Domain Concepts

- **Drawing** — a technical drawing with disciplines, revisions, and images
- **Discipline** (공종) — category like 건축, 구조, 공조설비 etc. Colors defined in `src/entities/drawing/const/DISCIPLINE_COLOR.ts`
- **Region** (구역) — subdivision within a discipline; can have its own revision history
- **Revision** — versioned update with date, description, and image filename
- Raw data has a `parent` field — the list only shows parent drawings (filtered in selector)

## Styling

- **Tailwind CSS v4** with custom brand color theme defined in `src/app/styles/index.css`
- **Pretendard Variable** font (Korean)
- Discipline-specific Tailwind color classes from `DISCIPLINE_COLOR.ts`
- Images are served from `src/shared/data/drawings/` (configured as Vite public dir); use `drawingImageUrl()` from `@shared/lib/image-url` to construct paths
