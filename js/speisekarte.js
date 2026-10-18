/* =========================================================
   speisekarte.js – Baut die Speisekarte aus den Daten
   Liest window.SPEISEKARTE und window.SPEISEKARTE_GRUPPEN
   (aus speisekarte-daten.js) und erzeugt:
   - je Gruppe (Küche, Sushi …) einen Reiter,
   - je Kategorie einen aufklappbaren Kasten,
   - den Schalter "Nur vegetarisch",
   - die Legende der Allergene und Zusatzstoffe.
   Die Sprache kommt aus <html lang="de"> bzw. lang="en".
   ========================================================= */

(function () {
  const ziel = document.getElementById("speisekarte");
  if (!ziel || !window.SPEISEKARTE) return;

  const sprache = document.documentElement.lang === "en" ? "en" : "de";

  // Wörter, die das Skript selbst schreibt, in beiden Sprachen
  const TEXTE = {
    de: {
      scharf: "scharf",
      vegetarisch: "vegetarisch",
      allergene: "Allergene",
      filter: "Nur vegetarische Gerichte zeigen",
      legende: "Allergene und Zusatzstoffe",
      reiterLabel: "Bereiche der Speisekarte"
    },
    en: {
      scharf: "spicy",
      vegetarisch: "vegetarian",
      allergene: "Allergens",
      filter: "Show vegetarian dishes only",
      legende: "Allergens and additives",
      reiterLabel: "Menu sections"
    }
  };
  const t = TEXTE[sprache];

  // 5.9 → "5,90 €" (deutsch) bzw. "€5.90" (englisch)
  const preisFormat = new Intl.NumberFormat(sprache === "de" ? "de-DE" : "en-GB", {
    style: "currency",
    currency: "EUR"
  });

  // Kleines Hilfsmittel: erstellt ein HTML-Element mit Klasse und Text.
  // textContent statt innerHTML, damit nie versehentlich HTML eingeschleust wird.
  function element(tag, klasse, text) {
    const el = document.createElement(tag);
    if (klasse) el.className = klasse;
    if (text) el.textContent = text;
    return el;
  }

  // Zusatzinfos: "scharf · vegetarisch · Allergene: B"
  function infoZeile(eintrag) {
    const teile = [];
    if (eintrag.scharf) teile.push(t.scharf);
    if (eintrag.vegetarisch) teile.push(t.vegetarisch);
    if (eintrag.allergene) teile.push(t.allergene + ": " + eintrag.allergene);
    return teile.join(" · ");
  }

  // Ist ein Gericht vegetarisch (selbst oder mindestens eine Variante)?
  function istVegetarisch(gericht) {
    if (gericht.vegetarisch) return true;
    return (gericht.varianten || []).some((variante) => variante.vegetarisch);
  }

  function baueGericht(gericht) {
    const li = element("li", "gericht");
    li.dataset.veg = istVegetarisch(gericht) ? "ja" : "nein";

    // Kopfzeile: Nummer + Name (+ Menge) links, Preis rechts
    const kopf = element("div", "gericht__kopf");
    const name = element("p", "gericht__name");
    if (gericht.nr) name.append(element("span", "gericht__nr", gericht.nr));
    name.append(gericht.name);
    if (gericht.menge) name.append(element("span", "gericht__menge", gericht.menge[sprache]));
    kopf.append(name);
    if (gericht.preis) {
      kopf.append(element("span", "gericht__preis", preisFormat.format(gericht.preis)));
    }
    li.append(kopf);

    // Beschreibung und Infos darunter
    const info = [gericht[sprache], infoZeile(gericht)].filter(Boolean).join(" · ");
    if (info) li.append(element("p", "gericht__info", info));

    // Varianten (A. Lachs, B. Hähnchen … oder Größen wie 0,2 l) mit eigenem Preis
    if (gericht.varianten) {
      const liste = element("ul", "gericht__varianten");
      gericht.varianten.forEach(function (variante) {
        const zeile = element("li");
        const extra = infoZeile(variante);
        const text = (variante.buchstabe ? variante.buchstabe + ". " : "") +
          variante[sprache] + (extra ? " (" + extra + ")" : "");
        zeile.append(
          element("span", "", text),
          element("span", "gericht__preis", preisFormat.format(variante.preis))
        );
        liste.append(zeile);
      });
      li.append(liste);
    }
    return li;
  }

  function baueKategorie(kategorie, offen) {
    const details = element("details", "kategorie");
    details.open = offen;

    details.append(element("summary", "", kategorie.titel[sprache]));
    if (kategorie.hinweis) {
      details.append(element("p", "kategorie__hinweis", kategorie.hinweis[sprache]));
    }

    const liste = element("ul", "kategorie__gerichte");
    kategorie.gerichte.forEach(function (gericht) {
      liste.append(baueGericht(gericht));
    });
    details.append(liste);
    return details;
  }

  // --- Reiter: Küche / Sushi / Desserts / Getränke ---
  // Pro Gruppe ein Knopf (Reiter) und ein Bereich (Panel). Immer nur ein Bereich ist sichtbar.
  const reiterLeiste = element("div", "reiter");
  reiterLeiste.setAttribute("role", "tablist");
  reiterLeiste.setAttribute("aria-label", t.reiterLabel);
  ziel.append(reiterLeiste);

  // --- Schalter "Nur vegetarisch" ---
  const filter = element("label", "karte__filter");
  const kaestchen = document.createElement("input");
  kaestchen.type = "checkbox";
  filter.append(kaestchen, element("span", "", t.filter));
  ziel.append(filter);

  // Kategorien nach deutschem Titel nachschlagen
  const nachTitel = {};
  window.SPEISEKARTE.forEach((kategorie) => { nachTitel[kategorie.titel.de] = kategorie; });

  const reiterKnoepfe = [];
  const bereiche = [];

  (window.SPEISEKARTE_GRUPPEN || []).forEach(function (gruppe, nummer) {
    // Reiter-Knopf
    const knopf = element("button", "", gruppe.titel[sprache]);
    knopf.type = "button";
    knopf.id = "reiter-" + nummer;
    knopf.setAttribute("role", "tab");
    knopf.setAttribute("aria-controls", "bereich-" + nummer);
    knopf.addEventListener("click", () => zeigeReiter(nummer));
    reiterLeiste.append(knopf);
    reiterKnoepfe.push(knopf);

    // Bereich mit den Kategorien dieser Gruppe
    const bereich = element("div", "karte__gruppe");
    bereich.id = "bereich-" + nummer;
    bereich.setAttribute("role", "tabpanel");
    bereich.setAttribute("aria-labelledby", knopf.id);
    if (gruppe.getraenke) bereich.dataset.getraenke = "ja";

    gruppe.kategorien.forEach(function (titel, i) {
      const kategorie = nachTitel[titel];
      if (!kategorie) {
        console.warn("Kategorie nicht gefunden:", titel); // Tippfehler in SPEISEKARTE_GRUPPEN?
        return;
      }
      bereich.append(baueKategorie(kategorie, i === 0)); // erste Kategorie jeder Gruppe offen
    });
    ziel.append(bereich);
    bereiche.push(bereich);
  });

  function zeigeReiter(nummer) {
    reiterKnoepfe.forEach(function (knopf, i) {
      const aktiv = i === nummer;
      knopf.setAttribute("aria-selected", String(aktiv));
      knopf.tabIndex = aktiv ? 0 : -1; // nur der aktive Reiter ist per Tab-Taste erreichbar
      bereiche[i].hidden = !aktiv;
    });
  }
  zeigeReiter(0);

  // Pfeiltasten links/rechts wechseln zwischen den Reitern (übliche Bedienung)
  reiterLeiste.addEventListener("keydown", function (ereignis) {
    const jetzt = reiterKnoepfe.indexOf(document.activeElement);
    if (jetzt < 0) return;
    let neu = jetzt;
    if (ereignis.key === "ArrowRight") neu = (jetzt + 1) % reiterKnoepfe.length;
    if (ereignis.key === "ArrowLeft") neu = (jetzt - 1 + reiterKnoepfe.length) % reiterKnoepfe.length;
    if (neu !== jetzt) {
      zeigeReiter(neu);
      reiterKnoepfe[neu].focus();
    }
  });

  // Links auf der Seite mit data-reiter="1" öffnen direkt den passenden Reiter
  document.querySelectorAll("[data-reiter]").forEach(function (link) {
    link.addEventListener("click", () => zeigeReiter(Number(link.dataset.reiter)));
  });

  // Filter anwenden: Gerichte ohne Vegetarisch-Kennzeichen ausblenden.
  // Kategorien, in denen dann nichts mehr übrig ist, verschwinden ganz.
  kaestchen.addEventListener("change", function () {
    ziel.classList.toggle("nur-vegetarisch", kaestchen.checked);
    ziel.querySelectorAll(".karte__gruppe:not([data-getraenke]) .kategorie").forEach(function (kategorie) {
      const sichtbar = !kaestchen.checked || kategorie.querySelector('[data-veg="ja"]');
      kategorie.hidden = !sichtbar;
      if (kaestchen.checked && sichtbar) kategorie.open = true;
    });
  });

  // --- Legende der Allergene und Zusatzstoffe ---
  const legendeZiel = document.getElementById("allergene-legende");
  if (legendeZiel && window.ALLERGENE) {
    const details = element("details", "kategorie kategorie--legende");
    details.append(element("summary", "", t.legende));
    const spalten = element("div", "legende");
    [window.ALLERGENE, window.ZUSATZSTOFFE].forEach(function (tabelle) {
      const liste = element("dl", "legende__liste");
      Object.keys(tabelle).forEach(function (kuerzel) {
        liste.append(element("dt", "", kuerzel), element("dd", "", tabelle[kuerzel][sprache]));
      });
      spalten.append(liste);
    });
    details.append(spalten);
    legendeZiel.append(details);
  }
})();
