# Anh Em – Restaurant-Website

Website für das Restaurant **Anh Em** (vietnamesische Küche & Sushi-Bar), Bahnhofstraße 11, 96450 Coburg.

Einfaches HTML, CSS und JavaScript, **ohne Build-Schritt, ohne Frameworks, ohne Abhängigkeiten**.
Man kann die Seite direkt per Doppelklick auf `index.html` im Browser öffnen.

## Aufbau

```
anh-em/
├── index.html            Startseite (Deutsch)
├── impressum.html        Impressum (Pflicht)
├── datenschutz.html      Datenschutzerklärung (Pflicht)
├── en/                   Englische Versionen: index.html, imprint.html, privacy.html
├── css/
│   ├── tokens.css        ALLE Farben, Schriften, Größen, Abstände an einer Stelle
│   ├── base.css          Grundeinstellungen (Reset, Schrift, Fokus-Rahmen)
│   ├── layout.css        Wo was steht (Kopfleiste, Abschnitte, Spalten), Handy zuerst
│   └── components.css    Einzelne Bausteine (Knöpfe, Speisekarte, Fotoraster, Footer, Animationen)
├── js/
│   ├── intro-video.js         Hintergrund-Video oben: Autostart ohne Ton, kleiner Pause-Knopf
│   ├── raster-video.js        Video im Fotoraster: läuft nur, solange es sichtbar ist
│   ├── navigation.js          Kopfleiste: Handy-Menü auf/zu, Schatten beim Scrollen
│   ├── speisekarte-daten.js   DIE Speisekarte: alle Gerichte, Preise, Allergene (DE + EN)
│   ├── speisekarte.js         baut die Karte: Reiter, Vegetarisch-Filter, Allergen-Legende
│   ├── oeffnungszeiten.js     Live-Anzeige "Jetzt geöffnet" (Uhrzeit in Coburg)
│   ├── karte-zwei-klick.js    Google Maps erst nach Klick laden (Datenschutz)
│   └── bewegung.js            sanftes Einblenden beim Scrollen
├── fonts/                Schriften "Playfair Display" und "Be Vietnam Pro", lokal + Lizenzen
├── images/               Logo, Emblem, Standbild des Videos
│   └── fotos/            Fotos aus dem Restaurant
├── videos/               Hintergrund-Video oben und kurzes Sushi-Video (komprimiert, ohne Ton)
├── favicon.png           Symbol im Browser-Tab
├── assets/               Originale der frei lizenzierten Bilder + credits.json (Quellen/Lizenzen)
├── material/             Rohmaterial vom Restaurant (gedruckte Karte, Logo). Nicht veröffentlichen!
├── DESIGN.md             Design-Regeln: Farben, Schrift, Aufbau, was man vermeiden soll
└── CLAUDE.md             Regeln für die Arbeit mit Claude Code
```

## Häufige Änderungen

### Speisekarte ändern
Nur in **`js/speisekarte-daten.js`**. Deutsche und englische Seite lesen beide von dort.
Ein Gericht sieht so aus:

```js
{ nr: "M21", name: "Sake", allergene: "B", de: "Lachs", en: "salmon", preis: 5.50 },
```

- Preis mit **Punkt** statt Komma (`5.50`, nicht `5,50`).
- `vegetarisch: true` oder `scharf: true` ergänzen, wenn passend.
- Gerichte mit Varianten (Lachs, Hähnchen …) haben statt `preis` eine Liste `varianten`. Beispiele stehen in der Datei.
- Neue Kategorie? Zusätzlich in `SPEISEKARTE_GRUPPEN` (unten in derselben Datei) eintragen, sonst erscheint sie nicht.

### Öffnungszeiten ändern
An **drei** Stellen, jeweils in `index.html` und `en/index.html`:
1. `js/oeffnungszeiten.js` → `ZEITEN` (für die Live-Anzeige)
2. Abschnitt „Zeiten & Anfahrt“ und Footer im HTML
3. Block `openingHoursSpecification` oben im `<head>` (für Google)

### Fotos austauschen
Neue Fotos zuerst verkleinern (z. B. 800 px und 1600 px breit, als WebP) und in `images/fotos/` legen.
Stellen: das Bildband „Tisch reservieren“ (`band__bild`), die zwei Highlight-Bilder, das Fotoraster „Eindrücke“
und das Bild vor der Karte. Beim Kräuter-Foto (noch ein Stimmungsbild) die Angabe „Stimmungsbild: …“ entfernen,
sobald dort ein eigenes Foto eines vietnamesischen Gerichts steht, und den Nachweis im Impressum löschen.
Dann im HTML den Dateinamen und den `alt`-Text (Bildbeschreibung) ändern. Werden die alten
frei lizenzierten Bilder entfernt, auch die Bildnachweise im Impressum und Footer anpassen.

### Hintergrund-Video austauschen
Neues Video komprimieren und nach `videos/anh-em-intro.mp4` legen (`-an` entfernt den Ton):

```bash
ffmpeg -i neues-video.mp4 -vf fps=30 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an videos/anh-em-intro.mp4
```

Danach auch das Standbild `images/intro-standbild.webp` aus dem letzten Bild neu erzeugen.
Das Original mit Musik liegt in `material/intro-video-original-mit-ton.mp4` (wird nicht hochgeladen).

### Farben oder Schriftgrößen ändern
Nur in `css/tokens.css`. Alle anderen Dateien benutzen diese Werte.

### Social-Media-Links ändern
Die Adressen stehen in `index.html` und `en/index.html`: bei den Knöpfen unter „Eindrücke“, im Footer
und oben bei `sameAs`. Die QR-Codes in `material/` sind für Gedrucktes (Speisekarte, Aufsteller, Fenster).

## Datenschutz – bitte beibehalten

Die Seite lädt beim Öffnen **nichts von fremden Servern**: keine Google Fonts, kein Tracking,
keine eingebetteten Instagram-Posts. Google Maps lädt erst nach einem Klick.
Deshalb braucht die Seite **kein Cookie-Banner**. Wer etwas Externes einbaut
(z. B. ein Reservierungs-Widget), muss Datenschutzerklärung und ggf. Einwilligung anpassen.

## Vor dem Veröffentlichen (Checkliste)

- [ ] Impressum und Datenschutz: alle **gelb markierten** Stellen `[...]` ausfüllen (DE und EN).
      Am besten mit einem Generator (z. B. e-recht24.de) gegenprüfen. Keine Rechtsberatung.
- [ ] Öffnungszeiten bestätigen: Sonntag geöffnet oder Ruhetag? (siehe `material/restaurant-infos.md`)
- [ ] Speisekarte mit dem Restaurant durchgehen. Die gedruckte Karte weicht laut Inhaber etwas vom aktuellen Stand ab.
- [ ] Offene Fragen zur Karte klären (Liste in `material/restaurant-infos.md`).
- [ ] Text „Über uns“ und die Empfehlungslisten vom Inhaber freigeben lassen.
- [ ] Eigene Fotos (Essen, Innenraum, außen) einsetzen.
- [ ] Endgültiges Hosting entscheiden: GitHub Pages behalten oder deutscher Anbieter + Domain.
      Bei Wechsel die Datenschutzerklärung (Abschnitt Hosting) anpassen.
- [ ] Vorschau-Sperre aufheben (siehe „Online (Vorschau)“).
- [ ] Ordner `material/`, `assets/` und `.taste-skill/` **nicht** mit hochladen.

## Online (Vorschau)

Die Seite liegt als **Vorschau** auf GitHub Pages: **https://taanel.github.io/anh-em/**
(Code-Projekt: https://github.com/Taanel/anh-em). Suchmaschinen sind ausgesperrt
(`noindex` in den Seiten + `robots.txt`), nur wer den Link hat, findet sie.

**Änderungen online stellen** (im Ordner `anh-em`):

```sh
git add -A
git commit -m "Kurz beschreiben, was geändert wurde"
git push
```

Nach etwa einer Minute ist die neue Version online. `material/`, `assets/` und `.taste-skill/`
werden dank `.gitignore` nie hochgeladen.

**Wenn die Seite fertig ist** (Impressum vollständig, Inhaber hat alles freigegeben):
1. In `index.html` und `en/index.html` die Zeile `<meta name="robots" content="noindex, nofollow">` löschen.
2. In `robots.txt` `Disallow: /` durch `Allow: /` ersetzen.
3. Optional eigene Domain einrichten. Bei einem Umzug zu einem deutschen Hoster den Abschnitt
   „Hosting“ in der Datenschutzerklärung (DE und EN) anpassen.

## Testen

Einfach `index.html` doppelklicken. Die englische Seite `en/index.html` ist eine Kopie der deutschen
mit übersetzten Texten: Änderungen am Aufbau immer in **beiden** Dateien machen. Oder mit lokalem Server:

```sh
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

Prüfen: Handy-Breite (Browser schmal ziehen), Speisekarte aufklappen, Vegetarisch-Filter,
„Karte anzeigen“, Sprachwechsel, Impressum/Datenschutz-Links.
