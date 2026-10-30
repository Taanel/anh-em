/* =========================================================
   intro-video.js – Steuert das Intro-Video ganz oben
   - Startet es automatisch und stumm (Browser erlauben Autoplay
     nur ohne Ton). Am Ende bleibt das letzte Bild mit dem Logo stehen.
   - Wer "weniger Bewegung" eingestellt hat, sieht nur das Standbild
     und kann das Video selbst starten.
   - Zwei Knöpfe: Abspielen/Pause und Ton an/aus.
   Ohne JavaScript zeigt der Browser seine eigene Video-Steuerung.
   ========================================================= */

(function () {
  const video = document.getElementById("intro-video");
  const steuerung = document.getElementById("intro-steuerung");
  const knopfSpielen = document.getElementById("intro-spielen");
  const knopfTon = document.getElementById("intro-ton");
  if (!video || !steuerung || !knopfSpielen || !knopfTon) return;

  const TEXTE = {
    de: { abspielen: "Abspielen", pause: "Pause", nochmal: "Nochmal ansehen", tonAn: "Ton an", tonAus: "Ton aus" },
    en: { abspielen: "Play", pause: "Pause", nochmal: "Watch again", tonAn: "Sound on", tonAus: "Sound off" }
  };
  const t = TEXTE[document.documentElement.lang === "en" ? "en" : "de"];

  // JavaScript läuft: eigene Knöpfe statt der Browser-Steuerung
  video.controls = false;
  steuerung.hidden = false;

  function aktualisiereKnoepfe() {
    if (video.ended) knopfSpielen.textContent = t.nochmal;
    else knopfSpielen.textContent = video.paused ? t.abspielen : t.pause;
    knopfTon.textContent = video.muted ? t.tonAn : t.tonAus;
  }

  knopfSpielen.addEventListener("click", function () {
    if (video.paused || video.ended) video.play(); // play() beginnt nach dem Ende von vorn
    else video.pause();
  });

  knopfTon.addEventListener("click", function () {
    video.muted = !video.muted;
    aktualisiereKnoepfe();
  });

  ["play", "pause", "ended"].forEach(function (ereignis) {
    video.addEventListener(ereignis, aktualisiereKnoepfe);
  });
  aktualisiereKnoepfe();

  // Automatisch starten, außer bei "weniger Bewegung".
  // play() kann scheitern (z. B. Stromsparmodus): dann bleibt das Standbild stehen.
  const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!wenigerBewegung) {
    video.play().catch(aktualisiereKnoepfe);
  }
})();
