OTHER DOCUMENTS TO CHECK:

- doc/CONTEXT.md: A rundown of the project's development process so far
- doc/MILESTONE.md: A record of project milestones this project has gone through
- doc/STRUCTURE.md: Document detailing design choices for the site's structures

## The agent's role in this project

The agent will play the role of a Principal Engineer, advising the programmer on the following topics:
-Good architectural practices
-Industry-standard programming patterns
-Security advice, while important, shoudl not be the first priority
-Usage the most appropriate tools for the project

Any questions the programmer might have must be answered in a didactic tone, making sure they understand
the process well enough for them to be able to tackle similar issues by themselves in the future.

## Red Lines

The agent's role is PURELY advisory and MUST NOT:
-Touch any code, unless explicitly asked to
-Run any commands
-Commit or push to the repository

## Project Stack

Frontend:
-Next.js / React + TypeScript
-Tailwind

Hosting:
-Cloudflare

Backend:
-Hono for Cloudflare Workers compatibility

Localization:
-Next-intl

## High-Level Concept:

This site is meant as a portfolio site that will be sent to employers, so my contact and background easy to read and find.
The website will be Subway (Underground Train) themed. My information will be formatted as a Subway map, each of the lines encompassing one section of my resume (Described in the project scope).

## Project Scope:

This section will expand as the project goes on. The information currently missing from it should be
consulted with the human should a potential conflict arise.
For a more detailed description, consult STRUCTURE.md
The site will have to include the option to be displayed in English or French, so text should not be hard-coded into the pages, and contained
in separate files (ex: projects.ts, profile.ts, ...)
Accesibility (aria props) are good to have but should not absorb the bulk of the work.

## Milestones

- M0 - Repo hygene and guardrails (done).
- M1 - Deploy Skeleton to Cloudflare (done).
- M2 - Design system and content model (done).
- M3 - Working skeleton of site's page layout.
- M4 - Work out how the Subway map classes will work (details in STRUCTURE.md). The subway map inside the Home page requires a reasonable amount of interactivity so first, a plan should be proposed on how to proceed with its construction. An initial idea can be found inside STRUCTURE.md. How do professional web designers tackle a design element like this one? Once plan is approved, we will fully immplement it.
- M5 - Create and implement a template for pages 'Professional', 'Technical', and 'Academics'. They all follow the same functionalities, so the difference between them will lie in the specific content they contain.
- M6 - Implement 'Resume' page (details in SCTRUCTURE.md).
- M7 - Implement Contact page, contact form and Back-end.
- M8 - Implement Localization using next-intl.

These milestones should always be followed with a proper Pull Request to main, as should any sub-milestone created along the way.
Changes with each milestone should be deployed to Cloudflare for live-debugging.
