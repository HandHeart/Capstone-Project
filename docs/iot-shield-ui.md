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
- **Width / gutters:** The inner grid is **`.faq-layout` only** (not `.cs-container`), with **`max-width: 1120px`** and **`margin: 0 auto`** like other content rails. **Horizontal inset** is on **`#faq-1193`**: default **`clamp(1.25rem, 4vw, 2rem)`**; at **`max-width: 768px`** it matches **Key Features** (**`clamp(1rem, 4vw, 1.5rem)`**) so FAQ and feature cards share the same side rhythm on phones.
- **Markup:** Two-column layout (`.faq-layout`): `.faq-media` uses a themed card (`.faq-visual-card`) with `assets/images/thinking_computer.jpg`, decorative glow, and `aria-hidden` on the visual column. Copy uses `.faq-copy` with existing `.cs-topper` / `.cs-title`.
- **Stacked layout (≤900px):** The FAQ visual matches the **Our Solution** panel: `.faq-media` is capped at **360px** centered; `.faq-visual-card` uses **420px** height (same as `.iot-visual-wrap`), **`border-radius: var(--radius-md)`**, and the photo sits in an absolutely positioned oval **centered in the card** (**50% / 50%** + translate), same idea as `.iot-oval-picture` inside `.iot-visual-wrap`. At **≤480px**, card height follows **`min(72vw, 420px)`** and the oval uses **`min(78vw, 280px)` × `min(95vw, 340px)`** like the solution block.
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

## Sticky section nav (`#section-nav`)

Fixed **top-right** rail from **1320px** width up (`right: max(0.75rem, calc(50vw - 35rem - 14.5rem))` so it sits farther from the content column, toward the viewport edge). **Hidden in the hero:** `opacity`/`visibility` until `#banner-843` has mostly scrolled past (`is-revealed` + `aria-hidden`). Then the rail **fades in** and list items **stagger** in (`sectionNavItemIn`). No **Hero** link—first item is **IoT Shield** (`#section-platform`). `js/section-nav.js` also adds **`is-departing`** to `.hero-panel` when **Learn more** is clicked (lift + soften) and clears it near the top; Learn more targets `#section-platform`.

## Mobile

- **Viewport:** `viewport-fit=cover` for notched devices; **safe-area** insets on the contact dialog, scroll-top button, and footer padding.
- **≤768px:** **`.cs-container`** uses **`clamp(1.45rem, 5.5vw, 2rem)`** horizontal padding for more side inset. Centered hero copy, **44px+** touch targets on primary CTAs, feature cards, and form actions; FAQ rows stay **≥2.75rem** min height with **tighter** vertical rhythm; single-column features; full-width contact panel.
- **≤540px:** Contact form opens as a **bottom sheet** (rounded top corners).
- **≤480px:** Hero / image block scales with `min()` so panels don’t overflow small phones.
- **FAQ:** Side gutters from **`#faq-1193`** padding (aligned with **Key Features** at ≤768px); **compact** vertical stack (smaller gaps, title margins, answer padding). ≤900px the **FAQ image** mirrors **solution** height/oval scaling (not a short 16:9 strip). ≤768px **~2.75rem** min trigger height, **0.94rem** body; ≤480px shortest FAQ verticals (other sections still use **`.cs-container`** bump at ≤480px).
- **Side nav:** Still **off** below **1320px** (CSS + `section-nav.js` returns before scroll-spy so mobile doesn’t run that logic).

## Back to top (`#scroll-top`)

Fixed round control (bottom-right, `z-index: 40`). Shown after ~380px scroll (`js/scroll-top.js`); `tabindex="-1"` when hidden so it’s skipped in tab order. Click scrolls to top with `behavior: smooth` unless `prefers-reduced-motion: reduce`.

## Related files

| Concern        | File(s)              |
| -------------- | -------------------- |
| Markup         | `index.html`         |
| Layout / theme | `css/style.css`      |
| Hero canvas    | `js/banner.js`       |
| FAQ accordion  | `js/faq.js`          |
| Contact modal  | `js/contact-modal.js` |
| Back to top    | `js/scroll-top.js`   |
| Section nav    | `js/section-nav.js`  |
| Local server   | `serve-local.ps1`    |
