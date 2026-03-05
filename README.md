# Preet Sojitra Portfolio

Premium single-page portfolio + case-study project pages + recruiter-ready AI assistant.

Stack:

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui + Framer Motion
- next-themes + react-icons + lucide-react
- API routes for chat/contact/job-match
- Zod content validation + Vitest tests

## Setup in 3 minutes

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env.local
```

Set any values you need:

- `YOU_API_KEY` (optional; enables You.com AI responses)
- `RESEND_API_KEY` + `RESEND_FROM` (optional; enables contact email sending)
- `NEXT_PUBLIC_DEMO_ONLY=true` for static/demo-only mode

3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Quality commands

```bash
npm run format
npm run lint
npm run test
npm run build
npm run build:static
```

## Data source (single source of truth)

All portfolio content is centralized in:

- `src/content/preet.ts`

Everything renders from this file:

- profile, counters, links
- experiences, achievements, projects, skills, publications

## AI assistant behavior

Widget: **Ask Preet**

Tools implemented:

- `listProjects()`
- `getProject(slug)`
- `listExperience()`
- `getSkillsByCategory(category)`
- `jobMatch(jobDescriptionText)`

Behavior:

- Uses grounded local portfolio data
- Adds evidence references in responses
- Never invents unknown metrics; uses "Not in my portfolio data" where needed
- Demo-safe deterministic `jobMatch` when AI is unavailable

API routes:

- `POST /api/ask-preet`
- `POST /api/job-match`
- `POST /api/contact`

## Deploy to Vercel (recommended)

1. Import this repo in [Vercel](https://vercel.com/new)
2. Set environment variables in Vercel project settings:
   - `YOU_API_KEY` (optional)
   - `RESEND_API_KEY` (optional)
   - `RESEND_FROM` (optional)
3. Deploy

Vercel supports API routes + streaming chat out of the box.

## Optional GitHub Pages deploy (static export)

Included workflow:

- `.github/workflows/gh-pages.yml`

Behavior in GH Pages mode:

- Static export enabled via `STATIC_EXPORT=true`
- Demo mode enabled via `NEXT_PUBLIC_DEMO_ONLY=true`
- No live API backend required

Enable GitHub Pages in repository settings to use GitHub Actions deployment.

## Resume file

Put resume PDF at:

- `public/Preet-Sojitra-Resume.pdf`

If missing, `/resume` automatically shows a placeholder message.
