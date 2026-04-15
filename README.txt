================================================================================
  IoT Shield — Capstone project site
================================================================================

Static marketing and project showcase page for IoT Shield: a capstone
cybersecurity / IoT monitoring concept built around Splunk, Raspberry Pi
simulators, and Kali-based threat simulation.

--------------------------------------------------------------------------------
  Quick start (local preview)
--------------------------------------------------------------------------------

From the project root, in PowerShell or a terminal:

  python -m http.server 8080 --bind 127.0.0.1

Open http://127.0.0.1:8080/ in a browser.

Optional script (alternate port, opens browser):

  .\serve-local.ps1

Default script port is 8765. See docs\iot-shield-ui.md for details.

--------------------------------------------------------------------------------
  What’s in the repo
--------------------------------------------------------------------------------

  index.html       Single-page site: hero, problem/solution, features,
                   attack carousel, how-it-works carousel + summary, FAQ,
                   contact dialog.

  css\style.css    Global styles, layout, components.

  js\*.js          Hero canvas, carousels, FAQ, contact modal, scroll-to-top,
                   sticky section nav.

  assets\images\   Diagrams, dashboards, capstone screenshots.

  docs\            Capstone documentation, UI notes, slideshow notes,
                   guidelines image.

--------------------------------------------------------------------------------
  Documentation (Markdown files in docs)
--------------------------------------------------------------------------------

  docs\capstone-site-documentation.md
      Maps the site to Capstone II “Documents Directory” expectations
      (problem, design, implementation, testing, results, Scrum placeholder,
      supporting docs). Includes the course guidelines image.

  docs\iot-shield-ui.md
      Design system, sections, modal, FAQ, local preview.

  docs\attacks-slideshow.md
  docs\platform-walkthrough-slideshow.md
      Carousel behavior and slide lists.

--------------------------------------------------------------------------------
  Markdown README
--------------------------------------------------------------------------------

This file is the plain-text twin of README.md (same project, easier to copy
into another folder or upload where only .txt is accepted).

--------------------------------------------------------------------------------
  Deploy
--------------------------------------------------------------------------------

Upload at least: index.html, css\, js\, assets\ to any static web host.
Connect the contact form to a backend or form service for real submissions.

--------------------------------------------------------------------------------
  License / course use
--------------------------------------------------------------------------------

Capstone / academic use unless your team assigns another license.

================================================================================
