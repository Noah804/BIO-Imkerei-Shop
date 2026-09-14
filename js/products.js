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
     ab16        (optional) true = Verkauf erst ab 16 Jahren (z. B. Met —
                 vergorene Getränke sind in Österreich ab 16 erlaubt);
                 im Bestellformular erscheint dann der Hinweis, zur
                 Abholung einen Ausweis mitzubringen
   ============================================================ */

const PLATZHALTER_BILD = "assets/images/platzhalter.svg";

const PRODUKTE = [
  {
    id: "mischhonig",
    name: "Mischhonig",
    kategorie: "Honig",
    preis: 12.00,
    einheit: "500 g Glas",
    inhalt: 500,
    inhaltEinheit: "g",
    bezeichnung: "Honig",
    ursprung: "Österreich",
    lagerung: "Kühl, trocken und dunkel lagern",
    kurz: "Unser Mischhonig aus Blüte & Wald — mild und würzig zugleich.",
    beschreibung:
      "Unser Mischhonig vereint milden Blütenhonig und kräftigen Waldhonig in " +
      "einem Glas. So entsteht eine schöne Balance aus feiner Süße und " +
      "würzigem Aroma — ein guter Allrounder fürs Frühstücksbrot und zum Süßen.",
    bild: "assets/images/mischhonig.jpg",
    verfuegbar: true,
  },
  {
    id: "bienenschwarm",
    name: "Bienenschwarm",
    kategorie: "Bienen",
    preis: 110.00,
    einheit: "pro Schwarm",
    kurz: "Ein natürlich geschwärmtes Bienenvolk — für Imkerkolleg:innen.",
    beschreibung:
      "Aus der natürlichen Vermehrung unserer Völker geben wir Bienenschwärme " +
      "ab (110 € pro Schwarm). Schwärme gibt es nur saisonal (Mai–Juli). Bei " +
      "Interesse melde dich einfach bei uns — wir beraten dich gerne zu Abholung " +
      "und passendem Zeitpunkt.",
    bild: "assets/images/bienenschwarm.jpg",
    verfuegbar: false,
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


/* ============================================================
   AUSGEBLENDETE PRODUKTE  (stand 13.09.2026)
   ============================================================

   Diese drei Produkte sind zurzeit NICHT im Shop zu sehen. Sie stehen
   hier nur aufbewahrt, damit die Beschreibungen und Pflichtangaben
   nicht verloren gehen.

   SO HOLST DU EIN PRODUKT ZURUECK:
     1. Den gewuenschten { ... }-Block hier unten ausschneiden
        (vom "{" bis zum "}," einschliesslich Komma).
     2. Oben in die Liste PRODUKTE einfuegen, zwischen zwei andere
        Bloecke oder ans Ende vor die Zeile "];".
     3. Preis pruefen und "verfuegbar" auf true setzen, wenn es
        sofort kaufbar sein soll.
     4. Speichern, committen, pushen - dann ist es online.

   ------------------------------------------------------------

  {
    id: "bluetenhonig",
    name: "Blütenhonig",
    kategorie: "Honig",
    preis: 8.50,
    einheit: "500 g Glas",
    inhalt: 500,
    inhaltEinheit: "g",
    bezeichnung: "Blütenhonig",
    ursprung: "Österreich",
    lagerung: "Kühl, trocken und dunkel lagern",
    kurz: "Mild und fein — aus heimischen Frühjahrsblüten.",
    beschreibung:
      "Unseren Blütenhonig ernten wir im Frühjahr, wenn Wiesen und Obstbäume " +
      "in voller Blüte stehen. Er ist mild und fein im Geschmack und passt " +
      "perfekt aufs Frühstücksbrot oder in den Tee.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: false,
  },

  {
    id: "waldhonig",
    name: "Waldhonig",
    kategorie: "Honig",
    preis: 9.50,
    einheit: "500 g Glas",
    inhalt: 500,
    inhaltEinheit: "g",
    bezeichnung: "Waldhonig",
    ursprung: "Österreich",
    lagerung: "Kühl, trocken und dunkel lagern",
    kurz: "Kräftig-würzig und dunkel — aus dem Honigtau des Waldes.",
    beschreibung:
      "Der Waldhonig stammt aus dem Honigtau der Nadelbäume rund um St. Johann. " +
      "Er ist dunkel, aromatisch und kräftig im Geschmack — für alle, die es " +
      "intensiver mögen.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: false,
  },

  {
    id: "met",
    name: "Met (Honigwein)",
    kategorie: "Getränke",
    preis: 12.00,
    einheit: "500 ml Flasche",
    inhalt: 500,
    inhaltEinheit: "ml",
    kurz: "Honigwein aus unserem eigenen Honig — goldgelb und süffig.",
    beschreibung:
      "Unser Met wird aus unserem eigenen Honig angesetzt — ein traditioneller " +
      "Honigwein, goldgelb und angenehm süß. Enthält Alkohol; Abgabe nur an " +
      "Personen ab 16 Jahren.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: false,
    ab16: true,
  },

   ============================================================ */
