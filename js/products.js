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
    id: "mischhonig",
    name: "Mischhonig (Blüte & Wald)",
    kategorie: "Honig",
    preis: 8.50,
    einheit: "500 g Glas",
    kurz: "Das Beste aus beiden Welten — mild und würzig zugleich.",
    beschreibung:
      "Unser Mischhonig vereint milden Blütenhonig und kräftigen Waldhonig in " +
      "einem Glas. So entsteht eine schöne Balance aus feiner Süße und " +
      "würzigem Aroma — ein guter Allrounder fürs Frühstücksbrot und zum Süßen.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: false,
  },
  {
    id: "bluetenhonig",
    name: "Blütenhonig",
    kategorie: "Honig",
    preis: 8.50,
    einheit: "500 g Glas",
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
    kurz: "Kräftig-würzig und dunkel — aus dem Honigtau des Waldes.",
    beschreibung:
      "Der Waldhonig stammt aus dem Honigtau der Nadelbäume rund um St. Johann. " +
      "Er ist dunkel, aromatisch und kräftig im Geschmack — für alle, die es " +
      "intensiver mögen.",
    bild: "assets/images/platzhalter.svg",
    verfuegbar: false,
  },
  {
    id: "bienenschwarm",
    name: "Bienenschwarm",
    kategorie: "Bienen",
    preis: 50.00,
    einheit: "pro kg",
    kurz: "Ein natürlich geschwärmtes Bienenvolk — für Imkerkolleg:innen.",
    beschreibung:
      "Aus der natürlichen Vermehrung unserer Völker geben wir Bienenschwärme " +
      "ab. Der Preis richtet sich nach dem Gewicht (50 € pro kg). Bei Interesse " +
      "melde dich einfach bei uns — wir beraten dich gerne zu Abholung und " +
      "passendem Zeitpunkt.",
    bild: "assets/images/bienenschwarm.jpg",
    verfuegbar: false,
  },
  {
    id: "met",
    name: "Met (Honigwein)",
    kategorie: "Getränke",
    preis: 12.00,
    einheit: "500 ml Flasche",
    kurz: "Honigwein aus unserem eigenen Honig — goldgelb und süffig.",
    beschreibung:
      "Unser Met wird aus unserem eigenen Honig angesetzt — ein traditioneller " +
      "Honigwein, goldgelb und angenehm süß. Enthält Alkohol; Abgabe nur an " +
      "Personen ab 18 Jahren.",
    bild: "assets/images/platzhalter.svg",
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
