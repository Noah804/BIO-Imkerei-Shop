/* ============================================================
   bestellung.js — Bestellung zur SELBSTABHOLUNG
   ============================================================

   So läuft eine Bestellung ab:
     1. Kunde legt Produkte in den Warenkorb.
     2. Auf der Warenkorb-Seite füllt er dieses Formular aus
        (Name, E-Mail, Telefon, Wunsch-Abholtag, Zeitfenster).
     3. Du bekommst eine E-Mail mit der kompletten Bestellung.
     4. Du antwortest auf die Mail und bestätigst den Termin.
     5. Bezahlt wird bar bei der Übergabe.

   Es wird NICHTS online bezahlt und NICHTS versendet.

   ------------------------------------------------------------
   EINMALIGE EINRICHTUNG (musst du 1x machen — dauert 2 Minuten)
   ------------------------------------------------------------
   Damit die Bestellung als E-Mail bei dir ankommt, verwenden wir den
   Gratis-Dienst "FormSubmit" (https://formsubmit.co). Du brauchst dort
   KEIN Konto und musst nichts installieren.

   1. Website öffnen, ein Produkt in den Warenkorb legen und eine
      Test-Bestellung abschicken.
   2. FormSubmit schickt dir daraufhin EINMALIG eine E-Mail an
      imkerei@noah.co.at mit dem Betreff "Confirm your email".
      -> Darin auf den Knopf "Activate Form" klicken. Fertig.
   3. Auf der Bestätigungsseite zeigt dir FormSubmit einen zufälligen
      Code an, z. B. "a1b2c3d4e5f6...". Trag diesen Code unten bei
      BESTELL_ZIEL anstelle der E-Mail-Adresse ein und speichere.
      Grund: So steht deine echte E-Mail-Adresse nicht im Quelltext
      der Website und kann nicht von Spam-Robotern abgegriffen werden.

   Ab dann landet jede Bestellung automatisch in deinem Postfach.
   ------------------------------------------------------------ */

/* ----- HIER das Bestell-Ziel eintragen -----
   Anfangs die E-Mail-Adresse, nach Schritt 3 oben der FormSubmit-Code. */
const BESTELL_ZIEL = "imkerei@noah.co.at";

/* Wohin der Kunde nach dem Absenden weitergeleitet wird.
   Das muss eine vollständige Internet-Adresse sein — FormSubmit kann nicht
   auf eine Datei am eigenen Rechner zurückleiten. Deshalb lässt sich das
   Bestellformular auch nur über die echte Website testen, nicht per
   Doppelklick auf index.html. */
const DANKE_SEITE = "https://imkerei.noah.co.at/bestellung-ok.html?bestellt=1";

/* Auswählbare Abhol-Zeitfenster (Reihenfolge = Anzeige-Reihenfolge).
   Hier kannst du deine echten Zeiten eintragen. */
const ABHOL_ZEITFENSTER = [
  "Vormittag (9–12 Uhr)",
  "Nachmittag (13–17 Uhr)",
  "Abend (17–19 Uhr)",
  "Egal — bitte Termin vorschlagen",
];

/* Wie viele Tage im Voraus frühestens abgeholt werden kann.
   1 = ab morgen (du hast so einen Tag Vorlauf zum Herrichten). */
const VORLAUF_TAGE = 1;

/* ------------------------------------------------------------
   Ab hier musst du nichts mehr ändern.
   ------------------------------------------------------------ */

/* Datum als "JJJJ-MM-TT" (in lokaler Zeit, nicht UTC) */
function datumIso(datum) {
  const versatz = datum.getTimezoneOffset() * 60000;
  return new Date(datum.getTime() - versatz).toISOString().slice(0, 10);
}

/* Frühestmöglicher Abholtag */
function fruehesterAbholtag() {
  const d = new Date();
  d.setDate(d.getDate() + VORLAUF_TAGE);
  return datumIso(d);
}

/* Datum hübsch anzeigen: "2026-09-20" -> "Sa., 20.09.2026" */
function datumLesbar(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("de-AT", {
    weekday: "short", day: "2-digit", month: "2-digit", year: "numeric",
  });
}

/* Der Warenkorb als schlichter Text für die E-Mail:
     2 x Mischhonig (500 g Glas) — € 17,00
   Gibt "" zurück, wenn der Warenkorb leer ist. */
function bestellungAlsText() {
  const zeilen = warenkorbLesen().map(eintrag => {
    const produkt = produktNachId(eintrag.id);
    if (!produkt) return "";
    return eintrag.menge + " x " + produkt.name +
           " (" + produkt.einheit + ") — " +
           preisFormat(produkt.preis * eintrag.menge);
  }).filter(Boolean);
  if (zeilen.length === 0) return "";
  return zeilen.join("\n");
}

/* Enthält der Warenkorb etwas, das erst ab 16 abgegeben werden darf? */
function ab16ImWarenkorb() {
  return warenkorbLesen()
    .map(e => produktNachId(e.id))
    .filter(p => p && p.ab16);
}

/* ------------------------------------------------------------
   Formular anzeigen
   Erwartet ein Element mit id="bestellFormular" (warenkorb.html).
   Wird nach jedem Neuzeichnen des Warenkorbs aufgerufen.

   WICHTIG: Das ist ein ganz normales HTML-Formular, das der Browser
   selbst abschickt (method="post"). Kein fetch/AJAX — denn ein fetch
   an eine fremde Adresse wird vom Browser blockiert, wenn man die Seite
   per Doppelklick als Datei öffnet (file://). Ein echtes Formular geht
   immer, egal ob lokal geöffnet oder online.
   ------------------------------------------------------------ */
function renderBestellFormular() {
  const ziel = document.getElementById("bestellFormular");
  if (!ziel) return;

  // Leerer Warenkorb -> kein Formular
  if (warenkorbLesen().length === 0) {
    ziel.innerHTML = "";
    return;
  }

  const zeitfenster = ABHOL_ZEITFENSTER
    .map(z => `<option value="${z}">${z}</option>`)
    .join("");

  const ab16 = ab16ImWarenkorb();
  const ab16Hinweis = ab16.length === 0 ? "" : `
    <div class="hinweis">
      <strong>Ausweis nicht vergessen:</strong> Deine Bestellung enthält
      ${ab16.map(p => "„" + p.name + "“").join(", ")}. Alkoholische Getränke
      geben wir in Österreich erst ab 16 Jahren ab — bitte bring zur Abholung
      einen Lichtbildausweis mit.
    </div>`;

  ziel.innerHTML = `
    <section class="bestellen abstand-oben">
      <h2>Abholung vereinbaren</h2>
      <p>Sag uns, wann es dir passt — wir richten deine Bestellung her und
         bestätigen dir den Termin per E-Mail. Bezahlt wird bar bei der
         Übergabe in Hubangerl 1, St. Johann im Pongau.</p>

      ${ab16Hinweis}

      <form class="formular" id="abholForm" method="post"
            action="https://formsubmit.co/${BESTELL_ZIEL}">

        <!-- Steuerfelder für FormSubmit (für den Kunden unsichtbar) -->
        <input type="hidden" name="_subject" id="bBetreff"
               value="Neue Bestellung (Abholung)">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="${DANKE_SEITE}">
        <input type="hidden" name="Bestellung" id="bInhalt">
        <input type="hidden" name="Gesamt" id="bGesamt">
        <input type="hidden" name="Abholtag" id="bTagText">

        <div>
          <label for="bName">Name</label>
          <input type="text" id="bName" name="Name" autocomplete="name" required>
        </div>
        <div>
          <label for="bEmail">Deine E-Mail</label>
          <input type="email" id="bEmail" name="email" autocomplete="email" required>
        </div>
        <div>
          <label for="bTelefon">Telefon</label>
          <input type="tel" id="bTelefon" name="Telefon" autocomplete="tel" required>
        </div>
        <div>
          <!-- ohne name: wird nicht mitgeschickt; stattdessen geht das
               gut lesbare Datum aus "bTagText" raus -->
          <label for="bTag">Wunsch-Abholtag</label>
          <input type="date" id="bTag" min="${fruehesterAbholtag()}" required>
        </div>
        <div>
          <label for="bZeit">Wunsch-Zeitfenster</label>
          <select id="bZeit" name="Zeitfenster" required>${zeitfenster}</select>
        </div>
        <div>
          <label for="bAnmerkung">Anmerkung (optional)</label>
          <textarea id="bAnmerkung" name="Anmerkung"
                    placeholder="z. B. anderer Wunschtermin, Frage zum Honig …"></textarea>
        </div>

        <!-- Spam-Falle von FormSubmit: Menschen sehen dieses Feld nicht
             und lassen es leer; Spam-Roboter füllen es aus und fliegen raus -->
        <input type="text" name="_honey" tabindex="-1" autocomplete="off"
               style="display:none" aria-hidden="true">

        <div class="formular__zustimmung">
          <input type="checkbox" id="bDatenschutz" required>
          <label for="bDatenschutz">Ich habe die
            <a href="datenschutz.html">Datenschutzerklärung</a> gelesen und bin
            mit der Verarbeitung meiner Angaben zur Abwicklung der Bestellung
            einverstanden.</label>
        </div>

        <button class="btn btn--gruen btn--gross" type="submit">
          Bestellung abschicken
        </button>
        <p><small>Das ist noch kein Kauf: Du reservierst deine Produkte. Der
           Kauf kommt erst bei der Abholung vor Ort zustande.</small></p>
        <p><small>Lieber selbst eine E-Mail schreiben?
           <a href="${bestellungAlsMailto()}">Bestellung als E-Mail öffnen</a></small></p>
      </form>
    </section>`;

  // Vor dem Absenden die unsichtbaren Felder befüllen
  document.getElementById("abholForm")
    .addEventListener("submit", bestellungVorbereiten);
}

/* ------------------------------------------------------------
   Wird direkt vor dem Absenden ausgeführt: trägt Warenkorb, Summe,
   lesbares Datum und den Betreff in die unsichtbaren Felder ein.
   Danach schickt der Browser das Formular ganz normal selbst ab.
   ------------------------------------------------------------ */
function bestellungVorbereiten(e) {
  const inhalt = bestellungAlsText();

  // Warenkorb zwischendurch leer geworden -> nicht abschicken
  if (!inhalt) {
    e.preventDefault();
    return;
  }

  document.getElementById("bInhalt").value = inhalt;
  document.getElementById("bGesamt").value =
    preisFormat(warenkorbGesamt()) + " (bar bei Abholung)";
  document.getElementById("bTagText").value =
    datumLesbar(document.getElementById("bTag").value);
  document.getElementById("bBetreff").value =
    "Neue Bestellung (Abholung) — " + document.getElementById("bName").value.trim();

  // Kein preventDefault: der Browser schickt das Formular jetzt ab.
}

/* Ersatzweg: die Bestellung als fertige E-Mail im Mail-Programm.
   Wird beim Aufbau des Formulars erzeugt, enthält daher nur den
   Warenkorb — die persönlichen Angaben trägt der Kunde selbst ein. */
function bestellungAlsMailto() {
  const betreff = encodeURIComponent("Bestellung zur Abholung");
  const koerper = encodeURIComponent(
    "Hallo,\n\nich möchte folgende Produkte zur Abholung bestellen:\n\n" +
    bestellungAlsText() +
    "\n\nGesamt: " + preisFormat(warenkorbGesamt()) +
    "\n\nName: \nTelefon: \nWunsch-Abholtag: \nZeitfenster: \n"
  );
  return "mailto:" + SHOP.email + "?subject=" + betreff + "&body=" + koerper;
}
