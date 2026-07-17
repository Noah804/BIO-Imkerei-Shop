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
    titel: "Reger Flugbetrieb am Flugloch — unsere Bienen bei der Arbeit",
  },
  {
    bild: "assets/images/bienen_zuhause.jpeg",
    titel: "Unsere Bienenvölker zuhause in St. Johann — jede Beute ihre Farbe",
  },
  {
    bild: "assets/images/bienenstand.jpg",
    titel: "Unser Bienenstand mit Blick ins Tal",
  },
  {
    bild: "assets/images/schild.jpeg",
    titel: "Vorsicht Bienen! Bei uns wird fleißig geimkert 🐝",
  },
  {
    bild: "assets/images/bienenschwarm.jpg",
    titel: "Ein natürlicher Bienenschwarm an unserem Stand",
  },
];
