# Milestones

History and status of every milestone of the portfolio site (`danifer1695/portfolioSite`, live at https://danifer.dev).
Read together with `CONTEXT.md` (architecture and working agreements), `AGENTS.md` and `STRUCTURE.md` (owner-written specs, which take precedence).

**Status legend:** ✅ done · 🟡 mostly done, with open items · ⏳ not started

| #   | Milestone                                                         | Status              | Main PRs                        |
| --- | ----------------------------------------------------------------- | ------------------- | ------------------------------- |
| M0  | Repo hygiene and guardrails                                       | ✅                  | #1                              |
| M1  | Walking skeleton deployed to Cloudflare (+ domain)                | ✅                  | #7                              |
| M2  | Design system and content model                                   | ✅                  | #8, #9 (COMMANDS.md)            |
| M3  | Working skeleton of the site's page layout                        | ✅                  | #10, #11, #16                   |
| M4  | Subway map (plan → data → static → interaction → polish)          | ✅ (with leftovers) | #17, #18, #20, #21, #22         |
| M5  | Line-page template (Professional / Academics / Technical)         | ✅                  | #23                             |
| M6  | Resume page (printable)                                           | ✅                  | #24, #25                        |
| M7  | Contact page, form and backend                                    | ✅                  | #26 (titled "m8-form-complete") |
| M8  | Localization EN/FR with next-intl                                 | 🟡                  | #28                             |
| M8e | SEO: sitemap, robots, link-preview image with language alternates | ⏳                  | —                               |

> The milestone list changed once. Originally (before M3) it was a generic portfolio plan (pages + SEO, contact API, security hardening, launch).
> On branch `m3/pages-and-seo` the owner rewrote `AGENTS.md` and added `STRUCTURE.md` (subway theme, EN/FR, new milestone list M3–M8). Everything from M3 on follows the **new** list.

---

## M0: Repo hygiene and guardrails ✅

- Node pinned with `.nvmrc` (22) and `engines` in the root `package.json`; `@types/node` kept on 22.
- Root scripts run across workspaces: `format`, `format:check`, `lint`, `typecheck`, `test`, `build` (`--workspaces --if-present`).
- A single root Prettier config, `.prettierignore` and `.editorconfig`.
- `.github/workflows/ci.yml`:
  - runs `npm ci` → format:check → lint → typecheck → test → build on every PR and push to `main`;
  - `permissions: contents: read`, actions pinned to commit SHAs, `persist-credentials: false`.
- A GitHub ruleset on `main`: PR required (0 approvals, since there's a single developer), status check `verify` required, no force pushes or deletions.
- Dependabot (npm weekly with a minor/patch group, plus GitHub Actions), secret scanning, push protection and CodeQL enabled.
- Lessons that came up: lockfile conflicts are resolved by **regenerating** the lockfile, never by hand (`git checkout origin/main -- package-lock.json && npm install`); always `git fetch` before using `origin/main`.

## M1: Walking skeleton on Cloudflare ✅

- Domain `danifer.dev` registered with Cloudflare Registrar:
  - account secured with 2FA;
  - DNSSEC on; Always Use HTTPS; minimum TLS 1.2; HSTS enabled last and gradually;
  - "no mail" SPF/DMARC records added (`v=spf1 -all`, `p=reject`). Resend's DKIM records were added in M7.
- **Single-origin topology:** Worker `portfolio-web` (static assets from `web/out`) on route `danifer.dev/*`, and Worker `portfolio-api` (Hono) on `danifer.dev/api/*`. The more specific route wins. Both have `workers_dev: false`.
- Proxied `AAAA 100::` records for `@` and `www`; a Redirect Rule sends `www` → apex (301).
- `.github/workflows/deploy.yml`: on push to `main`, builds and deploys the API then the web. It uses GitHub Environment `production` (only `main` may deploy) with a scoped Cloudflare API token, passed only to the deploy steps.
- `GET /api/health` returns `{ status: 'ok' }`, with tests for it and for the 404 case.
- Incidents: the first deploy failed because of token permissions (fixed by creating the token from the "Edit Cloudflare Workers" template, then narrowing it), and `www` returned 523 until the redirect rule existed.

## M2: Design system and content model ✅

- Tailwind v4 tokens in `globals.css` via `@theme inline` (background, foreground, muted, border, accent, metroBlue, line colors), with dark mode through `prefers-color-scheme`.
- Primitives: `Button`, `ExternalLink` (enforces `target=_blank` + `rel="noopener noreferrer"`), `Container`; helpers `lib/cn.ts` (clsx + tailwind-merge) and `lib/styles.ts` (`focusRing`).
- Layout shell: `SkipLink`, `Header`, `Footer`, `<main id="main">`.
- The style-guide page was **skipped at the owner's request** (too complex for the benefit).
- `COMMANDS.md` added to the repo (#9): the owner's command reference.

## M3: Working skeleton of the page layout ✅

- Content layer: `lines.ts` (structure of the 3 lines), `ui.ts` (all UI text, later converted to `messages/*.json`), `professional.ts`, `academic.ts`, `projects.ts`, `profile.ts`, `navigation.ts`, and `lib/format.ts`.
- Pages: home (legend + map placeholder), `/professional`, `/academics`, `/technical`, `/resume`, `/contact`, and a 404 page.
- Shared `LinePage` component fed by per-page **adapters** (data → generic `Stop`).
- Header: sticky (added in M5), roundel logo with initials, nav with line-colored dots, `NavLink` client component with `aria-current`.
- Fixes in #16: swapped `[month, year]` in `formatMonth`, wrong line passed on two pages, `textClass` narrowed to a union, and several silent Tailwind typos.
- SEO files (sitemap, robots, OG image) were **deferred to after M8** (now M8e).

## M4: Subway map ✅ (with leftovers)

Built in phases following a plan approved by the owner (AGENTS.md required a plan first):

- **M4a (design):**
  - octilinear layout on a 12×16 grid (Harry Beck's principles);
  - top = recent was proposed, but the P line currently runs the other way, and the owner said layout will be reworked later;
  - **interchanges** modelled as two stops joined by a connector (not a shared station).
- **M4b:** `content/map.ts` (`LinePath`, `LineStop`, `LineCorner`, `LabelSide` with 8 compass directions, `interchanges`). Vitest added to `web/`, with contract tests in `map.test.ts` (slugs exist in the right content file, slugs unique map-wide, segments octilinear, points inside the grid, interchanges valid).
- **M4c:** `content/map-view.ts` (`getMapView()` view model) and components `SubwayMap`, `MapLine`, `MapStation`, `MapInterchange` as an SVG with a `viewBox` in grid units.
- **M4d:** `SubwayMap` is a client island with a single state `{ line, stop }`; everything else is derived. Hover and focus mute other lines (by recoloring to `muted`); the legend lives inside `SubwayMap` (`MapLegend`); invisible wider hit areas.
- **M4e:** rounded corners (`toRoundPathData`, quadratic Béziers, radius clamped) with tests, and label halos (`paint-order: stroke`).
- **Leftovers, never completed:**
  - **idle stops should be 10% smaller and line-colored**: the colors are done, but the `scale-90`/`scale-100` classes are still missing in `MapStation`. This was the owner's own requirement;
  - the interchange inner stroke is `stroke-foreground` (should be `stroke-background` for the outlined look); its `isMuted` prop is partly unused;
  - the owner chose to keep the dashed border around the map.

## M5: Line-page template ✅

- The owner **simplified the spec** (STRUCTURE.md): stops are collapsed by default and expand on click; arriving via `/page#slug` opens that stop and closes the others.
- Implemented with native **`<details name="stops">` / `<summary>`** (an exclusive accordion, works without JS). The node style follows `group-open:`.
- Only client code: `OpenStopFromId` (opens the `<details>` matching the URL hash; no React state).
- `components/line/`: `LinePage`, `LineTrack` (server), `StopCard`, `Gallery` (CSS scroll-snap row, `next/image` unoptimized), `types.ts`.
- `content/media.ts` (image type) and `media.test.ts` (every referenced image exists in `public/`, alt text non-empty). **No images have been added yet.**
- An earlier IntersectionObserver scroll design was abandoned (lint `react-hooks/set-state-in-effect`, plus complexity).
- `html { scroll-padding-top: 7rem }` keeps anchor jumps clear of the sticky header.

## M6: Resume page ✅

- `content/resume-view.ts` (`getResumeView()` view model; `entriesByLine: Record<LineId, …>`).
- `components/resume/`: `ResumeSheet` (an A4 "paper" with fixed light colors), `ResumeSection` (line badge + colored rule), `PrintButton` (client, `window.print()`).
- Print rules: `@page { size: A4; margin: 12mm }`, `print:hidden` on header/footer/skip link, light tokens forced in `@media print`, `[print-color-adjust:exact]` on colored accents, `break-inside-avoid` on entries.
- Known issue: in `globals.css`, the `<details>` animation and `interpolate-size` were placed inside `@media (prefers-color-scheme: dark)` instead of `(prefers-reduced-motion: no-preference)`, so they **only animate in dark mode**. `--muted-line` isn't overridden for print.

## M7: Contact page, form and backend ✅

- An **Email** field was added (the original spec had no way to reply).
- API `api/src/contact.ts` (Hono sub-app at `POST /api/contact`): body limit 16 KB → rate-limit binding `CONTACT_LIMITER` (5/60s per IP) → Zod validation → honeypot `website` (silent 200) → Resend API, sending a plain-text email with `reply_to` set to the visitor.
- Error **codes** are returned (`invalid`, `rate_limited`, `send_failed`, `too_large`); the frontend maps them to translated messages.
- Dev-only CORS controlled by the `ALLOWED_DEV_ORIGIN` env var (set only in `.dev.vars`).
- Config:
  - `vars.CONTACT_TO` in `api/wrangler.jsonc`;
  - secret `RESEND_API_KEY` (`wrangler secret put`), with `.dev.vars` locally;
  - Resend domain verified through DKIM records in Cloudflare DNS.
- Frontend: `ContactForm` client component (uncontrolled form + `FormData`, HTML validation matching the Zod limits, `aria-live` status). `NEXT_PUBLIC_API_BASE=http://localhost:8787` in `web/.env.development`; unset in production (same origin).
- Turnstile was left as an optional extra.

## M8: Localization EN/FR (next-intl) 🟡

Done (#28):

- `src/i18n/`:
  - `routings.ts` (`locales: ['en','fr']`, `defaultLocale: 'en'`, `Locale` type);
  - `request.ts`; `navigation.ts` (`Link`, `usePathname`, `getPathname`);
  - `locale.ts` (`initLocale(params)`: await → `hasLocale` → `notFound` → `setRequestLocale` → returns `Locale`);
  - `i18n.ts` (`Text`, `TextList`, `tr`, `trList`); `metadata.ts` (`alternatesFor(path, locale)` with `x-default`);
  - `messages.test.ts` (fr/en key parity).
- All routes moved under `app/[locale]/` with `generateStaticParams`. The root `app/layout.tsx` passes children through; root `app/page.tsx` is a language-choice fallback; root `app/not-found.tsx` is bilingual and renders its own `<html>`.
- `messages/en.json` and `fr.json`, plus `src/global.d.ts` (AppConfig augmentation for type-safe keys).
- Content getters take `locale` (`getProfessional(locale)` etc.); `getMapView(locale)`; `getResumeView(locale)` is async and uses `getTranslations`.
- `LocaleSwitcher` in the header; `Header`/`Footer`/`NavLink`/`MapLegend` use next-intl.
- Cloudflare Redirect Rules were planned: `/` → `/fr` when `Accept-Language` starts with `fr`, otherwise `/` → `/en` (302); old unprefixed URLs → `/en/...` (301). **Verify they exist** with `curl -sI`.

**Open items (must fix):**

1. `content/map-view.ts`: `href: \`${locale}…\``is missing the leading`/`, so it's a relative URL and breaks under `/en/`.
2. Dates are always English: the hard-coded `'en'` in `formatPeriod` calls in `app/[locale]/professional/page.tsx`, `academics/page.tsx`, and `const LOCALE = 'en'` in `resume-view.ts`. Add the test `formatMonth('2025-09','fr') === 'sept. 2025'`.
3. `app/[locale]/layout.tsx`: `generateMetadata` ignores the locale (untranslated title template and description); the layout duplicates `initLocale` logic.

**Open items (finish M8):**

- `fr.json` is still a copy of English; the `fr:` values in the content files are copies of `en:`.
- `profile.ts` text fields (`headline`, `intro`, `about`, `description`) aren't `Text` yet.
- `alternatesFor()` isn't used by any page's `generateMetadata`.
- Delete `content/ui.ts` once nothing imports it (check with `grep -r "content/ui" web/src`).
- The root page labels its link "French"; it should say "Français" (language names in their own language).
- Values identical in both languages can be plain strings instead of `{ en: x, fr: x }`.

## M8e: SEO (deferred since M3) ⏳

- `app/sitemap.ts` and `app/robots.ts` with `export const dynamic = 'force-static'`, built from content data, with both locales and `alternates.languages`. No `lastModified: new Date()` (in a static export that means build time, which is meaningless).
- Open Graph image (`opengraph-image.png`, 1200×630 + `.alt.txt`), `openGraph`/`twitter` metadata per locale.
- Check with LinkedIn Post Inspector and Lighthouse.

---

## Backlog and known issues (not tied to a milestone)

- **Map layout rework:** the owner explicitly deferred it ("can be fixed once the site is done"). The contract tests will validate any new layout. Watch for label collisions (e.g. the Shirabeyou label crossing the P line).
- **Gallery images:** none yet. Add WebP files (~1600 px wide, <300 KB) under `web/public/images/<line>/<slug>/` with width/height/alt in the content files; `media.test.ts` checks them.
- **Content typos** visible on the site and resume: "Remond" → Redmond; "the entire team as laid off" → "was"; placeholder `highlights: ['highlight 1', …]` in projects; and slug comments that all say `#readality`.
- **Dependabot:** a security update for `undici` (a transitive dependency of wrangler/miniflare) failed. Check Security → Dependabot alerts (the fix is likely `overrides` in the root `package.json`). Also confirm `dependabot.yml` has an `ignore` rule for `@types/node` major versions (Node is pinned to 22). Hold major upgrades (TypeScript 6/7, ESLint 10, Vitest 5) until Next.js and the Cloudflare plugin support them.
- **Optional:**
  - Cloudflare Turnstile on the contact form if spam gets through;
  - a lighter dark-mode `--muted` for better contrast;
  - rename the line color tokens to match the ids (`line-p` is now the "W" line, `line-t` the "P" line).
