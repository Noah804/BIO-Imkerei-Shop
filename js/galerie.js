/* ============================================================
   galerie.js — die Fotos der Galerie an EINER Stelle
   ============================================================

   So fügst du ein Foto hinzu:
   1. Foto in den Ordner assets/images/ legen (z. B. "bienenstock.jpg").
   2. Unten einen { ... }-Block kopieren und die Werte anpassen.
      (auf das Komma am Ende achten!)

   Felder je Foto:
     bild      Pfad zum Foto, z. B. "assets/images/bienenstock.jpg"
     titel     kurzer Text, der unter dem Foto steht (darf auch leer "" sein)

   Fehlt ein Foto oder ist der Pfad falsch, wird automatisch das
   Platzhalter-Bild angezeigt.
   ============================================================ */

const GALERIE = [
  {
    bild: "assets/images/bienenschwarm.jpg",
    titel: "Ein natürlicher Bienenschwarm an unserem Stand",
  },
  // ---- BEISPIEL-PLATZHALTER: durch echte Fotos ersetzen ----
  {
    bild: "assets/images/platzhalter.svg",
    titel: "Hier könnte ein Foto vom Bienenstock stehen",
  },
  {
    bild: "assets/images/platzhalter.svg",
    titel: "Hier könnte ein Foto von der Honigernte stehen",
  },
  {
    bild: "assets/images/platzhalter.svg",
    titel: "Hier könnte ein Foto von den Bienen stehen",
  },
];
