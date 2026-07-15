/* ============================================================
   cart.js — Warenkorb-Logik
   Speichert den Warenkorb im Browser (localStorage), damit er
   auch beim Seitenwechsel und Neuladen erhalten bleibt.

   Benötigt:
     - WARENKORB_KEY, aktualisiereWarenkorbAnzeige(), zeigeToast(),
       preisFormat()   aus main.js
     - produktNachId(), produktBild()   aus products.js

   Reihenfolge im HTML: products.js, main.js, cart.js
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

/* Produkt hinzufügen (Standard: 1 Stück). Existiert es schon,
   wird die Menge erhöht. */
function inWarenkorb(id, menge = 1) {
  const produkt = produktNachId(id);
  if (!produkt || !produkt.verfuegbar) return;

  menge = Math.max(1, parseInt(menge, 10) || 1);

  const warenkorb = warenkorbLesen();
  const vorhanden = warenkorb.find(p => p.id === id);
  if (vorhanden) {
    vorhanden.menge += menge;
  } else {
    warenkorb.push({ id: id, menge: menge });
  }
  warenkorbSpeichern(warenkorb);

  if (typeof zeigeToast === "function") {
    zeigeToast(`„${produkt.name}“ in den Warenkorb gelegt 🛒`);
  }
}

/* Menge eines Produkts direkt setzen (mind. 1) */
function warenkorbSetzeMenge(id, menge) {
  menge = Math.max(1, parseInt(menge, 10) || 1);
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

/* Kompletten Warenkorb leeren */
function warenkorbLeeren() {
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
        <p style="font-size:3rem;margin:0">🛒</p>
        <h2>Dein Warenkorb ist leer</h2>
        <p>Stöbere durch unsere Produkte und lege etwas Süßes hinein.</p>
        <a class="btn btn--gross" href="produkte.html">Zu den Produkten</a>
      </div>`;
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
          <input type="number" min="1" value="${eintrag.menge}"
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
      <p><small>inkl. gesetzl. USt. · zzgl. Versand</small></p>
      <a class="btn" href="produkte.html">Weiter einkaufen</a>
      <button class="btn btn--umriss" onclick="warenkorbLeeren()">Warenkorb leeren</button>
      <button class="btn btn--gruen btn--gross" onclick="zurKasse()">Zur Kasse</button>
    </div>`;
}

/* Platzhalter für die Kasse — echte Bezahlung folgt in Schritt 9 */
function zurKasse() {
  alert(
    "Bezahlung noch nicht eingerichtet.\n\n" +
    "In Schritt 9 verbinden wir hier Stripe oder PayPal.\n" +
    "Dann führt dieser Button zur sicheren Bezahlseite."
  );
}
