# Tokios documentation

This repository contains the public documentation site for Tokios, built with [Mintlify](https://mintlify.com).

## Project structure

- `docs.json` configures the Mintlify site, navigation, theme, logo, and links.
- `index.mdx`, `quickstart.mdx`, and `how-it-works.mdx` are top-level overview pages.
- `setup/` contains installation and account setup guides.
- `guides/` contains client and workflow guides.
- `reference/` contains API, configuration, and troubleshooting reference pages.
- `.mintlify/AGENTS.md` contains private writing and agent instructions.

## Local development

Install dependencies:

```bash
npm install
```

Start the local preview from the repository root:

```bash
npm run dev
```

Mintlify serves the site at `http://localhost:3000`.

Check for broken links:

```bash
npm run check
```

Validate the Mintlify project:

```bash
npm run validate
```

## Writing guidance

Follow `.mintlify/AGENTS.md` when adding or editing content. In short:

- Use active voice and second person.
- Keep sentences concise.
- Use sentence case for headings.
- Bold UI labels, for example: Click **API Keys**.
- Use code formatting for file names, commands, paths, environment variables, API paths, and identifiers.
- Never commit real API keys, connector tokens, tenant ids, customer data, or production credentials.

## AI-assisted writing

Mintlify provides an agent customization workflow and documentation skill. See [Customize agents](https://www.mintlify.com/docs/agent/customize) for the latest setup guidance.

## Publishing changes

Mintlify deploys from the connected Git repository. Keep `docs.json` navigation synchronized with any new, moved, or deleted MDX files before merging changes.
