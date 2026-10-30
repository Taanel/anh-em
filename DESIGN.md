# DESIGN.md – Anh Em

Gestaltungsregeln dieser Website (Stand Oktober 2026, zweite Fassung).
Wunsch des Inhabers: klassisch, warm und einladend wie eine gehobene Restaurant-Website,
mit großem Intro-Video oben, klassischer Navigation und Fotoraster. Die erste, experimentelle
Fassung („Name als Monument“, dunkel, Blockschrift) wurde verworfen.

## Grundidee

Helle, warme Seite (Creme mit feiner Papierstruktur) mit dunklen, stimmungsvollen Bildern als Kontrast.
Die Farben kommen aus dem Logo und der gedruckten Speisekarte: **Rot** für Aktionen, **Gold** für Zierde.

## Farben (`css/tokens.css`)

| Token | Wert | Wofür |
|---|---|---|
| `--grund` / `--grund-2` / `--grund-3` | #f6f1e8 / #eee5d6 / #e4d8c4 | Hintergrund, Speisekarten-Abschnitt, Hover |
| `--tinte` / `--tinte-weich` | #2b211c / #6b5d52 | Text, Nebentext |
| `--rot` / `--rot-dunkel` | #b72029 / #93171f | Logo-Rot: Reservieren-Knöpfe, Textlinks |
| `--gold` / `--gold-text` | #b88a3e / #87621f | Zierlinien, Nummern, Footer-Titel |
| `--nacht` / `--hell` | #1d1613 / #fbf8f3 | Footer, Bild-Abdunklung, Text auf Bildern |

## Schrift

- Überschriften: **Playfair Display** (Serifenschrift, elegant)
- Text: **Be Vietnam Pro** (in Vietnam für Vietnamesisch entworfen, z. B. „Phở“)
- Beide lokal in `fonts/` (kein Google-Server). Lizenz: SIL Open Font License.

## Aufbau der Startseite

1. Feste Kopfleiste: Emblem + „ANH EM“, Menü, roter Knopf „Reservieren“. Handy: Menüknopf ☰.
2. Intro-Video (eigene Produktion, zeigt selbst Logo, Name und Adresse, darum kein Text darüber). Darunter eine dunkle Leiste mit Live-Status und zwei Knöpfen. Handy: quadratischer Ausschnitt.
3. Willkommen (zentriert) mit Knöpfen Anrufen / Reservieren / Route.
4. Unsere Highlights: „Vietnamesische Spezialitäten“ und „Sushi & Special Rolls“, Bild + Text + drei Empfehlungen, abwechselnd links/rechts. (Keine Namensdeutung „Anh em = Brüder“ – vom Inhaber-Umfeld als unpassend empfunden.)
5. Bildband „Tisch reservieren“ mit großer Telefonnummer.
6. Speisekarte: Reiter (Küche, Sushi, Desserts, Getränke), Vegetarisch-Filter, aufklappbare Kategorien.
7. Eindrücke: Fotoraster (5 Spalten Desktop, 2 Handy) mit Bildunterschriften.
8. Besuch: Karte (erst nach Klick) + Adresse, Zeiten, Kontakt.
9. Dunkler Footer.

## Regeln

- Knöpfe rund (Pillenform), Karten und Bilder mit 6 px Ecken.
- Über jeder Abschnittsüberschrift die goldene Zierzeile (Linie – Raute – Linie).
- Stimmungsbilder bekommen immer eine Orts-/Bildangabe („Stimmungsbild: …“), damit niemand
  sie für das Restaurant selbst hält. Sobald eigene Fotos da sind, diese bevorzugen.
- Keine Fotos fremder Gerichte als „unser Essen“.
- Bewegung: Intro-Video (einmal, stumm, Pause- und Tonknopf; bei „weniger Bewegung“ nur Standbild), sanftes Einblenden beim Scrollen, Hover auf Knöpfen und Fotos.
  Bei „weniger Bewegung“ ist alles still.
