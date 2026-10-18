/* =========================================================
   navigation.js – Kopfleiste
   1. Auf dem Handy: Menü über den Knopf ☰ auf- und zuklappen.
   2. Nach einem Klick auf einen Menüpunkt: Menü wieder schließen.
   3. Sobald man scrollt: leichter Schatten unter der Leiste.
   ========================================================= */

(function () {
  const leiste = document.getElementById("kopfleiste");
  const knopf = document.querySelector(".kopfleiste__menueknopf");
  const menue = document.getElementById("hauptmenue");
  if (!leiste || !knopf || !menue) return;

  function setzeOffen(offen) {
    menue.classList.toggle("ist-offen", offen);
    knopf.setAttribute("aria-expanded", String(offen)); // für Screenreader und das X-Symbol
  }

  knopf.addEventListener("click", function () {
    setzeOffen(knopf.getAttribute("aria-expanded") !== "true");
  });

  // Klick auf einen Link im Menü → Menü schließen (auf dem Handy)
  menue.addEventListener("click", function (ereignis) {
    if (ereignis.target.closest("a")) setzeOffen(false);
  });

  // Escape-Taste schließt das Menü
  document.addEventListener("keydown", function (ereignis) {
    if (ereignis.key === "Escape") setzeOffen(false);
  });

  // Schatten unter der Leiste, sobald die Seite gescrollt ist
  function pruefeScroll() {
    leiste.classList.toggle("ist-gescrollt", window.scrollY > 8);
  }
  window.addEventListener("scroll", pruefeScroll, { passive: true });
  pruefeScroll();
})();
