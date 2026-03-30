# IoT Shield — UI layout and motion

This document summarizes the hero gradient animation, CTA/problem/solution layout, and Key Features interactions implemented on the marketing page.

## Hero gradient (`js/banner.js`)

The banner uses a full-bleed `<canvas>` with four layered radial gradients. Each frame:

- **Position:** Blob centers use combined sine/cosine offsets with time factors around `0.001`–`0.0012` and amplitude up to about `0.16` (plus a smaller secondary wiggle) so motion reads clearly on screen.
- **Radius:** Each blob’s radius scales by `1 + sin(time * 0.0009 + i * 2.1) * 0.14` so the blend shifts as well as the centers.

`resizeCanvas` runs on load and `resize`; drawing uses `requestAnimationFrame`.

## CTA section (`#cta-384`)

- **Background:** `#0b0f1f`, vertical padding aligned with the previous content strip.
- **Intro:** `.cta-intro` holds the topper, title, and two paragraphs; `.cta-intro-gap` adds spacing after the first paragraph block.
- **The Problem:** `.problem-block` wraps the heading and list. Typography uses `.section-heading` (underline accent), a left accent bar, tinted panel, and `.problem-list` with custom bullet markers (no default list bullets).
- **Our Solution + image:** `.solution-with-media` is a flex row: `.solution-copy` (flex-grow) on the left, `.cs-image-group` / `.iot-visual-wrap` on the right. `.solution-copy-gap` spaces the second paragraph.

### Breakpoint

At **900px** and below, `.solution-with-media` stacks vertically (`flex-direction: column`); the image group is centered.

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
| Local server   | `serve-local.ps1`    |
