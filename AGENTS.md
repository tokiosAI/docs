# Tokios documentation agent instructions

## Project context

- This is the Tokios documentation site built with Mintlify.
- Pages are MDX files with YAML frontmatter.
- Site configuration lives in `docs.json`.
- Tokios exposes private local models through `https://api.tokios.com` by using an outbound-only connector tunnel.
- The docs should help readers install the connector, register deployments, create API keys, and use Tokios from OpenAI- or Anthropic-compatible clients.

## Terminology

- Use "connector" for the local `tokios-connector` process.
- Use "deployment" for the public model name that API clients send in the `model` field.
- Use "upstream model id" for the model id served by Ollama, llama.cpp, vLLM, LM Studio, or another local backend.
- Use "API key" for `sk-tokios-...` keys.
- Use "token" only for connector pairing tokens or model tokens.
- Use "dashboard" for the Tokios web UI.

## Writing style

- Use active voice and second person.
- Keep sentences concise. Prefer one idea per sentence.
- Use sentence case for headings.
- Bold UI labels, for example: Click **API Keys**.
- Use code formatting for file names, commands, paths, environment variables, API paths, and identifiers.
- Prefer task-oriented pages that start with what the reader can do.
- Put prerequisites before commands.
- Use notes, tips, and warnings only when they prevent mistakes or answer likely questions.

## Content boundaries

- Do not document internal admin tools or unreleased dashboard features.
- Do not include real API keys, connector tokens, tenant ids, customer data, or production credentials.
- Use placeholder secrets such as `sk-tokios-YOUR_KEY` and `ct-your-connector-token`.
- Do not claim Tokios supports a backend, API surface, or client unless the repo already documents it or the product team confirms it.
- Avoid marketing claims unless they help a setup or troubleshooting task.

## Mintlify conventions

- Every page should include `title`, `sidebarTitle`, and `description` frontmatter.
- Keep navigation entries in `docs.json` synchronized with file paths.
- Use Mintlify components when they improve scanning, especially `Steps`, `CodeGroup`, `Tabs`, `AccordionGroup`, `Note`, `Tip`, and `Warning`.
- Keep `AGENTS.md` files private with `.mintignore` so agent instructions are not published as documentation pages.
