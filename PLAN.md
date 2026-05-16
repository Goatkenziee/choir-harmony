# Children's Choir App — PLAN

## Goal
Build a beautiful, kid-friendly app to track choir chores, manage members, assignments, and engagement with a colorful, intuitive UI.

## Stack
- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** TailwindCSS 3 + custom color palette (vibrant, kid-friendly)
- **State:** Zustand (lightweight state management)
- **Database:** localStorage (client-side persistence) + optional Supabase later
- **Icons:** lucide-react (clean, simple icons)
- **Deploy:** Vercel

## File Tree
- `package.json` — dependencies (Next.js, React, TailwindCSS, Zustand, lucide-react)
- `tsconfig.json` — TypeScript config
- `tailwind.config.ts` — TailwindCSS config with custom color palette
- `postcss.config.js` — PostCSS for Tailwind
- `next.config.mjs` — Next.js config
- `app/layout.tsx` — root layout with header + nav
- `app/globals.css` — global styles + Tailwind directives
- `app/page.tsx` — dashboard/home page
- `app/chores/page.tsx` — chores list & assignment page
- `app/members/page.tsx` — choir members directory
- `app/leaderboard/page.tsx` — gamified leaderboard (points for completed chores)
- `app/settings/page.tsx` — app settings & theme toggle
- `components/ChoreCard.tsx` — individual chore card component
- `components/MemberCard.tsx` — individual member card component
- `components/Header.tsx` — app header with logo
- `components/Navigation.tsx` — bottom/side navigation
- `store/choirStore.ts` — Zustand store (members, chores, assignments, points)
- `types/index.ts` — TypeScript interfaces (Member, Chore, Assignment, etc.)
- `lib/utils.ts` — utility functions
- `README.md` — project documentation (LAST)

## Data / API
- **localStorage:** persist members, chores, assignments, points
- **No external APIs required initially** — pure client-side app
- **Optional future:** Supabase for multi-device sync, real-time updates

## Open Questions & Defaults
1. **Color palette?** → Using vibrant, kid-friendly colors: purple, pink, teal, yellow, orange (animated accent colors)
2. **Member management?** → Admin can add/edit/remove choir members; each gets a profile with points
3. **Chore types?** → Sing warm-ups, learn music, attend practice, help setup, lead section, etc.
4. **Gamification?** → Points per chore completion → leaderboard → visual badges/stars
5. **Dark mode?** → Yes, toggle in settings, persists to localStorage

## Success Criteria
✓ Dashboard with quick-add chore/member buttons
✓ Chores page: list all chores, assign to members, mark complete
✓ Members page: directory with photos, roles, points
✓ Leaderboard: top performers with visual rewards
✓ Beautiful, kid-friendly UI with smooth animations
✓ Mobile-responsive design
✓ Data persists across sessions
