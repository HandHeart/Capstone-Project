# IoT Shield slideshows (carousel)

## Purpose

The site uses one shared carousel implementation for:

1. **Different Attacks** (`#section-attacks`) — dashboard screenshots for distinct attack patterns.
2. **How IoT Shield works** (`#section-how-it-works`) — walkthrough of concept, dashboards, log flow, lab, delivery, and outcomes.

## Files

| File | Role |
|------|------|
| `index.html` | Each carousel root is a `div.attacks-slideshow` with **`data-iot-slideshow`**, optional `data-autoplay-ms`, viewport, slides, toolbar, and a `p.attacks-slideshow-status` (live region) inside the same root. |
| `css/style.css` | Shared carousel styles (`.attacks-slideshow`, scroll-snap, dots, buttons). Section shells use `#section-attacks` / `#section-how-it-works` (and `.how-it-works-explain` for the long-form copy under the second carousel). |
| `js/attacks-slideshow.js` | Initializes **every** `[data-iot-slideshow]` root independently: dots, scroll sync, keyboard, autoplay, hover/focus pause, resize. |

## Behavior

- **Navigation:** Previous and next buttons; dot buttons jump to a slide; when the viewport has focus, **Left** / **Right** arrows change slides.
- **Scrolling:** Native horizontal scrolling with **scroll-snap** so touch and trackpad swipes align to whole slides.
- **Autoplay:** Each root reads its own `data-autoplay-ms` (milliseconds). Autoplay is off when `prefers-reduced-motion: reduce` is set, when the value is below 800 ms, or when the document is hidden.
- **Accessibility:** The viewport is a `role="region"` with `aria-roledescription="carousel"`. Inactive slides use `aria-hidden="true"`. The status line is `aria-live="polite"` and announces the current slide index and label.

## Adding another carousel

1. Copy the structure of an existing `div.attacks-slideshow` block (viewport, `article.attacks-slide` items, toolbar, status `p`).
2. Add **`data-iot-slideshow`** on the root `div.attacks-slideshow`.
3. Set **`data-autoplay-ms`** as needed (or omit / use `0` to disable autoplay).
4. Give the viewport a unique, descriptive **`aria-label`**.

Dots are created from `.attacks-slide` count; no manual dot markup is required.

See also: `docs/platform-walkthrough-slideshow.md` for the “How IoT Shield works” slide list and explanatory copy.
