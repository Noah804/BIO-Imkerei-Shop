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
    bild: "assets/images/flugloch.jpg",
    titel: "Unsere Bienen am Flugloch",
  },
  {
    bild: "assets/images/bienen_zuhause.jpeg",
    titel: "Die bunten Bienenstöcke im Garten",
  },
  {
    bild: "assets/images/bienenstand.jpg",
    titel: "Unser Bienenstand mit den Bergen dahinter",
  },
  {
    bild: "assets/images/schild.jpeg",
    titel: "🐝",
  },
  {
    bild: "assets/images/bienenschwarm.jpg",
    titel: "Ein natürlich geschwärmter Bienenschwarm",
  },
];
