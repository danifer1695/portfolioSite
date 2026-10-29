# Command Reference

All commands in this project, grouped by when you need them.

**Conventions**

- Run everything from the **repo root** (`portfolioSite/`) unless a section says otherwise.
- `-w web` / `-w api` = "run this in that workspace" (npm workspaces).
- Commands are for a Unix shell (macOS/Linux terminal, or Git Bash on Windows).
- This is a living document: add commands as new milestones introduce them.

---

## 1. Starting a work session

```bash
git switch main                # go to the main branch
git pull                       # get the latest from GitHub
nvm use                        # switch to the Node version in .nvmrc (if you use nvm)
npm ci                         # install exact dependencies from package-lock.json
```

> `npm ci` vs `npm install`: `ci` installs exactly what the lockfile says and never changes it.
> Use `install` only when you are adding/removing/updating a dependency.

---

## 2. Running the apps locally

```bash
npm run dev:web                # website  → http://localhost:3000
npm run dev:api                # API      → http://localhost:8787  (e.g. /api/health)
```

Run each in its own terminal tab. Stop with `Ctrl+C`.

---

## 3. Quality checks (run before every push)

```bash
npm run format                 # auto-fix formatting (Prettier)
npm run lint                   # code-quality rules (ESLint)
npm run typecheck              # TypeScript errors
npm test                       # unit tests
npm run build                  # production build (what gets deployed)
```

One-liner, stops at the first failure:

```bash
npm run format && npm run lint && npm run typecheck && npm test && npm run build
```

`npm run format:check` = check formatting without changing files (this is what CI runs).

Run a check for one workspace only:

```bash
npm run build -w web
npm test -w api
```

---

## 4. Git: the feature workflow

### 4.1 Start a new piece of work

```bash
git switch main
git pull
git switch -c feat/short-description      # create + switch to a new branch
```

Branch name prefixes: `feat/` (new feature), `fix/` (bug fix), `chore/` (tooling, deps, config), `docs/`.

### 4.2 While working

```bash
git status                     # what changed? which branch am I on?
git diff                       # exact changes not yet staged
git diff --staged              # exact changes staged for the next commit
```

### 4.3 Commit

```bash
git add path/to/file another/path       # stage specific files (preferred)
git add -A                              # stage everything (only after reading git status!)
git commit -m "feat(web): add project card"
```

Commit message format (Conventional Commits): `type(scope): what changed`

- types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `ci`
- scopes: `web`, `api`, or omit for repo-wide

### 4.4 Push and open a PR

```bash
git push -u origin feat/short-description    # first push of a new branch
git push                                      # every push after that
```

Then open the PR on GitHub (yellow "Compare & pull request" banner). Base: `main`.

### 4.5 Bring the latest main into your branch

```bash
git fetch origin               # ALWAYS fetch first: updates your copy of GitHub's branches
git merge origin/main          # merge it into your current branch
```

If there are conflicts: fix them in source files, then `git add <files>` and `git commit` to finish the merge.
For `package-lock.json` conflicts, see section 6.3. **Never edit the lockfile by hand.**

### 4.6 After your PR is merged (clean up)

```bash
git switch main
git pull
git branch -d feat/short-description     # delete the local branch
git fetch --prune                        # forget remote branches deleted on GitHub
```

### 4.7 Look at history

```bash
git log --oneline -10                    # last 10 commits, one line each
git log --oneline --graph -15            # with merge lines drawn
```

---

## 5. Git: undo and fix mistakes

| Situation                                      | Command                                        |
| ---------------------------------------------- | ---------------------------------------------- |
| Throw away unsaved changes to a file           | `git restore path/to/file`                     |
| Unstage a file (keep the changes)              | `git restore --staged path/to/file`            |
| Fix the last commit message / add a file to it | `git commit --amend` **(only if NOT pushed)**  |
| Park changes temporarily                       | `git stash` … later `git stash pop`            |
| Abort a merge that went wrong                  | `git merge --abort`                            |
| Undo a pushed commit safely                    | `git revert <commit-sha>` (makes a new commit) |

> Rule: never rewrite history that is already on GitHub (`--amend`, `rebase`, `push --force`).
> Use `git revert` instead.

---

## 6. Dependencies

### 6.1 Add / remove

```bash
npm install <package> -w web             # runtime dependency for the website
npm install -D <package> -w web          # dev-only dependency (tools, types)
npm install <package> -w api             # same for the API
npm install -D <package>                 # root-level tool (e.g. prettier)
npm uninstall <package> -w web           # remove
```

Commit `package.json` **and** `package-lock.json` together, in their own commit:
`chore(web): add <package>`.

### 6.2 Inspect

```bash
npm outdated                             # what has newer versions
npm audit                                # known vulnerabilities
npm ls <package>                         # who depends on this package, which version
```

### 6.3 Lockfile merge conflict (during `git merge origin/main`)

```bash
# 1. fix any package.json conflicts by hand (keep BOTH sides' changes)
git checkout origin/main -- package-lock.json   # start from main's lockfile
npm install                                      # npm re-applies your branch's changes
npm ci                                           # proves lockfile and package.json agree
git diff origin/main -- package-lock.json        # review: only expected packages,
                                                 # every "resolved" URL on registry.npmjs.org
git add package.json web/package.json api/package.json package-lock.json
git commit                                       # finishes the merge
```

---

## 7. Cloudflare (Wrangler)

Wrangler is installed per workspace, so run these **from inside `api/` or `web/`**
(`cd api` first), or prefix with `npm exec -w api --`.

### 7.1 Account

```bash
npx wrangler login             # log in via browser (stores a token on your laptop)
npx wrangler whoami            # which account am I logged into?
npx wrangler logout
```

### 7.2 Deploy (normally CI does this, use manually only if needed)

```bash
npm run deploy -w api          # from repo root
npm run deploy -w web          # from repo root (run `npm run build -w web` first!)
```

### 7.3 Deployments and rollback

```bash
npx wrangler deployments list           # recent deployments of this Worker
npx wrangler rollback                   # roll back to the previous version
```

> A rollback changes what is live but NOT what is in git. Follow up with a `git revert` PR,
> or the next deploy will put the broken code back.

### 7.4 Live logs (debug production)

```bash
cd api && npx wrangler tail             # stream live requests/errors from portfolio-api
```

### 7.5 Secrets (API keys etc., from M4 on)

```bash
cd api
npx wrangler secret put RESEND_API_KEY  # prompts for the value (never type it in the command!)
npx wrangler secret list                # names only; values are never shown
npx wrangler secret delete RESEND_API_KEY
```

Local development secrets go in `api/.dev.vars` (git-ignored). Never put secrets in
`wrangler.jsonc`, in code, or in anything prefixed `NEXT_PUBLIC_`.

### 7.6 Regenerate Worker types (after changing bindings in wrangler.jsonc)

```bash
npm run cf-typegen -w api
```

---

## 8. Checking the live site

```bash
curl -I http://danifer.dev                    # expect 301 → https
curl -I https://www.danifer.dev               # expect 301 → https://danifer.dev/
curl -i https://danifer.dev/api/health        # expect 200 {"status":"ok"}
curl -i https://danifer.dev/api/not-real      # expect 404
```

`-I` = headers only. `-i` = headers + body.

---

## 9. Troubleshooting

### Something is weird after switching branches or updating deps

```bash
rm -rf node_modules web/node_modules api/node_modules web/.next web/out api/dist
npm ci
```

### Wrong Node version

```bash
node -v                        # should match .nvmrc (22.x)
nvm use                        # switch to it
```

### "Port 3000 is already in use"

A dev server is still running in another terminal. Find it and `Ctrl+C`, or:

```bash
lsof -i :3000                  # shows the process ID (PID) using the port
kill <PID>
```

### CI is red

1. PR → failing check → **Details** → read the **first** red step.
2. Run the same command locally (section 3) and fix it.
3. Commit + `git push`: the PR updates and CI re-runs automatically.

---

## 10. Never do this

- Never commit or push directly to `main`. Always use a branch + PR.
- Never edit `package-lock.json` by hand. Regenerate it (6.3).
- Never `git push --force` to a shared branch.
- Never type a secret directly into a command (it stays in your shell history). Use the prompts.
- Never commit `.env`, `.dev.vars`, or any key/token file.
- Never `git add -A` without reading `git status` first.
