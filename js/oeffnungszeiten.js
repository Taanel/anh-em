/* =========================================================
   oeffnungszeiten.js – "Jetzt geöffnet"-Anzeige im großen Bild oben
   Rechnet immer mit der Uhrzeit in Coburg (Europe/Berlin),
   auch wenn jemand die Seite aus dem Ausland öffnet.
   Ohne JavaScript bleibt der feste Text aus der HTML-Datei stehen.
   ========================================================= */

(function () {
  // Öffnungszeiten pro Wochentag (0 = Sonntag, 1 = Montag … 6 = Samstag).
  // Jede Zeile: Liste von Zeitfenstern [von, bis] im Format "SS:MM".
  // Ruhetag = leere Liste [].
  // TODO: vom Restaurant bestätigen lassen (Sonntag Ruhetag?).
  const ZEITEN = {
    0: [["11:00", "15:00"], ["17:00", "22:00"]],
    1: [["11:00", "15:00"], ["17:00", "22:00"]],
    2: [["11:00", "15:00"], ["17:00", "22:00"]],
    3: [["11:00", "15:00"], ["17:00", "22:00"]],
    4: [["11:00", "15:00"], ["17:00", "22:00"]],
    5: [["11:00", "15:00"], ["17:00", "22:00"]],
    6: [["11:00", "15:00"], ["17:00", "22:00"]]
  };

  const sprache = document.documentElement.lang === "en" ? "en" : "de";
  const TEXTE = {
    de: {
      offen: "Jetzt geöffnet",
      zu: "Gerade geschlossen",
      pause: "Gerade Mittagspause",
      schliesst: (dauer, uhr) => "bis " + uhr + " (noch " + dauer + ")",
      oeffnet: (uhr, tag) => "Wieder offen " + tag + " um " + uhr,
      heute: "heute",
      morgen: "morgen",
      heuteZeiten: (fenster) => "Heute: " + fenster,
      ruhetag: "Heute Ruhetag",
      std: "Std",
      min: "Min",
      uhr: " Uhr"
    },
    en: {
      offen: "Open now",
      zu: "Closed right now",
      pause: "Lunch break",
      schliesst: (dauer, uhr) => "until " + uhr + " (" + dauer + " left)",
      oeffnet: (uhr, tag) => "Open again " + tag + " at " + uhr,
      heute: "today",
      morgen: "tomorrow",
      heuteZeiten: (fenster) => "Today: " + fenster,
      ruhetag: "Closed today",
      std: "h",
      min: "min",
      uhr: ""
    }
  };
  const t = TEXTE[sprache];

  // "11:30" → 690 (Minuten seit Mitternacht)
  function inMinuten(text) {
    const teile = text.split(":");
    return Number(teile[0]) * 60 + Number(teile[1]);
  }

  // 75 → "1 Std 15 Min"
  function dauerText(minuten) {
    const h = Math.floor(minuten / 60);
    const m = minuten % 60;
    return (h > 0 ? h + " " + t.std + " " : "") + m + " " + t.min;
  }

  // Aktueller Wochentag und Uhrzeit in Coburg
  function jetztInCoburg() {
    const teile = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Berlin",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());
    const wert = (typ) => teile.find((teil) => teil.type === typ).value;
    const tage = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      tag: tage.indexOf(wert("weekday")),
      minuten: Number(wert("hour")) * 60 + Number(wert("minute"))
    };
  }

  function aktualisiere() {
    const jetzt = jetztInCoburg();
    const heute = ZEITEN[jetzt.tag];
    const status = document.getElementById("status");
    const detail = document.getElementById("status-detail");
    const punkt = document.getElementById("status-punkt");     // farbiger Punkt (optional)
    const heuteFeld = document.getElementById("status-heute"); // Zeile "Heute: …" (optional)
    if (!status || !detail) return;

    // Kleine Hilfe: Haupttext, Zusatztext und Punktfarbe in einem Rutsch setzen
    function zeige(haupt, zusatz, offen) {
      status.textContent = haupt;
      detail.textContent = " · " + zusatz;
      if (punkt) {
        punkt.classList.toggle("ist-offen", offen);
        punkt.classList.toggle("ist-zu", !offen);
      }
    }

    // Zeile "Heute: 11–15 · 17–22 Uhr" (nur wenn es das Feld auf der Seite gibt)
    if (heuteFeld) {
      heuteFeld.textContent = heute.length
        ? t.heuteZeiten(heute.map((f) => f[0] + "–" + f[1]).join(" · ") + t.uhr)
        : t.ruhetag;
    }

    // Sind wir gerade in einem Zeitfenster?
    const offenesFenster = heute.find(
      (f) => jetzt.minuten >= inMinuten(f[0]) && jetzt.minuten < inMinuten(f[1])
    );
    if (offenesFenster) {
      zeige(t.offen, t.schliesst(
        dauerText(inMinuten(offenesFenster[1]) - jetzt.minuten),
        offenesFenster[1] + t.uhr
      ), true);
      return;
    }

    // Geschlossen: nächstes Fenster heute suchen, sonst morgen …
    const spaeterHeute = heute.find((f) => inMinuten(f[0]) > jetzt.minuten);
    if (spaeterHeute) {
      // Ein Fenster heute war schon vorbei → es ist Mittagspause
      const istPause = heute.some((f) => inMinuten(f[1]) <= jetzt.minuten);
      zeige(istPause ? t.pause : t.zu, t.oeffnet(spaeterHeute[0] + t.uhr, t.heute), false);
      return;
    }
    for (let i = 1; i <= 7; i++) {
      const tag = (jetzt.tag + i) % 7;
      if (ZEITEN[tag].length) {
        const tagName = i === 1
          ? t.morgen
          : new Intl.DateTimeFormat(sprache, { weekday: "long" }).format(
              new Date(2024, 0, 7 + tag) // 7. Januar 2024 war ein Sonntag
            );
        zeige(t.zu, t.oeffnet(ZEITEN[tag][0][0] + t.uhr, tagName), false);
        return;
      }
    }
  }

  aktualisiere();
  setInterval(aktualisiere, 30 * 1000); // alle 30 Sekunden neu berechnen
})();
