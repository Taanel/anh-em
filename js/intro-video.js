/* =========================================================
   intro-video.js – Steuert das Hintergrund-Video ganz oben
   - Startet es automatisch und stumm. Es läuft einmal und bleibt
     dann auf dem letzten Bild mit dem Logo stehen.
   - Wer "weniger Bewegung" eingestellt hat, sieht nur das Standbild.
   - Ein kleiner runder Knopf hält das Video an oder startet es.
     (Bewegte Inhalte müssen sich anhalten lassen, das verlangt die
     Barrierefreiheit.) Nach dem Ende verschwindet der Knopf.
   Ohne JavaScript bleibt einfach das Standbild stehen.
   ========================================================= */

(function () {
  const video = document.getElementById("intro-video");
  const knopf = document.getElementById("intro-knopf");
  if (!video || !knopf) return;

  const TEXTE = {
    de: { abspielen: "Video abspielen", pause: "Video anhalten" },
    en: { abspielen: "Play video", pause: "Pause video" }
  };
  const t = TEXTE[document.documentElement.lang === "en" ? "en" : "de"];

  function aktualisiereKnopf() {
    knopf.hidden = video.ended;
    knopf.dataset.zustand = video.paused ? "angehalten" : "laeuft"; // CSS zeigt danach das passende Symbol
    knopf.setAttribute("aria-label", video.paused ? t.abspielen : t.pause);
  }

  knopf.addEventListener("click", function () {
    if (video.paused) video.play();
    else video.pause();
  });

  ["play", "pause", "ended"].forEach(function (ereignis) {
    video.addEventListener(ereignis, aktualisiereKnopf);
  });
  aktualisiereKnopf();

  // Automatisch starten, außer bei "weniger Bewegung".
  // play() kann scheitern (z. B. Stromsparmodus): dann bleibt das Standbild stehen.
  const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!wenigerBewegung) {
    video.play().catch(aktualisiereKnopf);
  }
})();
