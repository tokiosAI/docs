# Styling & layout notes

All visual customization lives in `style.css` (loaded automatically by Mintlify) and
`docs.json` (theme tokens, fonts, logo, navbar). This file explains the non-obvious
parts — especially the layout centering — so the next person doesn't relearn it the
hard way.

## What's customized in `style.css`

- **Readability** — Mintlify renders body copy through Tailwind Typography
  (`prose / dark:prose-invert`), which ignores `--mint-color-text` and uses a dim
  warm gray (`#A5A3A0`). Body text is lifted to `#D8DEE8`, headings to `#F3F5F9`,
  line-height to 1.7, and the page background matched to the marketing site's `#0E1116`.
- **Sidebar legibility** — inactive nav links were the same dim gray; lifted to `#CDD5DF`.
- **Header height** — raised from Mintlify's 48px (`h-12`) to 64px to match
  `tokios.com`. The header's sticky bar is the only thing locked to 64px.
- **Table of contents** — re-pinned to `top: 80px` (clears the 64px header; the default
  48px slid under it) and forced to `height: fit-content`. When the TOC column gets
  stretched full-height it behaves like an over-tall sticky element and drifts on scroll.
- **Content width** — see below.

## Content width & the centered band (with the Assistant)

We do **not** own the theme's markup, so styling is a CSS override layer on top of
Mintlify's **Luma** theme. Prefer the documented stable ids (`#navbar`,
`#sidebar-content`, `#content-area`, `#chat-assistant-sheet`) over class selectors.

**The layout is a centered band while the Assistant is closed, and the theme's native
layout while it's open.** The two pieces:

- `assistant-state.js` (a repo-root JS file Mintlify runs on every page) watches
  `#chat-assistant-sheet` with a `MutationObserver` and toggles an `assistant-open`
  class on `<html>` from the panel's width (0 = closed, wide = open).
- Every band rule in `style.css` is scoped with `html:not(.assistant-open)`, so it
  applies only while the Assistant is closed. The band: slide the fixed sidebar in
  (`#sidebar-content { left: var(--tok-band-inset) }`), center the navbar's content row
  (`#navbar > .relative`), and center the `[content + TOC]` pair on ≥1440px screens
  (fixed-width content column + flex auto-margins).
- The instant the Assistant opens, the class flips and every band rule drops out, so the
  theme's native (Assistant-safe) layout takes over — no more content shoved sideways.

### Why the band needs the JS signal

The band **broke** on the live site when the Assistant opened: the panel shrinks the
layout and collapses the TOC to width 0, so the content's `margin-left: auto` had
nothing to balance and shoved the content under the panel, and the `100vw`-positioned
fixed sidebar overlapped it. There is no native DOM signal for "Assistant open" (no
`aria-expanded` / `data-state` on `#assistant-entry`), so `assistant-state.js` creates
one. `mint dev` has no Assistant, so `assistant-open` is never set there and the band
always applies locally.

Two Luma gotchas worth remembering:

1. **The sidebar is `position: fixed`** — move it with `left`, not by capping a container.
2. **The article is sized by CSS container queries** — capping/padding the content
   column reintroduces a phantom offset (~708px) that shrinks it and squashes the TOC.
   That's why the band uses a fixed-width content column instead of padding.

### Magic numbers
- `64px` — header height (`#navbar`)
- `1360px` — band width the sidebar/header center against (`--tok-band-inset`)
- `784px` — content-column width for the ≥1440px band; `768px` — article width otherwise
- `80px` / `calc(100vh - 96px)` — TOC sticky offset (clears the 64px header) + max height
- `1024px` — desktop breakpoint for sidebar top padding + larger body font
- `48px` — sidebar nav top padding (clears the 64px header)
- `17px` — desktop body font size

### Fragility
The band is built on Mintlify's documented ids (`#navbar`, `#sidebar-content`,
`#content-area`) plus `div:has(> #content-area)` for the content column / TOC sibling,
`#navigation-items` for the sidebar links, and `#chat-assistant-sheet` for the Assistant
signal in `assistant-state.js`. A Mintlify version bump can rename or restructure these
— **re-verify after upgrading Mintlify, and always check both states: Assistant closed
AND open.** Custom JS/CSS is loaded from any `.js` / `.css` file in the repo root.

## The cleaner approach for the future (x.com style)

x.com centers natively: the left column is a flex sibling that *grows* to absorb the
left margin, with the nav right-aligned/sticky inside it, next to a fixed-width main
column — the whole row centered as a unit. No fixed positioning, no container-query
fighting. That requires owning the layout markup, which Mintlify's hosted theme doesn't
expose.

If centering ever needs to be more robust, the options in rough order of effort are:

1. **Mintlify headless / custom frontend** — render the docs with your own React shell
   and build the x.com-style flex layout directly.
2. **Fork the Luma theme** — change the sidebar from `position: fixed` to a flex spacer
   column and drop the container-query content sizing.
3. **`mode: custom` pages** — Mintlify gives a blank canvas where you can hand-build any
   Tailwind layout, but it removes the sidebar and TOC, so it's only suitable for
   landing/marketing pages, not navigable docs.

> Note on Tailwind: Mintlify lets you use Tailwind classes on elements you write in your
> `.mdx` pages (and arbitrary values like `w-[350px]` are **not** supported there — use
> this CSS file instead). Tailwind does **not** give access to the theme's sidebar/header/
> TOC markup, so it can't be used to restructure the app shell.
