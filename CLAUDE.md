# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Website for a friend's restaurant in Bavaria, Germany. Static site, plain HTML/CSS/JS, no build step, no framework, no npm dependencies. Keep it that way. Languages: German (root) and English (`en/`). Own git repo `Taanel/anh-em` (public), deployed as a **preview** to GitHub Pages: https://taanel.github.io/anh-em/ (noindex + robots.txt Disallow until the Impressum is complete). The site must keep working on any static host and via double-click (file://). `README.md` is the German guide for the owner and for developers; keep it in sync.

## Structure

- `index.html`, `impressum.html`, `datenschutz.html`: German pages. `en/` holds the English versions as separate pages (better for search engines).
- `css/`: `tokens.css` (colors, fonts, spacing; the single source of the look), `base.css` (reset, typography), `layout.css` (grid, sections), `components.css` (buttons, menu, header, footer).
- `js/speisekarte-daten.js`: the menu as data (DE + EN, prices, allergens). The only place to edit dishes. A `.js` file, not `.json`, because `fetch` fails on file://.
- `js/speisekarte.js` renders the menu, `js/oeffnungszeiten.js` shows "open now", `js/karte-zwei-klick.js` loads Google Maps only after a click.
- `js/intro-video.js` + `videos/anh-em-intro.mp4`: full-bleed background video in the hero (like a mood video, no player look): autoplay, muted, no audio track, plays once and stops on the last frame; small pause button; reduced motion shows the poster `images/intro-standbild.webp`. The video contains logo, name and address, so no centered text on top. The original with music is `material/intro-video-original-mit-ton.mp4` (not published); its render source was deleted on the owner's request.
- `js/raster-video.js` + `videos/sushi-platten.mp4`: muted loop in the photo grid, plays only while visible, pause button. Clip 11.85–31.9 s of the owner's video, chosen because no guests are visible.
- `js/navigation.js`: sticky header, mobile menu toggle (aria-expanded), shadow on scroll.
- `js/bewegung.js`: scroll entrances (`data-erscheinen`); `<html class="js">` is set inline in the head so content stays visible without JS.
- `fonts/`: self-hosted Playfair Display (variable) + Be Vietnam Pro (400/500/600), latin/latin-ext/vietnamese subsets, OFL licences. `images/`: logo variants, emblem, Hiroshige prints, station; `images/fotos/`: the restaurant's photos, one CC0 mood photo.
- `en/index.html` was generated from `index.html` (same markup, translated text, `../` paths). Keep both in sync by hand.
- `assets/`: originals of the open-licence pictures + `credits.json` (taste-skill `assets.mjs`). Credits are listed in the Impressum (`#bildnachweise`) and footer.
- `material/`: raw material from the restaurant (printed menu pages, logo, `restaurant-infos.md` with open questions). Never published, never referenced by pages.
- Design rules: `DESIGN.md`. Open questions and pre-launch checklist: `README.md` and `material/restaurant-infos.md`.

## Rules

- **German law (no exceptions):** Impressum and Datenschutz linked in the footer of every page. No external requests on page load: no Google Fonts CDN, no tracking, no analytics, no CDN scripts. Third-party embeds (Maps, Instagram, booking widgets) only behind a two-click consent. This keeps the site free of a cookie banner. Prices are final prices incl. MwSt. Allergens (14 main allergens) are labeled on the menu.
- **Reservation:** `tel:` and `mailto:` links only. No form (would need a server).
- **Both languages are first-class:** every text change goes into the DE and EN page; every dish needs `de` and `en`.
- **Design:** the owner rejected the first experimental taste-skill direction and asked for a classic, warm restaurant look (reference: a well-known upscale restaurant site; take principles only, never copy). Current rules are in `DESIGN.md`. The owner's taste wins over skill house rules (pill buttons, centered text, cream background are wanted). Use `impeccable` for build/audit, `ui-ux-pro-max` as UX/accessibility checklist.
- **Pictures:** use the restaurant's own photos and videos (`images/fotos/`, `videos/`). The one remaining stock photo carries a visible "Stimmungsbild" caption; never pass off other restaurants' dishes as Anh Em's. No recognizable guests without consent. Strip audio from social media clips (music rights).
- **Social media:** plain links only (Instagram, Facebook, TikTok), no embedded feeds. QR codes are for print.
- **Mobile first:** opening hours, address and phone must be reachable within one scroll on a 375px screen.
- **Readable code:** identifiers and comments in German, each file starts with a short comment saying what it does. Comment the parts a beginner would get stuck on. No clever tricks.
- **Motion:** every animation has a `prefers-reduced-motion` fallback; content is visible without JS where possible.
