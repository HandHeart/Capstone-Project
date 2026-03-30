# IoT Shield — UI layout and motion

This document summarizes the hero gradient animation, CTA/problem/solution layout, Key Features interactions, and the modern design system used on the marketing page.

## Design system (modern refresh)

- **Typography:** [Outfit](https://fonts.google.com/specimen/Outfit) for display headings and feature numerals; [DM Sans](https://fonts.google.com/specimen/DM+Sans) for body copy. Loaded from Google Fonts with `preconnect` in `index.html`.
- **Color tokens (CSS variables):** `--primary` (teal), `--secondary` (violet), `--surface`, `--surface-elevated`, `--text-muted`, `--border-subtle`, and radius tokens (`--radius-sm` / `--md` / `--lg`) in `:root` inside `css/style.css`.
- **Hero:** Frosted `hero-panel` with eyebrow line, gradient accent on “Shield”, pill CTA with arrow icon, simplified bottom transition into the next section.
- **Features:** Responsive CSS grid (4 → 2 → 1 columns), left-aligned card copy, footer strip with brand line.
- **Motion:** `prefers-reduced-motion: reduce` disables hover transforms in CSS; `js/banner.js` draws a static gradient and redraws on resize instead of animating.

## Hero gradient (`js/banner.js`)

The banner uses a full-bleed `<canvas>` with four layered radial gradients. Each frame:

- **Position:** Blob centers use combined sine/cosine offsets with time factors around `0.001`–`0.0012` and amplitude up to about `0.16` (plus a smaller secondary wiggle) so motion reads clearly on screen. Blob colors align with the refreshed palette (`#5eead4`, `#7c3aed`, etc.).
- **Radius:** Each blob’s radius scales by `1 + sin(time * 0.0009 + i * 2.1) * 0.14` so the blend shifts as well as the centers.

`resizeCanvas` runs on load and `resize`; drawing uses `requestAnimationFrame`.

## CTA section (`#cta-384`)

- **Background:** `#0b0f1f`, vertical padding aligned with the previous content strip.
- **Intro:** `.cta-intro` holds the topper, title, and two paragraphs; `.cta-intro-gap` adds spacing after the first paragraph block.
- **The Problem:** `.problem-block` wraps the heading and list. Typography uses `.section-heading` (underline accent), a left accent bar, tinted panel, and `.problem-list` with custom bullet markers (no default list bullets).
- **Our Solution + image:** `.solution-with-media` is a flex row: `.solution-copy` (flex-grow) on the left, `.cs-image-group` / `.iot-visual-wrap` on the right. `.solution-copy-gap` spaces the second paragraph.

### Breakpoint

At **900px** and below, `.solution-with-media` stacks vertically (`flex-direction: column`); the image group is centered.

## FAQ (`#faq-1193`)

- **Surface:** Background is a short gradient from `--dark2` into `--surface` so it lines up with the bottom of the Key Features strip and matches the main content palette (not the footer `--dark`).
- **Markup:** Two-column layout (`.faq-layout`): `.faq-media` uses a themed card (`.faq-visual-card`) with `assets/images/thinking_computer.jpg`, decorative glow, and `aria-hidden` on the visual column. Copy uses `.faq-copy` with existing `.cs-topper` / `.cs-title`.
- **Accordion:** Each row is `.faq-item` with a `<button class="faq-trigger">` (not `.cs-button`, to avoid clashing with the hero CTA). Answers live in `.faq-panel` > `.faq-panel-inner` > `.faq-answer`. Only one item has `.is-open` by default; `js/faq.js` toggles `.is-open` and `aria-expanded` (single-open behavior).
- **Motion:** Panel expand uses CSS `grid-template-rows: 0fr` / `1fr`. Respects `prefers-reduced-motion` by disabling FAQ transitions.

## CTA (`#cta-697`)

Placed after the FAQ, still inside `<main>`. Centered headline (`.cta-697-title`), **Get in touch** is a `<button>` (`#contact-modal-open`) that opens the contact dialog. **Waves:** inline SVG (`.cta-697-waves`) with teal/violet/footer-tint fills—no external graphic.

## Contact modal (`#contact-modal`)

Native `<dialog>` with `showModal()` / `close()` (`js/contact-modal.js`). **Closed state:** `dialog.contact-modal:not([open]) { display: none; }` so global `.contact-modal` flex styles never override the UA and leak the form below the footer. **Open state:** `dialog.contact-modal[open]` applies the flex centering. Close control uses `stopPropagation` and the inner SVG uses `pointer-events: none` so the X reliably closes the dialog. Contains **only the form** (name, email, phone, optional “how did you find us”, message) plus intro copy—no map or side contact list. Submit uses client-side validation then shows a static success note (hook to your backend or Formspree when you deploy). Styles use `.contact-*` classes and theme tokens.

## Key Features (`.sf-product-tab-order-list`)

Each `<li>` is styled as a card (padding, radius, border, background). On **hover** or **focus-within** (keyboard users can tab to each item via `tabindex="0"`):

- Slight upward `translateY`, stronger border and glow using theme greens/purples.
- The large number (`h3`) shifts color toward `--primary` and scales slightly; body copy opacity increases.

On narrow screens (`max-width: 767px`), the list is a column and hover lift is reduced for touch layouts.

## Local preview

If **port 8080** fails in the browser (blank page, connection error, or “empty reply”), another app may be bound to that port without serving real HTTP. Use a dedicated port on the loopback interface instead.

From the project root, run:

```powershell
.\serve-local.ps1
```

That script serves the site at **http://127.0.0.1:8765/** and opens it in your default browser. Stop the server with **Ctrl+C** in that terminal.

Manual equivalent:

```powershell
cd "d:\Capstone Project"
python -m http.server 8765 --bind 127.0.0.1
```

Then open **http://127.0.0.1:8765/**.

## Related files

| Concern        | File(s)              |
| -------------- | -------------------- |
| Markup         | `index.html`         |
| Layout / theme | `css/style.css`      |
| Hero canvas    | `js/banner.js`       |
| FAQ accordion  | `js/faq.js`          |
| Contact modal  | `js/contact-modal.js` |
| Local server   | `serve-local.ps1`    |
