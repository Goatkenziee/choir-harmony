# Children's Choir App – Build Plan

## Goal
Build a beautiful, user-friendly app to track choir member tasks, attendance, progress, and practice assignments with an engaging UI designed for young users and parents.

## Stack
- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** TailwindCSS 3 + Shadcn/ui (pre-built accessible components)
- **State:** Zustand (lightweight client state)
- **Data:** Local storage + localStorage for persistence (no backend initially)
- **Deploy:** Vercel
- **Icons:** Lucide React

## File Tree
- `app/layout.tsx` — root layout with navigation
- `app/globals.css` — TailwindCSS + global styles
- `app/page.tsx` — dashboard landing page with choir overview
- `app/members/page.tsx` — choir member list + management
- `app/members/[id]/page.tsx` — individual member profile & task tracking
- `app/tasks/page.tsx` — all assigned tasks & chores view
- `app/practice/page.tsx` — practice schedule & progress
- `components/MemberCard.tsx` — member card component
- `components/TaskCard.tsx` — task/chore card component
- `components/ProgressBar.tsx` — visual progress indicator
- `components/Navigation.tsx` — top nav bar
- `lib/store.ts` — Zustand store (members, tasks, progress)
- `lib/types.ts` — TypeScript interfaces
- `package.json` — dependencies
- `tsconfig.json` — TypeScript config
- `tailwind.config.ts` — Tailwind config
- `postcss.config.js` — PostCSS config
- `next.config.mjs` — Next.js config

## Data / API
None initially — all data stored in localStorage. Can be extended with a backend API later.

## Open Questions (Defaults Selected)
- **Choir size?** Assuming 20–50 members. System scales.
- **Task types?** Attendance, practice, solos, sections, behavior. Defaulting to generic task system.
- **User roles?** Choir director + member parents. Defaulting to single-role UI (can expand).
- **Theme?** Bright, colorful, kid-friendly with a music theme. Using purples, music notes.
