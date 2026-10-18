/* =========================================================
   karte-zwei-klick.js – Google Maps erst nach einem Klick laden
   Warum? Sobald die Google-Karte lädt, bekommt Google die
   IP-Adresse des Besuchers. Nach der DSGVO darf das erst
   passieren, wenn der Besucher es selbst auslöst (Klick).
   Vorher zeigt die Seite nur ein eigenes Bild mit einem Knopf.
   ========================================================= */

(function () {
  const knopf = document.getElementById("karte-laden");
  const behaelter = document.getElementById("karte-zwei-klick");
  if (!knopf || !behaelter) return;

  // Einfache Einbettung ohne API-Schlüssel, Suche nach dem Restaurant
  const KARTEN_ADRESSE =
    "https://maps.google.com/maps?q=Anh+Em,+Bahnhofstra%C3%9Fe+11,+96450+Coburg&z=16&output=embed";

  const sprache = document.documentElement.lang === "en" ? "en" : "de";
  const titel = sprache === "en" ? "Map: Anh Em in Coburg" : "Karte: Anh Em in Coburg";

  knopf.addEventListener("click", function () {
    const rahmen = document.createElement("iframe");
    rahmen.src = KARTEN_ADRESSE;
    rahmen.title = titel;
    rahmen.loading = "lazy";
    rahmen.referrerPolicy = "no-referrer-when-downgrade";
    rahmen.className = "karte-zwei-klick__rahmen";
    behaelter.replaceChildren(rahmen); // Bild und Knopf durch die Karte ersetzen
  });
})();
