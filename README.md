# Anh Em – Restaurant-Website

Website für das Restaurant **Anh Em** (vietnamesische Küche & Sushi-Bar), Bahnhofstraße 11, 96450 Coburg.

Einfaches HTML, CSS und JavaScript, **ohne Build-Schritt, ohne Frameworks, ohne Abhängigkeiten**.
Man kann die Seite direkt per Doppelklick auf `index.html` im Browser öffnen.

## Aufbau

```
restaurant-website/
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
│   ├── navigation.js          Kopfleiste: Handy-Menü auf/zu, Schatten beim Scrollen
│   ├── speisekarte-daten.js   DIE Speisekarte: alle Gerichte, Preise, Allergene (DE + EN)
│   ├── speisekarte.js         baut die Karte: Reiter, Vegetarisch-Filter, Allergen-Legende
│   ├── oeffnungszeiten.js     Live-Anzeige "Jetzt geöffnet" (Uhrzeit in Coburg)
│   ├── karte-zwei-klick.js    Google Maps erst nach Klick laden (Datenschutz)
│   └── bewegung.js            sanftes Einblenden beim Scrollen
├── fonts/                Schriften "Playfair Display" und "Be Vietnam Pro", lokal + Lizenzen
├── images/               Logo, Emblem, Hiroshige-Drucke, Bahnhofsbild (WebP/PNG)
│   └── fotos/            Stimmungsfotos (Laternen, Halong-Bucht, Reisfelder …) → später eigene Fotos
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
Wichtigste Stellen: das große Bild oben (`held__bild`), das Bildband „Tisch reservieren“ (`band__bild`),
die zwei Küchen-Bilder und das Fotoraster „Eindrücke“. Die kleine Angabe „Stimmungsbild: …“ entfernen,
sobald dort ein echtes Foto aus dem Restaurant steht.
Dann im HTML den Dateinamen und den `alt`-Text (Bildbeschreibung) ändern. Werden die alten
frei lizenzierten Bilder entfernt, auch die Bildnachweise im Impressum und Footer anpassen.

### Farben oder Schriftgrößen ändern
Nur in `css/tokens.css`. Alle anderen Dateien benutzen diese Werte.

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
- [ ] Hosting wählen (deutscher Anbieter empfohlen) und Domain einrichten.
      Hoster-Name dann in die Datenschutzerklärung eintragen.
- [ ] Ordner `material/`, `assets/` und `.taste-skill/` **nicht** mit hochladen.

## Testen

Einfach `index.html` doppelklicken. Die englische Seite `en/index.html` ist eine Kopie der deutschen
mit übersetzten Texten: Änderungen am Aufbau immer in **beiden** Dateien machen. Oder mit lokalem Server:

```sh
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

Prüfen: Handy-Breite (Browser schmal ziehen), Speisekarte aufklappen, Vegetarisch-Filter,
„Karte anzeigen“, Sprachwechsel, Impressum/Datenschutz-Links.
