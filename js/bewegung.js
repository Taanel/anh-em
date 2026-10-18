/* =========================================================
   bewegung.js – Einblenden beim Scrollen
   Jeder Abschnitt mit dem Attribut data-erscheinen bekommt die
   Klasse "sichtbar", sobald er ins Bild scrollt. Das CSS lässt
   dann seine Teile nacheinander sanft von unten einschweben.
   Wer "weniger Bewegung" eingestellt hat, sieht alles sofort.
   ========================================================= */

(function () {
  const abschnitte = document.querySelectorAll("[data-erscheinen]");
  const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ohne IntersectionObserver (sehr alte Browser) oder bei "weniger Bewegung":
  // alles sofort zeigen.
  if (wenigerBewegung || !("IntersectionObserver" in window)) {
    abschnitte.forEach((abschnitt) => abschnitt.classList.add("sichtbar"));
    return;
  }

  const beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (eintrag) {
      if (eintrag.isIntersecting) {
        eintrag.target.classList.add("sichtbar");
        beobachter.unobserve(eintrag.target); // nur einmal abspielen
      }
    });
  }, { threshold: 0.15 });

  abschnitte.forEach((abschnitt) => beobachter.observe(abschnitt));

})();
