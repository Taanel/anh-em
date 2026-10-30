/* =========================================================
   raster-video.js – Das kleine Video im Fotoraster "Eindrücke"
   Es läuft nur, solange es im Bild ist, stumm und in Schleife.
   So verbraucht es keine Daten, solange niemand dorthin scrollt.
   Ein kleiner Knopf hält es an. Wer "weniger Bewegung" eingestellt
   hat, sieht nur das Standbild und kann es selbst starten.
   ========================================================= */

(function () {
  const video = document.getElementById("raster-video");
  const knopf = document.getElementById("raster-knopf");
  if (!video || !knopf) return;

  const TEXTE = {
    de: { abspielen: "Video abspielen", pause: "Video anhalten" },
    en: { abspielen: "Play video", pause: "Pause video" }
  };
  const t = TEXTE[document.documentElement.lang === "en" ? "en" : "de"];
  const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hat jemand selbst auf Pause gedrückt, startet das Video nicht mehr von allein
  let vonHandAngehalten = wenigerBewegung;

  function aktualisiereKnopf() {
    knopf.dataset.zustand = video.paused ? "angehalten" : "laeuft"; // CSS zeigt das passende Symbol
    knopf.setAttribute("aria-label", video.paused ? t.abspielen : t.pause);
  }

  knopf.hidden = false;
  knopf.addEventListener("click", function () {
    if (video.paused) {
      vonHandAngehalten = false;
      video.play();
    } else {
      vonHandAngehalten = true;
      video.pause();
    }
  });
  video.addEventListener("play", aktualisiereKnopf);
  video.addEventListener("pause", aktualisiereKnopf);
  aktualisiereKnopf();

  if (!("IntersectionObserver" in window)) return;
  new IntersectionObserver(function (eintraege) {
    const sichtbar = eintraege[eintraege.length - 1].isIntersecting;
    if (sichtbar && !vonHandAngehalten) video.play().catch(aktualisiereKnopf);
    if (!sichtbar) video.pause();
  }, { threshold: 0.3 }).observe(video);
})();
