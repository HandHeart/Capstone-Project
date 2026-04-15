# How IoT Shield works (platform walkthrough)

## Location

- **Markup:** `index.html`, section `#section-how-it-works` (after **Different Attacks**, before the FAQ).
- **In-page nav:** Sticky dot nav label **“How it works”** links to this section.

## Slide order and assets

Slides appear in this order (files under `assets/images/`):

1. `Explanation.png` — project explanation / scope.
2. `IoT_Shield_-_Dashboard.png` — main monitoring dashboard.
3. `IoT_Shield_-_Security_Alerts.png` — security alerts view.
4. `logflow.jpeg` — log flow from devices to analysis.
5. `Malware_Signature_Detected.png` — example detection in the UI (also used in the attacks carousel as a pattern example).
6. `Outcomes.jpeg` — outcomes summary.
7. `siemLab.jpeg` — SIEM lab context.
8. `SixSprint.jpeg` — sprint timeline / agile delivery.
9. `teamroles.jpeg` — team roles.
10. `workflow.jpeg` — workflow diagram.

## Copy below the carousel

The block `.how-it-works-explain` sits **under** the slideshow. Its title is **“Project summary.”** The body uses the capstone narrative: **How it works** (three roles, log path, Splunk rules), **What it detected** (900+ alerts, lab window, attack types, mapping to alerts), **Key results** (five bullets), and a closing line on the **six sprints**. The opening sentence of the same story also appears in `.attacks-section-text` above the carousel.

## Timing

The walkthrough carousel uses `data-autoplay-ms="7000"` (seven seconds per slide). Adjust on the root `div.attacks-slideshow` in `index.html` if you want a faster or slower tour.
