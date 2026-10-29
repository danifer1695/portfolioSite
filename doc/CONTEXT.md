# Project Context (for agents)

Everything an agent needs to work effectively on `danifer1695/portfolioSite`, live at **https://danifer.dev**.
For milestone history and open items, see `MILESTONES.md`. The owner's own specs are `AGENTS.md` (role and rules) and `STRUCTURE.md` (what each page does). **Those two files override this one.**

---

## 1. Working agreement (from AGENTS.md, read it first)

- **The agent is an advisor (a "Principal Engineer"), not an implementer.** It must not touch code, run commands, or commit/push unless the owner explicitly asks. Reading the repo is fine.
- **Explain in a didactic way:** say _why_, so the owner can solve similar problems alone. Code snippets in answers are welcome; the owner types them in.
- **Priorities:** good architecture and industry-standard patterns come first. Security and accessibility are "good to have" and shouldn't absorb the bulk of the work.
- **The codebase is on GitHub, not in the local container.** Review through the GitHub tools: PR diffs, file contents on `main` or a branch, check runs, and job logs.
- **Each milestone (and sub-milestone) gets a PR to `main`** and is deployed to Cloudflare for live debugging.
- **Review style that has worked:** check the PR diff _and_ the files on `main` after merge, then report findings grouped 🔴 bugs / 🟠 should fix / 🟡 minor, each with the exact file and fix.
  - The owner often merges before review, so check `main` too.
  - The owner sometimes deliberately departs from a suggestion (e.g. keeps the dashed map border, simplifies the legend). Respect stated choices, and only flag _actual errors_.
- **The owner prefers simplicity.** They dropped the style-guide page and the scroll-observer design when these felt too complex. Propose the simplest robust option first.
- When the owner reports an issue (lint, behavior), find the root cause in the logs and code before answering.

## 2. Stack

| Area     | Choice                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Frontend | Next.js 16 (App Router) + React 19 + TypeScript (strict), **static export** (`output: 'export'`, `images.unoptimized`)                     |
| Styling  | Tailwind CSS v4 (CSS-first config in `globals.css`), `clsx` + `tailwind-merge` via `lib/cn.ts`                                             |
| i18n     | next-intl v4 (static-export mode: always-prefixed `/en/…`, `/fr/…`)                                                                        |
| Backend  | Hono on Cloudflare Workers (`api/`), Zod + `@hono/zod-validator`                                                                           |
| Email    | Resend HTTP API (domain `danifer.dev` verified via DKIM)                                                                                   |
| Hosting  | Cloudflare Workers (static assets for web, a script Worker for the API); domain via Cloudflare Registrar                                   |
| Tests    | Vitest in both workspaces (`api/` uses `@cloudflare/vitest-plugin`; `web/` runs in the node environment for pure logic and contract tests) |
| CI/CD    | GitHub Actions (`ci.yml`, `deploy.yml`), Dependabot, CodeQL                                                                                |
| Node     | 22 (`.nvmrc`), npm workspaces                                                                                                              |

## 3. Repository layout

```
/                     package.json (workspaces: web, api; root scripts), .nvmrc, .prettierrc, .editorconfig,
                      AGENTS.md, STRUCTURE.md, COMMANDS.md, .github/workflows/{ci,deploy}.yml, .github/dependabot.yml
web/
  messages/           en.json, fr.json                 ← all UI strings (next-intl)
  public/             static files (gallery images go in public/images/<line>/<slug>/)
  wrangler.jsonc      Worker "portfolio-web": assets ./out, route danifer.dev/*, 404-page handling
  src/
    app/              layout.tsx (pass-through), page.tsx (language-choice fallback), not-found.tsx (bilingual, own <html>),
                      globals.css, [locale]/{layout,page}.tsx, [locale]/{professional,academics,technical,resume,contact}/page.tsx
    i18n/             routings.ts, request.ts, navigation.ts, locale.ts (initLocale), i18n.ts (Text/tr), metadata.ts (alternatesFor)
    content/          lines.ts, map.ts, map-view.ts, resume-view.ts, professional.ts, academic.ts, projects.ts,
                      profile.ts, navigation.ts, media.ts, (*.test.ts contract tests), ui.ts (legacy: delete when unused)
    components/
      layout/         Header, Footer, SkipLink, NavLink (client), LocaleSwitcher (client)
      map/            SubwayMap (client island), MapLegend, MapLine, MapStation, MapInterchange
      line/           LinePage, LineTrack, StopCard, Gallery, OpenStopFromId (client), types.ts
      resume/         ResumeSheet, ResumeSection, PrintButton (client)
      contact/        ContactForm (client)
      ui/             button, container, externalLink
    lib/              cn.ts, styles.ts (focusRing), format.ts (formatMonth/formatPeriod), map-geometry.ts (+ tests)
    global.d.ts       next-intl AppConfig augmentation (type-safe message keys, en.json is the reference)
api/
  wrangler.jsonc      Worker "portfolio-api": route danifer.dev/api/*, workers_dev false, vars.CONTACT_TO,
                      ratelimits CONTACT_LIMITER (5/60s), observability on
  src/index.ts        Hono app basePath('/api'): dev-only CORS, GET /health, route /contact
  src/contact.ts      POST /api/contact
  test/               index.spec.ts, contact.spec.ts
  .dev.vars           local secrets (git-ignored); .dev.vars.example committed (keys only)
```

## 4. Infrastructure and deployment

- **One origin, two Workers.** `danifer.dev/*` goes to `portfolio-web` (static files) and `danifer.dev/api/*` goes to `portfolio-api` (the more specific route wins). This means **no CORS in production.** Both Workers have `workers_dev: false`, so there's no second public entry point.
- **DNS:**
  - proxied `AAAA 100::` for `@` and `www` (a placeholder origin, since Workers answer first);
  - Resend DKIM/`send` records (DNS-only);
  - SPF `v=spf1 -all` and DMARC `p=reject` (Resend passes via aligned DKIM);
  - DNSSEC on.
- **Cloudflare Redirect Rules:**
  - `www` → apex (301);
  - `/` → `/fr` if `Accept-Language` starts with `fr`, else `/en` (302);
  - old unprefixed paths → `/en/…` (301).
  - The agent can't see the dashboard; verify with `curl -sI`.
- **Deploy:**
  - `deploy.yml` runs on push to `main` → `npm ci` → build → `npm run deploy -w api` → `npm run deploy -w web`;
  - uses GitHub Environment `production` (deploys only from `main`), secret `CLOUDFLARE_API_TOKEN` (scoped) and variable `CLOUDFLARE_ACCOUNT_ID`;
  - `cancel-in-progress: false` for deploys.
- **CI (`ci.yml`):**
  - runs `npm ci` → `format:check` → `lint` → `typecheck` → `test` → `build`;
  - read-only permissions, SHA-pinned actions, `persist-credentials: false`;
  - the ruleset on `main` requires the `verify` check and a PR.
- **Secrets:** `RESEND_API_KEY` (via `wrangler secret put`, from `api/`). Never put secrets in `wrangler.jsonc`, in code, or in `NEXT_PUBLIC_*` variables.
- **Logs:** Workers observability is enabled; for live logs run `cd api && npx wrangler tail`.

## 5. Frontend architecture: the big decisions

### 5.1 Static export everywhere

Every page is pre-rendered to HTML at build time, once per locale. Consequences:

- No server code at request time, no middleware, and no Next.js image optimization.
- **"Now" means build time.** `new Date()` in components runs during the build (e.g. the copyright year).
- Dynamic segments need `generateStaticParams`. Every layout and page under `[locale]` must call `setRequestLocale` (done through `initLocale(params)`).
- Use `export const dynamic = 'force-static'` for `sitemap.ts` / `robots.ts`.

### 5.2 Content layer: three kinds of information, each in one place

| Layer        | Where                                                                                                        | Example                                                      | Language-dependent?                |
| ------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------- |
| Structure    | `content/lines.ts`, `map.ts`, slugs, dates (`'YYYY-MM'`), coordinates, tech names, URLs, color classes       | `{ code: 'W', href: '/professional', bgClass: 'bg-line-p' }` | No                                 |
| UI strings   | `messages/en.json` / `fr.json`, accessed with `useTranslations` / `getTranslations`                          | `nav.contact`                                                | Yes                                |
| Long content | `professional.ts`, `academic.ts`, `projects.ts`, `profile.ts` using `Text = string \| Record<Locale,string>` | `role: { en, fr }`                                           | Yes (plain strings when identical) |

- **No visible text hard-coded in JSX** (an owner requirement).
- **Getters are the seams:** content arrays are private, and only `getX(locale)` is exported. Getters sort, resolve `Text` with `tr`/`trList`, and return a plain resolved type (`Source` type for authoring vs output type for pages, derived with `Omit<> & {}`).
- **View models** resolve everything a complex component needs: `getMapView(locale)` → `MapView`, `getResumeView(locale)` (async) → `ResumeView`. Components then only draw.
- **Adapters:** each line page maps its own data into the generic `Stop` type for `LinePage`. The same idea is behind `entriesByLine` in `resume-view.ts`.
- **Dates are stored raw** (`'YYYY-MM'`, `end: null` = current) and formatted at display time with `Intl.DateTimeFormat` (`lib/format.ts`, UTC to avoid off-by-one months).

### 5.3 Dependency direction

- `app/` (glue) imports `components/`, `content/`, `lib/`, and `i18n/`.
- `components/` receive data **as props**; they should import only _types_ from `content/` (`import type`).
  - **Known exceptions the owner chose:** `MapLegend` and `MapStation` import `lines` directly. It's acceptable at this size, but those modules then ship in the client bundle.
- `lib/` is generic and never imports content values (types only).
- **Server → client props must be serializable** (plain objects/strings, no functions).

### 5.4 Client islands (the only `'use client'` files)

- `NavLink` (`usePathname` for `aria-current`)
- `LocaleSwitcher`
- `SubwayMap` (and everything it imports): hover/focus state
- `OpenStopFromId` (opens `<details>` from the URL hash)
- `PrintButton` (`window.print()`)
- `ContactForm`

Everything else is a Server Component, rendered to HTML at build time.

### 5.5 Design language: "subway map"

- **Three lines.** Ids are `professional`, `academics`, `technical`; codes are currently **W** (work), **A**, **P** (projects). Colors are tokens `--line-p` (#f5821f, professional), `--line-a` (#00a651), `--line-t` (#ffde00, technical). The token names predate the code change.
- **Stops look the same everywhere:** idle stops are filled with the line color; active/open stops are white with a dark outline.
- **`metroBlue` (#007ec5)** is the header/footer background. The header is `sticky top-0 z-50`, and `html { scroll-padding-top: 7rem }` keeps anchor targets visible below it.
- Line pages: a vertical track (`border-l-8` in line color) with `<details>` stops.
- Resume: the same badges and colored rules, condensed onto A4.

### 5.6 The subway map (home page)

- **Data:** `content/map.ts`.
  - 12×16 grid; (0,0) is top-left and **y grows downward** (SVG).
  - `LinePath.points` is an ordered list of `stop | corner`.
  - Every segment must be **octilinear** (0°/45°/90°).
  - `labelSide` uses 8 compass directions (`n, ne, e, se, s, sw, w, nw`).
  - `interchanges` are slug pairs (two stops on different lines, joined by a connector).
- **Contract tests (`map.test.ts`):**
  - every slug exists in its line's content;
  - slugs are unique map-wide;
  - every segment is octilinear;
  - every point is inside the grid;
  - interchanges are valid.

  Any layout change must keep these green.

- **Rendering:**
  - an SVG `viewBox` in grid units with padding;
  - painter's order: lines → interchanges → stations;
  - `toRoundPathData` (quadratic Bézier corners, clamped radius);
  - labels positioned through the `labelPlacement` table (SVG text sits on its baseline, which explains the uneven `dy` values) and given halos with `paint-order: stroke`.
- **Interaction:** one state `{ line: LineId | null; stop: string | null }` in `SubwayMap`. Muted/active are _derived_; muting recolors to the `muted` tokens. Invisible wider hit areas make hovering easier; `onFocus`/`onBlur` mirror hover for keyboard users.

### 5.7 Line pages

`<details name="stops">` (native exclusive accordion; works without JS; keyboard built in), styled through `group-open:`. Arriving at `/…#slug` opens that stop via `OpenStopFromId`. The `Gallery` is a CSS scroll-snap row using `next/image` with width/height (no layout shift).

### 5.8 Resume

- A white A4 "sheet" on screen, matching print.
- `@page { size: A4; margin: 12mm }`.
- Light tokens forced in `@media print`; header/footer hidden with `print:hidden`.
- `[print-color-adjust:exact]` only on colored accents.
- `break-inside-avoid` on entries.
- URLs are shown in readable form for paper.

### 5.9 Contact

- **Request pipeline:** browser → `POST /api/contact` (same origin) → body limit → rate limit per `cf-connecting-ip` → Zod → honeypot → Resend.
- The API returns **error codes**; the UI maps them to translated strings.
- The visitor's email is sent as `reply_to`; `from` is `contact@danifer.dev`.
- **Local dev:** web on :3000 and API on :8787. `NEXT_PUBLIC_API_BASE` in `web/.env.development`; CORS enabled only when `ALLOWED_DEV_ORIGIN` is set (`.dev.vars`).

### 5.10 Localization (next-intl, static export)

- **URLs:** always-prefixed (`/en/…`, `/fr/…`); `generateStaticParams` builds both locales.
- **Use next-intl's navigation helpers:** `Link` and `usePathname` from `@/i18n/navigation`, which handle the prefix automatically. Plain SVG `<a>` hrefs must include `/${locale}` themselves.
- **Message keys are typed** through `global.d.ts`; `messages.test.ts` enforces fr/en key parity.
- **Per-page metadata:** use `generateMetadata` with `getTranslations({ locale, namespace })`. `alternatesFor(path, locale)` exists for hreflang but isn't wired into pages yet.

## 6. Conventions

- **Branches:** `type/short-description` (`feat/`, `fix/`, `chore/`, `docs/`; milestone branches like `m8/localization`). Commit messages use Conventional Commits (`feat(web): …`). One PR per milestone or sub-milestone; never push to `main`.
- **Tailwind:** always write **complete class names** (`'bg-line-p'`, never `` `bg-line-${x}` ``), and use lookup objects/records to choose classes. Line-related classes are typed as literal unions in `lines.ts`.
- **`Record<Id, …>`** is used deliberately for exhaustiveness (`lines`, `entriesByLine`, `labelPlacement`, `Text` per locale): adding a new id forces every place to handle it.
- **`as const satisfies readonly T[]`** for content arrays; getters return the widened type.
- **Use `import type`** for type-only imports (several places still miss it; fix when touched).
- **Tests:** test pure logic (`format`, `map-geometry`) and **data contracts** (`map.test.ts`, `media.test.ts`, `messages.test.ts`). Prove new tests can fail by breaking the data once.
- **Before every PR:** `npm run format && npm run lint && npm run typecheck && npm test && npm run build`, then look at the page in the browser in light and dark mode. Many past bugs were visual and invisible to CI.
- **`COMMANDS.md`** in the repo is the owner's command reference. Point to it, and suggest additions when new commands appear.

## 7. Recurring pitfalls (each has happened at least once)

- **Tailwind silently ignores unknown classes:** `-y-2`, `motion-safe: x` (with a space), `tet-white`, `top-i`, `rounder-full`, `textClass: 'white'`. When a style "doesn't work", check the spelling first.
- **Copy-paste errors between near-identical files:** the wrong line on a page, the wrong getter name, duplicated test assertions (`p.x` checked twice instead of `p.y`), slug comments all saying `#readality`. Look for these specifically in reviews.
- **SVG:**
  - y grows downward;
  - scaling an element needs `[transform-box:fill-box] origin-center`;
  - a second stroke trick (wide dark plus narrow `stroke-background`) makes outlines;
  - `fill-none` on paths;
  - text is positioned by its baseline.
- **React lint `react-hooks/set-state-in-effect`:** don't call `setState` directly in an effect body. Prefer native browser state (`<details>`), event handlers, or setState inside subscription callbacks.
- **Media queries are independent questions:** don't put motion rules inside `prefers-color-scheme`. That happened with the `<details>` animation and is still open.
- **i18n:**
  - any hard-coded `'en'` silently defeats localization;
  - hrefs need a leading `/`;
  - language names should be written in their own language ("Français").
- **Lockfile conflicts:** regenerate the lockfile, don't hand-edit it. Always `git fetch` first.
- **Dependabot majors:** don't merge just because CI is green. Check that the ecosystem supports the new version (Next.js, eslint-config-next, @cloudflare/vitest-plugin). Keep `@types/node` at the Node major in `.nvmrc`.

## 8. Owner preferences and decisions to respect

- **Keep:**
  - the dashed border around the map;
  - the simplified legend (reads `lines`/`ui` directly);
  - the click-to-expand line pages (not scroll-driven);
  - line codes W/A/P.
- **Map layout is provisional.** The owner will rework it after the site is complete; don't push layout changes unprompted.
- **Contact details** (email, phone) are intentionally public on the Contact page and resume.
- **Accessibility:** keep the essentials (landmarks, skip link, focus rings, `aria-current`, keyboard parity for hover). Don't make it the focus of the work.
- **Be pragmatic about security:** keep the existing protections (scoped token, secrets handling, rate limit, honeypot, validation). Propose more only if there's a concrete need.
