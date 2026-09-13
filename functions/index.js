/* ============================================================
   index.js — Cloud Functions der BIO-Imkerei Moser
   ============================================================

   Was macht diese Datei?
   Sie enthält eine kleine "Server-Funktion", die im Google-
   Rechenzentrum (Firebase) läuft. Wenn ein Kunde im Warenkorb
   auf "Zur Kasse" klickt, ruft die Webseite diese Funktion auf.
   Die Funktion:
     1. prüft den Warenkorb,
     2. rechnet die Preise SELBST aus (dem Browser wird NICHT
        vertraut — sonst könnte jemand den Preis manipulieren),
     3. erstellt bei Stripe eine sichere Bezahlseite,
     4. schickt die Adresse dieser Bezahlseite zurück.

   Der geheime Stripe-Schlüssel steht NICHT hier im Code, sondern
   wird beim Deploy als "Secret" (Geheimnis) hinterlegt. So kann
   er nie aus Versehen auf GitHub landen.
   ============================================================ */

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");

/* Der geheime Stripe-Schlüssel. Wird beim Deploy gesetzt mit:
   firebase functions:secrets:set STRIPE_SECRET_KEY
   (Anleitung folgt in Etappe B.) */
const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");

/* Region: gleiche Ecke wie unsere Datenbank (Europa). */
const REGION = "europe-west1";

/* Adresse der veröffentlichten Webseite (GitHub Pages).
   Nach dem Bezahlen wird der Kunde hierher zurückgeschickt.
   -> Falls die Seite später eine eigene Domain bekommt, hier ändern. */
const BASIS_URL = "https://imkerei.noah.co.at";

/* ------------------------------------------------------------
   PREISE — die "Kasse" der Funktion.
   WICHTIG: Beträge in CENT (850 = 8,50 €).
   Diese Liste MUSS mit js/products.js übereinstimmen. Ändert
   sich dort ein Preis, muss er auch hier geändert werden.
   (Später ziehen wir Preise + Lagerstand aus der Datenbank,
    dann gibt es nur noch EINE Stelle.)
   ------------------------------------------------------------ */
const PREISE = {
  mischhonig:    { name: "Mischhonig (Blüte & Wald)", cent: 850 },
  bluetenhonig:  { name: "Blütenhonig",               cent: 850 },
  waldhonig:     { name: "Waldhonig",                 cent: 950 },
  bienenschwarm: { name: "Bienenschwarm",             cent: 11000 },
  met:           { name: "Met (Honigwein)",           cent: 1200 },
};

/* Versandkosten (in Cent) — passend zu den AGB:
   Österreich-Pauschale oder gratis bei Abholung / in St. Johann.
   Der Kunde wählt auf der Bezahlseite selbst aus. */
const VERSAND_OESTERREICH_CENT = 590;

/* ============================================================
   createCheckout — wird vom Warenkorb aufgerufen.
   Erwartet: { items: [ { id: "mischhonig", menge: 2 }, ... ] }
   Gibt zurück: { url: "https://checkout.stripe.com/..." }
   ============================================================ */
exports.createCheckout = onCall(
  { region: REGION, secrets: [STRIPE_SECRET_KEY], cors: true },
  async (request) => {
    const items = request.data && request.data.items;

    if (!Array.isArray(items) || items.length === 0) {
      throw new HttpsError("invalid-argument", "Der Warenkorb ist leer.");
    }

    // Stripe erst hier laden (dann ist der Schlüssel verfügbar).
    const stripe = require("stripe")(STRIPE_SECRET_KEY.value());

    // Warenkorb in Stripe-Positionen umwandeln — mit UNSEREN Preisen.
    const line_items = [];
    for (const eintrag of items) {
      const produkt = PREISE[eintrag && eintrag.id];
      if (!produkt) continue; // unbekannte id -> ignorieren

      let menge = parseInt(eintrag.menge, 10) || 1;
      menge = Math.max(1, Math.min(99, menge)); // 1..99 erlauben

      line_items.push({
        quantity: menge,
        price_data: {
          currency: "eur",
          unit_amount: produkt.cent,
          product_data: { name: produkt.name },
        },
      });
    }

    if (line_items.length === 0) {
      throw new HttpsError(
        "invalid-argument",
        "Keine gültigen Produkte im Warenkorb."
      );
    }

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        locale: "de",
        line_items: line_items,

        // Rabattcodes (später in Stripe anlegbar) zulassen.
        allow_promotion_codes: true,

        // Nur Lieferung innerhalb Österreichs (siehe AGB).
        shipping_address_collection: { allowed_countries: ["AT"] },
        phone_number_collection: { enabled: true },

        // Versand ODER gratis Abholung — Kunde wählt selbst.
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              display_name: "Versand innerhalb Österreichs",
              fixed_amount: { amount: VERSAND_OESTERREICH_CENT, currency: "eur" },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              display_name: "Abholung / gratis in St. Johann",
              fixed_amount: { amount: 0, currency: "eur" },
            },
          },
        ],

        // Für den späteren Lager-Abzug: Warenkorb mitspeichern.
        metadata: { warenkorb: JSON.stringify(items).slice(0, 480) },

        success_url: BASIS_URL + "/bestellung-ok.html?sitzung={CHECKOUT_SESSION_ID}",
        cancel_url: BASIS_URL + "/warenkorb.html",
      });

      return { url: session.url };
    } catch (err) {
      logger.error("Stripe-Fehler beim Erstellen der Bezahlseite:", err);
      throw new HttpsError(
        "internal",
        "Die Bezahlseite konnte nicht erstellt werden. Bitte später erneut versuchen."
      );
    }
  }
);
