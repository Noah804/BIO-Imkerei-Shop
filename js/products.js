/* ============================================================
   products.js — ALLE Produkte des Shops an EINER Stelle
   ============================================================

   So pflegst du Produkte:
   - Jedes Produkt ist ein { ... }-Block in der Liste PRODUKTE.
   - Neues Produkt: einen Block kopieren, Werte ändern, Komma nicht vergessen.
   - Produkt entfernen: den ganzen { ... }-Block (inkl. Komma) löschen.

   Felder je Produkt:
     id          eindeutiger Kurzname (nur Kleinbuchstaben, keine Leerzeichen)
                 -> wird in der Adresse verwendet, z. B. produkt.html?id=bluetenhonig
     name        Anzeigename
     kategorie   Gruppe, z. B. "Honig", "Kerzen", "Sonstiges"
     preis       Zahl in Euro (Punkt als Dezimaltrenner!), z. B. 8.50
     einheit     Text neben dem Preis, z. B. "500 g Glas"
     kurz        kurze Beschreibung (Produktübersicht)
     beschreibung  ausführlicher Text (Detailseite)
     bild        Pfad zum Bild, z. B. "assets/images/bluetenhonig.jpg"
                 (fehlt das Bild, wird automatisch der Platzhalter gezeigt)
     verfuegbar  true = kaufbar, false = "ausverkauft"
     bezahllink  (optional) Stripe/PayPal-Link — kommt später in Schritt 9
   ============================================================ */

const PLATZHALTER_BILD = "assets/images/platzhalter.svg";

const PRODUKTE = [
  {
    id: "bluetenhonig",
    name: "Blütenhonig",
    kategorie: "Honig",
    preis: 8.50,
    einheit: "500 g Glas",
    kurz: "Mild und cremig — der Klassiker aus heimischen Frühjahrsblüten.",
    beschreibung:
      "Unser Blütenhonig wird im Frühjahr geerntet, wenn Obstbäume und " +
      "Wiesenblumen in voller Blüte stehen. Er ist mild, fein-cremig und " +
      "eignet sich perfekt fürs Frühstücksbrot oder zum Süßen von Tee.",
    bild: "assets/images/test.jpg",
    verfuegbar: true,
  },
  {
    id: "waldhonig",
    name: "Waldhonig",
    kategorie: "Honig",
    preis: 9.90,
    einheit: "500 g Glas",
    kurz: "Kräftig-würzig und dunkel — aus dem Honigtau des Waldes.",
    beschreibung:
      "Der Waldhonig stammt aus dem Honigtau von Nadelbäumen. Er ist dunkel, " +
      "aromatisch und kräftig im Geschmack, mit einem leicht malzigen Ton. " +
      "Ein Genuss für alle, die es intensiver mögen.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: true,
  },
  {
    id: "cremehonig",
    name: "Cremehonig",
    kategorie: "Honig",
    preis: 8.90,
    einheit: "500 g Glas",
    kurz: "Streichzart gerührt — bleibt monatelang fein und cremig.",
    beschreibung:
      "Durch schonendes Rühren wird unser Cremehonig besonders fein und " +
      "streichzart. Er kristallisiert kontrolliert und bleibt dadurch lange " +
      "cremig — ideal für alle, die flüssigen Honig nicht mögen.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: true,
  },
  {
    id: "honig-mini",
    name: "Honig-Miniglas",
    kategorie: "Honig",
    preis: 2.50,
    einheit: "50 g Glas",
    kurz: "Kleines Probierglas — perfekt als Mitbringsel oder Gastgeschenk.",
    beschreibung:
      "Das Miniglas mit 50 g Blütenhonig ist ideal zum Probieren oder als " +
      "liebevolles kleines Geschenk, z. B. für Hochzeiten und Feiern.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: true,
  },
  {
    id: "bienenwachskerze",
    name: "Bienenwachskerze",
    kategorie: "Kerzen",
    preis: 6.00,
    einheit: "Stück, ca. 12 cm",
    kurz: "Handgezogen aus 100 % reinem Bienenwachs mit feinem Honigduft.",
    beschreibung:
      "Unsere Kerzen werden aus reinem Bienenwachs unserer eigenen Völker " +
      "gefertigt. Sie brennen ruhig, rußarm und verströmen einen zarten, " +
      "natürlichen Honigduft.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: true,
  },
  {
    id: "propolis-tropfen",
    name: "Propolis-Tropfen",
    kategorie: "Sonstiges",
    preis: 12.50,
    einheit: "20 ml Fläschchen",
    kurz: "Natürlicher Bienenkitt als Tropfen — traditionell geschätzt.",
    beschreibung:
      "Propolis ist das natürliche Harz, mit dem Bienen ihren Stock schützen. " +
      "Unsere Tropfen werden schonend gewonnen. Hinweis: kein Heilmittel — " +
      "Angaben nur zur allgemeinen Information.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: true,
  },
  {
    id: "geschenkset",
    name: "Geschenkset „Bienenfleiß“",
    kategorie: "Geschenke",
    preis: 24.90,
    einheit: "Set",
    kurz: "Blütenhonig, Waldhonig und eine Wachskerze — schön verpackt.",
    beschreibung:
      "Unser beliebtes Geschenkset vereint je ein Glas Blüten- und Waldhonig " +
      "sowie eine handgezogene Bienenwachskerze in einer hübschen Verpackung. " +
      "Das perfekte Geschenk für Honigliebhaber.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: true,
  },
];

/* ------------------------------------------------------------
   Hilfsfunktionen (werden von den Seiten verwendet)
   ------------------------------------------------------------ */

/* Ein Produkt anhand seiner id finden */
function produktNachId(id) {
  return PRODUKTE.find(p => p.id === id) || null;
}

/* Alle vorkommenden Kategorien (für Filter, ohne Duplikate) */
function alleKategorien() {
  return [...new Set(PRODUKTE.map(p => p.kategorie))];
}

/* Bildpfad eines Produkts (mit Platzhalter-Fallback) */
function produktBild(produkt) {
  return produkt && produkt.bild ? produkt.bild : PLATZHALTER_BILD;
}
