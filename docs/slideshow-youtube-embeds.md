# Slideshow YouTube embeds

Two carousels on the marketing page include an optional first slide with an embedded YouTube video.

## Locations

| Section | Video URL | Slide label |
|--------|-----------|-------------|
| **How IoT Shield works** | `https://www.youtube.com/watch?v=zKNvvYYRIQ8` | Platform walkthrough (video) |
| **Different Attacks** | `https://www.youtube.com/watch?v=Ap_PaX6hgGE` | Attack patterns overview (video) |

## Implementation

- Markup lives in `index.html` inside each `.attacks-slideshow-viewport`, as the first `.attacks-slide` before image slides.
- Embeds use `https://www.youtube.com/embed/<VIDEO_ID>?autoplay=0&rel=0` so playback starts only after the user interacts with the player.
- The iframe does not list `autoplay` in the `allow` attribute, so autoplay is not advertised to the embed.
- Styling uses `.attacks-slide-figure--video`, `.attacks-slide-video-frame`, and `.attacks-slide-embed` in `css/style.css` for a responsive 16:9 frame consistent with image slide height limits.

## Changing or removing a video

Edit the `src` on the corresponding `iframe` (keep `autoplay=0` unless you intentionally want auto-start). To drop the video slide, remove that `article.attacks-slide` block only.
