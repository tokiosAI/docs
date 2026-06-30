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

## Content width & the Assistant constraint

We do **not** own the theme's markup, so styling is a CSS override layer on top of
Mintlify's **Luma** theme. The article has a stable `id="content-area"` — prefer that
over class selectors.

Current approach (deliberately minimal/robust): widen the article via
`#content-area { max-width: 768px }` and let the theme's own `lg:mx-auto` center it
inside the content column. We do **not** touch the layout flex, the sidebar position,
or the header.

### Why not a fancier centered "band"?

An earlier version pulled the `position: fixed` sidebar inward (`left: calc(...)`),
centered the `[content + TOC]` pair with flex auto-margins, and centered the header row
— making the whole page a centered band. It looked great on `mint dev`, but **broke on
the live site when the "Ask Assistant" panel opens**:

- The Assistant panel shrinks the layout and collapses the right TOC to width 0.
- With no TOC to balance against, the content's `margin-left: auto` shoved it under the
  panel, and the `100vw`-positioned fixed sidebar then overlapped it.
- `mint dev` has no Assistant, so the breakage was invisible locally.

There's no DOM signal that flips when the Assistant opens (no `aria-expanded` /
`data-state` on `#assistant-entry`), and the layout row has no unique selector, so the
band couldn't be made to stand down automatically. Hence the minimal approach above —
the theme's native layout adapts to the Assistant correctly.

Two Luma gotchas worth remembering if you revisit this:

1. **The sidebar is `position: fixed`** — it can't be centered by capping a container.
2. **The article is sized by CSS container queries** — capping/padding the content
   column reintroduces a phantom offset (~708px) that shrinks it and squashes the TOC.

### Magic numbers
- `64px` — header height
- `768px` — article max-width (widened from Mintlify's 696px)
- `80px` / `calc(100vh - 96px)` — TOC sticky offset (clears the 64px header) + max height
- `1024px` — desktop breakpoint for sidebar top padding + larger body font
- `48px` — sidebar nav top padding (clears the 64px header)
- `17px` — desktop body font size

### Fragility
The selectors target Mintlify's generated ids/classes (`#content-area`,
`header.top-0.w-full`, `#navigation-items`, and `div:has(> #content-area)` for the TOC
sibling). A Mintlify version bump can rename these — **re-verify after upgrading
Mintlify, and always check both states: Assistant closed AND open.**

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
