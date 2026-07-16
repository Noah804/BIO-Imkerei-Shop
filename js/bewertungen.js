/* ============================================================
   bewertungen.js — echte Live-Kundenbewertungen
   ============================================================

   Diese Seite zeigt Bewertungen an und erlaubt Kund:innen, selbst eine
   zu schreiben. Damit eine geschriebene Bewertung gespeichert wird und
   bei allen sichtbar ist, braucht es einen kleinen Online-Speicher.
   Wir verwenden dafür "Firebase" von Google (kostenlos für kleine Mengen).

   ------------------------------------------------------------
   EINMALIGE EINRICHTUNG (musst du 1x machen — dauert ~10 Minuten)
   ------------------------------------------------------------
   1. Auf https://console.firebase.google.com mit Google-Konto anmelden.
   2. "Projekt hinzufügen" -> Namen vergeben (z. B. "imkerei-moser"),
      Google Analytics kannst du AUS lassen.
   3. Firestore-Datenbank anlegen. Am einfachsten: oben in die SUCHLEISTE
      "Firestore" tippen und das Ergebnis "Firestore Database" anklicken.
      (Alternativ links im Menü die Kategorie "Erstellen"/"Build" ->
      "Datenbanken & Speicher" -> "Firestore".)
      Dann "Datenbank erstellen" -> Region "eur3 (europe-west)" wählen ->
      im Produktionsmodus starten.
   4. Oben aufs Zahnrad -> "Projekteinstellungen" -> ganz unten bei
      "Meine Apps" auf das Web-Symbol </> klicken -> App-Namen vergeben ->
      registrieren. Du bekommst dann einen "firebaseConfig"-Block.
   5. Die Werte aus diesem Block hier unten bei FIREBASE_CONFIG eintragen.
   6. In der Firebase-Konsole: "Firestore Database" -> Reiter "Regeln" ->
      den gesamten Inhalt durch die Regeln GANZ UNTEN in dieser Datei
      ersetzen -> "Veröffentlichen".

   Fertig! Danach funktionieren Bewertungen automatisch und live.
   (Diese Zugangsdaten sind bewusst öffentlich — das ist bei Firebase
    normal und sicher. Der Schutz passiert über die Regeln aus Schritt 6.)
   ------------------------------------------------------------ */

/* ----- HIER die Firebase-Zugangsdaten eintragen ----- */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAzFFD9WkE0oaUVsO22JnsUJjxboJGUDzQ",
  authDomain: "bio-imkerei-moser-808e7.firebaseapp.com",
  projectId: "bio-imkerei-moser-808e7",
  storageBucket: "bio-imkerei-moser-808e7.firebasestorage.app",
  messagingSenderId: "354128199575",
  appId: "1:354128199575:web:340824217eb35a88254ed2",
};

/* Name der "Schublade" (Sammlung) in der Datenbank — so lassen */
const BEWERTUNGEN_SAMMLUNG = "bewertungen";

/* ------------------------------------------------------------
   Ab hier musst du nichts mehr ändern.
   ------------------------------------------------------------ */

/* Ist Firebase schon eingerichtet? */
function firebaseKonfiguriert() {
  return Boolean(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId);
}

/* Sterne als HTML (volle + leere) */
function sterneHtml(anzahl) {
  const n = Math.max(0, Math.min(5, Math.round(anzahl || 0)));
  return '<span class="sterne" aria-label="' + n + ' von 5 Sternen">' +
    "★".repeat(n) +
    '<span class="leer">' + "★".repeat(5 - n) + "</span></span>";
}

/* Datum hübsch anzeigen (aus Firebase-Zeitstempel) */
function datumText(zeitstempel) {
  try {
    const d = zeitstempel && zeitstempel.toDate ? zeitstempel.toDate() : null;
    if (!d) return "";
    return d.toLocaleDateString("de-AT", {
      year: "numeric", month: "long", day: "numeric",
    });
  } catch (e) {
    return "";
  }
}

/* Ein externes Script nachladen (für die Firebase-Bibliothek) */
function ladeScript(src) {
  return new Promise(function (resolve, reject) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = function () { reject(new Error("Konnte nicht laden: " + src)); };
    document.head.appendChild(s);
  });
}

let DB = null; // Verbindung zur Datenbank (wird beim Start gesetzt)

/* Firebase starten und Datenbank-Verbindung zurückgeben */
async function firebaseStarten() {
  const basis = "https://www.gstatic.com/firebasejs/10.12.2/";
  await ladeScript(basis + "firebase-app-compat.js");
  await ladeScript(basis + "firebase-firestore-compat.js");
  firebase.initializeApp(FIREBASE_CONFIG);
  return firebase.firestore();
}

/* Alle Bewertungen aus der Datenbank holen (neueste zuerst) */
async function bewertungenLaden() {
  const snap = await DB.collection(BEWERTUNGEN_SAMMLUNG)
    .orderBy("datum", "desc")
    .limit(200)
    .get();
  const liste = [];
  snap.forEach(function (doc) { liste.push(doc.data()); });
  return liste;
}

/* Bewertungen + Durchschnitt anzeigen */
function bewertungenAnzeigen(liste) {
  const listeEl = document.getElementById("bewertungenListe");
  const schnittEl = document.getElementById("bewertungSchnitt");
  if (!listeEl) return;

  if (!liste.length) {
    schnittEl.innerHTML = "";
    listeEl.innerHTML =
      '<p class="text-zentriert" style="color:var(--braun-hell)">' +
      "Noch keine Bewertungen — sei die/der Erste! 🐝</p>";
    return;
  }

  // Durchschnitt
  const summe = liste.reduce(function (s, b) { return s + (b.sterne || 0); }, 0);
  const schnitt = summe / liste.length;
  schnittEl.innerHTML =
    '<span class="zahl">' + schnitt.toFixed(1) + "</span>" +
    sterneHtml(schnitt) +
    "<span>aus " + liste.length +
    (liste.length === 1 ? " Bewertung" : " Bewertungen") + "</span>";

  // Einzelne Bewertungen
  listeEl.innerHTML = liste.map(function (b) {
    const name = (b.name || "Anonym").toString();
    const text = (b.text || "").toString();
    return (
      '<div class="bewertung">' +
        '<div class="bewertung__kopf">' +
          '<span class="bewertung__name">' + entschaerfen(name) + "</span>" +
          sterneHtml(b.sterne) +
        "</div>" +
        '<div class="bewertung__datum">' + datumText(b.datum) + "</div>" +
        '<p class="bewertung__text">' + entschaerfen(text) + "</p>" +
      "</div>"
    );
  }).join("");
}

/* Text sicher machen (verhindert eingeschleusten HTML-Code) */
function entschaerfen(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* Zustand anzeigen, wenn Firebase noch NICHT eingerichtet ist */
function zeigePlatzhalterZustand() {
  const listeEl = document.getElementById("bewertungenListe");
  const hinweisEl = document.getElementById("bewertungHinweis");
  const form = document.getElementById("bewertungForm");

  if (listeEl) {
    listeEl.innerHTML =
      '<p class="text-zentriert" style="color:var(--braun-hell)">' +
      "⭐ Bewertungen sind bald verfügbar.</p>";
  }
  if (form) {
    form.querySelectorAll("input, textarea, button").forEach(function (el) {
      el.disabled = true;
    });
  }
  if (hinweisEl) {
    hinweisEl.innerHTML =
      "<strong>Für den Betreiber:</strong> Die Bewertungsfunktion ist noch " +
      "nicht eingerichtet. In der Datei <code>js/bewertungen.js</code> steht " +
      "oben Schritt für Schritt, wie du sie mit Firebase aktivierst.";
  }
}

/* Formular absenden */
function formularVerbinden() {
  const form = document.getElementById("bewertungForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Spam-Falle (unsichtbares Feld — nur Bots füllen es aus)
    if (form.website && form.website.value) return;

    const name = form.name.value.trim();
    const text = form.text.value.trim();
    const sterneEl = form.querySelector('input[name="sterne"]:checked');
    const sterne = sterneEl ? parseInt(sterneEl.value, 10) : 0;

    if (!name || !text || !sterne) {
      alert("Bitte Name, Sterne und einen kurzen Text angeben.");
      return;
    }

    const knopf = form.querySelector('button[type="submit"]');
    knopf.disabled = true;
    knopf.textContent = "Wird gesendet …";

    try {
      await DB.collection(BEWERTUNGEN_SAMMLUNG).add({
        name: name.slice(0, 60),
        text: text.slice(0, 1000),
        sterne: sterne,
        datum: firebase.firestore.FieldValue.serverTimestamp(),
      });
      form.reset();
      if (typeof zeigeToast === "function") {
        zeigeToast("Danke für deine Bewertung! 🍯");
      }
      bewertungenAnzeigen(await bewertungenLaden());
    } catch (err) {
      alert("Das hat leider nicht geklappt. Bitte später erneut versuchen.");
      console.error(err);
    } finally {
      knopf.disabled = false;
      knopf.textContent = "Bewertung absenden";
    }
  });
}

/* ------------------------------------------------------------
   Start beim Laden der Seite
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", async function () {
  if (!document.getElementById("bewertungenListe")) return;

  if (!firebaseKonfiguriert()) {
    zeigePlatzhalterZustand();
    return;
  }

  try {
    DB = await firebaseStarten();
    formularVerbinden();
    bewertungenAnzeigen(await bewertungenLaden());
  } catch (err) {
    console.error(err);
    const listeEl = document.getElementById("bewertungenListe");
    if (listeEl) {
      listeEl.innerHTML =
        '<p class="text-zentriert" style="color:var(--rot)">' +
        "Bewertungen konnten gerade nicht geladen werden. " +
        "Bitte später erneut versuchen.</p>";
    }
  }
});

/* ============================================================
   FIRESTORE-REGELN (Schritt 6 der Einrichtung)
   Diese in der Firebase-Konsole unter Firestore -> Regeln einfügen.
   Sie erlauben: jeder darf LESEN und eine gültige Bewertung SCHREIBEN,
   aber niemand darf Bewertungen ändern oder löschen (das machst nur du
   in der Firebase-Konsole). So bleibt Spam beherrschbar.
   ------------------------------------------------------------
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /bewertungen/{doc} {
         allow read: if true;
         allow create: if request.resource.data.name is string
                       && request.resource.data.name.size() > 0
                       && request.resource.data.name.size() <= 60
                       && request.resource.data.text is string
                       && request.resource.data.text.size() > 0
                       && request.resource.data.text.size() <= 1000
                       && request.resource.data.sterne is int
                       && request.resource.data.sterne >= 1
                       && request.resource.data.sterne <= 5;
         allow update, delete: if false;
       }
     }
   }
   ============================================================ */
