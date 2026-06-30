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
- **Centering** — see below.

## How the centering works (and why it's done this way)

The visual goal: the whole page (sidebar · content · TOC · header) reads as one
centered band on wide monitors, like GitBook/DeepWiki or x.com.

We do **not** own the theme's markup, so this is a CSS override layer on top of
Mintlify's **Luma** theme. Two theme choices shape the approach:

1. **The sidebar is `position: fixed`** (pinned to the viewport's left edge). It is not
   a flex column, so it can't be centered by capping a container — it's moved by setting
   its `left`.
2. **The content/article is sized by CSS container queries.** Any attempt to cap or pad
   the content column reintroduces a phantom horizontal offset (~708px at full width,
   ~224px inside a band) that shrinks the article and squashes the TOC. **Do not pad the
   main content column.**

So the implementation is:

- **Content + TOC** (`@media (min-width: 1440px)`): give the content column a fixed
  `width: 784px`, neutralize the article's `lg:mx-auto`, and center the
  `[content + TOC]` pair with flex auto-margins. The article must have a fixed-width
  parent or the container queries collapse it.
- **Whole-page band** (`--tok-band-inset: max((100vw - 1360px)/2, 0px)`): slide the
  fixed sidebar in with `left: var(--tok-band-inset)`, and center the header's content
  row with `max-width: 1360px; margin-inline: auto`. The content itself is left
  untouched (that's what avoids the phantom offset). `max(..., 0px)` makes everything a
  no-op below ~1360px, so narrow screens keep Mintlify's default layout.

### Magic numbers
- `64px` — header height
- `784px` — content column width
- `1440px` — breakpoint where content+TOC centering kicks in
- `1360px` — band width the sidebar + header center against
- `80px` / `calc(100vh - 96px)` — TOC sticky offset + max height
- `1024px` — desktop breakpoint for sidebar top padding + larger body font
- `48px` — sidebar nav top padding (clears the 64px header)
- `17px` — desktop body font size

### Fragility
The selectors target Mintlify's generated utility classes (`[class*="max-w-[696px]"]`,
`.fixed.w-56`, `header.top-0.w-full`, `#navigation-items`). A Mintlify version bump can
rename these — **re-verify the layout after upgrading Mintlify.**

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
