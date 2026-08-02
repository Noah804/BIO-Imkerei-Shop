/* ============================================================
   galerie.js — die Fotos der Galerie an EINER Stelle
   ============================================================

   So fügst du ein Foto hinzu:
   1. Foto in den Ordner assets/images/ legen (z. B. "bienenstock.jpg").
   2. Unten einen { ... }-Block kopieren und die Werte anpassen.
      (auf das Komma am Ende achten!)

   Felder je Foto:
     bild       Pfad zum Foto, z. B. "assets/images/bienenstock.jpg"
     titel      kurzer Text, der unter dem Foto steht (darf auch leer "" sein)
     kategorie  Gruppe für die Filter-Knöpfe oben in der Galerie.
                Bisherige Kategorien: "Bienen", "Standort",
                "Schleudern", "Schwärme".
                (Eine neue Kategorie? Einfach hinschreiben — der
                 Knopf dafür erscheint automatisch.)

   Fehlt ein Foto oder ist der Pfad falsch, wird automatisch das
   Platzhalter-Bild angezeigt.
   ============================================================ */

const GALERIE = [
  /* ---------- Bienen ---------- */
  {
    bild: "assets/images/biene_blume.jpg",
    titel: "Biene bei der Arbeit",
    kategorie: "Bienen",
  },
  {
    bild: "assets/images/flugloch.jpg",
    titel: "Unsere Bienen am Flugloch",
    kategorie: "Bienen",
  },

  /* ---------- Standort ---------- */
  {
    bild: "assets/images/bienen_zuhause.jpeg",
    titel: "Die bunten Bienenstöcke im Garten",
    kategorie: "Standort",
  },
  {
    bild: "assets/images/bienenstand.jpg",
    titel: "Unser Bienenstand mit den Bergen dahinter",
    kategorie: "Standort",
  },
  {
    bild: "assets/images/schild.jpeg",
    titel: "Vorsicht Bienen",
    kategorie: "Standort",
  },

  /* ---------- Schleudern (in Arbeitsreihenfolge) ---------- */
  {
    bild: "assets/images/schleudern_entdeckeln.jpg",
    titel: "Entdeckeln: die Wachsschicht kommt runter",
    kategorie: "Schleudern",
  },
  {
    bild: "assets/images/schleudern_waben.jpg",
    titel: "Die vollen Waben in der Honigschleuder",
    kategorie: "Schleudern",
  },
  {
    bild: "assets/images/schleudern_sieb.jpg",
    titel: "Frisch geschleudert läuft der Honig durchs Feinsieb",
    kategorie: "Schleudern",
  },
  {
    bild: "assets/images/schleudern_honig.jpg",
    titel: "Goldener Honig direkt aus der Schleuder",
    kategorie: "Schleudern",
  },

  /* ---------- Schwärme (chronologisch) ---------- */
  {
    bild: "assets/images/schwarm_im_gebuesch.jpg",
    titel: "Die Schwarmtraube im Gebüsch — kurz vor dem Einfangen",
    kategorie: "Schwärme",
  },
  {
    bild: "assets/images/schwarm_nahaufnahme.jpg",
    titel: "Ganz nah dran — schwärmende Bienen sind friedlich",
    kategorie: "Schwärme",
  },
  {
    bild: "assets/images/bienenschwarm.jpg",
    titel: "Ein natürlich geschwärmter Bienenschwarm",
    kategorie: "Schwärme",
  },
];
