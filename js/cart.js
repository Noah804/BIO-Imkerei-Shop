/* ============================================================
   cart.js — Warenkorb-Logik
   Speichert den Warenkorb im Browser (localStorage), damit er
   auch beim Seitenwechsel und Neuladen erhalten bleibt.

   Benötigt:
     - WARENKORB_KEY, aktualisiereWarenkorbAnzeige(), zeigeToast(),
       preisFormat()   aus main.js
     - produktNachId(), produktBild()   aus products.js

   Reihenfolge im HTML: products.js, main.js, cart.js, bestellung.js
   ============================================================ */

/* Warenkorb aus dem Speicher lesen -> Array von { id, menge } */
function warenkorbLesen() {
  try {
    return JSON.parse(localStorage.getItem(WARENKORB_KEY)) || [];
  } catch (e) {
    return [];
  }
}

/* Warenkorb speichern und Anzeige oben aktualisieren */
function warenkorbSpeichern(warenkorb) {
  localStorage.setItem(WARENKORB_KEY, JSON.stringify(warenkorb));
  if (typeof aktualisiereWarenkorbAnzeige === "function") {
    aktualisiereWarenkorbAnzeige();
  }
}

/* Höchstmenge pro Produkt */
const MAX_MENGE = 99;

/* Produkt hinzufügen (Standard: 1 Stück). Existiert es schon,
   wird die Menge erhöht. */
function inWarenkorb(id, menge = 1) {
  const produkt = produktNachId(id);
  if (!produkt || !produkt.verfuegbar) return;

  menge = Math.max(1, Math.min(MAX_MENGE, parseInt(menge, 10) || 1));

  const warenkorb = warenkorbLesen();
  const vorhanden = warenkorb.find(p => p.id === id);
  if (vorhanden) {
    vorhanden.menge = Math.min(MAX_MENGE, vorhanden.menge + menge);
  } else {
    warenkorb.push({ id: id, menge: menge });
  }
  warenkorbSpeichern(warenkorb);

  if (typeof zeigeToast === "function") {
    zeigeToast(`„${produkt.name}“ in den Warenkorb gelegt`);
  }
}

/* Menge eines Produkts direkt setzen (1 bis MAX_MENGE) */
function warenkorbSetzeMenge(id, menge) {
  menge = Math.max(1, Math.min(MAX_MENGE, parseInt(menge, 10) || 1));
  const warenkorb = warenkorbLesen();
  const eintrag = warenkorb.find(p => p.id === id);
  if (eintrag) {
    eintrag.menge = menge;
    warenkorbSpeichern(warenkorb);
  }
}

/* Produkt ganz entfernen */
function ausWarenkorb(id) {
  const warenkorb = warenkorbLesen().filter(p => p.id !== id);
  warenkorbSpeichern(warenkorb);
  if (typeof renderWarenkorb === "function") renderWarenkorb();
}

/* Kompletten Warenkorb leeren (mit Rückfrage, schützt vor Fehlklick) */
function warenkorbLeeren() {
  if (!confirm("Möchtest du wirklich den ganzen Warenkorb leeren?")) return;
  warenkorbSpeichern([]);
  if (typeof renderWarenkorb === "function") renderWarenkorb();
}

/* Gesamtsumme berechnen (Zahl in Euro) */
function warenkorbGesamt() {
  return warenkorbLesen().reduce((summe, eintrag) => {
    const produkt = produktNachId(eintrag.id);
    return produkt ? summe + produkt.preis * eintrag.menge : summe;
  }, 0);
}

/* ------------------------------------------------------------
   Warenkorbseite rendern (wird von warenkorb.html verwendet).
   Erwartet ein Element mit id="warenkorbInhalt".
   ------------------------------------------------------------ */
function renderWarenkorb() {
  const ziel = document.getElementById("warenkorbInhalt");
  if (!ziel) return;

  const warenkorb = warenkorbLesen();

  if (warenkorb.length === 0) {
    ziel.innerHTML = `
      <div class="warenkorb-leer">
        <svg width="72" height="80" viewBox="0 0 72 80" aria-hidden="true" style="display:block;margin:0 auto 1rem">
          <polygon points="18,3 54,3 70,40 54,77 18,77 2,40" fill="#fbe9c4" stroke="#e0930a" stroke-width="3"/>
        </svg>
        <h2>Dein Warenkorb ist leer</h2>
        <p>Stöbere durch unsere Produkte und lege etwas Süßes hinein.</p>
        <a class="btn btn--gross" href="produkte.html">Zu den Produkten</a>
      </div>`;
    // Kein Warenkorb -> auch kein Bestellformular
    if (typeof renderBestellFormular === "function") renderBestellFormular();
    return;
  }

  const zeilen = warenkorb.map(eintrag => {
    const produkt = produktNachId(eintrag.id);
    if (!produkt) return "";
    const bild = produktBild(produkt);
    const zwischensumme = produkt.preis * eintrag.menge;
    return `
      <div class="warenkorb-zeile">
        <img src="${bild}" alt="${produkt.name}">
        <div>
          <strong>${produkt.name}</strong><br>
          <small>${preisFormat(produkt.preis)} / ${produkt.einheit}</small>
        </div>
        <div class="mengenwahl">
          <input type="number" min="1" max="${MAX_MENGE}" value="${eintrag.menge}"
                 aria-label="Menge für ${produkt.name}"
                 onchange="warenkorbSetzeMenge('${produkt.id}', this.value); renderWarenkorb();">
        </div>
        <span class="preis">${preisFormat(zwischensumme)}</span>
        <button class="entfernen" onclick="ausWarenkorb('${produkt.id}')">entfernen</button>
      </div>`;
  }).join("");

  ziel.innerHTML = `
    ${zeilen}
    <div class="warenkorb-summe">
      <p class="gesamt">Gesamt: ${preisFormat(warenkorbGesamt())}</p>
      <p><small>inkl. aller Abgaben · keine USt (Kleinunternehmer) · keine Versandkosten — Abholung bei uns in St. Johann, Bezahlung bar vor Ort</small></p>
      <a class="btn" href="produkte.html">Weiter einkaufen</a>
      <button class="btn btn--umriss" onclick="warenkorbLeeren()">Warenkorb leeren</button>
      <a class="btn btn--gruen btn--gross" href="#bestellFormular">Abholung vereinbaren ↓</a>
    </div>`;

  // Bestellformular darunter neu aufbauen (js/bestellung.js)
  if (typeof renderBestellFormular === "function") renderBestellFormular();
}
