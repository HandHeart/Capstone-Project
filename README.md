# IoT Shield — Capstone project site

Static marketing and project showcase page for **IoT Shield**: a capstone cybersecurity / IoT monitoring concept built around Splunk, Raspberry Pi simulators, and Kali-based threat simulation.

## Quick start (local preview)

From the project root:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/` in a browser.

Optional script (alternate port):

```powershell
.\serve-local.ps1
```

Uses port **8765** by default (see `docs/iot-shield-ui.md`).

## What’s in the repo

| Item | Description |
|------|-------------|
| `index.html` | Single-page site (hero, problem/solution, features, attack carousel, how-it-works carousel + summary, FAQ, contact dialog). |
| `css/style.css` | Global styles, layout, components. |
| `js/*.js` | Hero canvas, carousels, FAQ, contact modal, scroll-to-top, sticky section nav. |
| `assets/images/` | Diagrams, dashboards, and capstone screenshots. |
| `docs/` | Capstone documentation, UI notes, slideshow notes, guidelines image. |

## Documentation

- **`docs/capstone-site-documentation.md`** — Maps the site to Capstone II “Documents Directory” expectations (problem, design, implementation, testing, results, Scrum placeholder, supporting docs). Includes the embedded guidelines image.
- **`docs/iot-shield-ui.md`** — Design system, sections, modal, FAQ, local preview.
- **`docs/attacks-slideshow.md`** / **`docs/platform-walkthrough-slideshow.md`** — Carousel behavior and slide lists.

## Plain-text copy

A **non-Markdown** version of this README (for LMS uploads, email, or a separate folder) is in **`README.txt`** at the same level as this file.

## Deploy

Upload the folder contents (at minimum `index.html`, `css/`, `js/`, `assets/`) to any static host. Wire the contact form to your backend or a form service before production use.

## License / course use

Capstone / academic use unless your team assigns another license.
