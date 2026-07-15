/* ============================================================
   main.js — gemeinsame Kopf-/Fußzeile für alle Seiten
   Fügt Navigation & Footer automatisch ein, damit sie nur an
   EINER Stelle gepflegt werden müssen.
   ============================================================ */

/* ----- HIER zentrale Shop-Einstellungen ----- */
const SHOP = {
  name: "BIO-Imkerei Moser",              // TODO: bei Bedarf anpassen
  slogan: "Honig & Bienenprodukte direkt vom Imker",
  email: "kontakt@imkerei-moser.at",  // TODO: echte E-Mail eintragen
  ort: "Saalfelden, Österreich",      // TODO: echten Ort eintragen
};

/* Der Schlüssel, unter dem der Warenkorb im Browser gespeichert wird.
   Muss identisch zu cart.js sein. */
const WARENKORB_KEY = "imkerei_warenkorb";

/* ------------------------------------------------------------
   Navigationspunkte (Reihenfolge = Anzeige-Reihenfolge)
   ------------------------------------------------------------ */
const NAV_LINKS = [
  { text: "Start",     href: "index.html" },
  { text: "Produkte",  href: "produkte.html" },
  { text: "Über uns",  href: "ueber-uns.html" },
  { text: "Kontakt",   href: "kontakt.html" },
];

/* Aktuelle Seite ermitteln (für "aktiv"-Markierung) */
function aktuelleSeite() {
  const pfad = window.location.pathname.split("/").pop();
  return pfad === "" ? "index.html" : pfad;
}

/* Warenkorb-Anzahl aus dem Browserspeicher lesen (robust, auch ohne cart.js) */
function warenkorbAnzahl() {
  try {
    const daten = JSON.parse(localStorage.getItem(WARENKORB_KEY)) || [];
    return daten.reduce((summe, p) => summe + (p.menge || 0), 0);
  } catch (e) {
    return 0;
  }
}

/* ------------------------------------------------------------
   Kopfzeile bauen
   ------------------------------------------------------------ */
function baueHeader() {
  const seite = aktuelleSeite();
  const anzahl = warenkorbAnzahl();

  const links = NAV_LINKS.map(l => {
    const aktiv = l.href === seite ? ' class="aktiv"' : "";
    return `<li><a href="${l.href}"${aktiv}>${l.text}</a></li>`;
  }).join("");

  return `
  <header class="site-header">
    <nav class="nav">
      <a class="nav__logo" href="index.html">
        <span class="biene" aria-hidden="true">🐝</span>
        <span>${SHOP.name}</span>
      </a>
      <button class="nav__toggle" aria-label="Menü öffnen" aria-expanded="false">☰</button>
      <div class="nav__menu" id="navMenu">
        <ul class="nav__links">${links}</ul>
        <a class="nav__warenkorb" href="warenkorb.html" aria-label="Warenkorb">
          🛒 Warenkorb
          <span class="anzahl" id="warenkorbAnzahl">${anzahl}</span>
        </a>
      </div>
    </nav>
  </header>`;
}

/* ------------------------------------------------------------
   Fußzeile bauen
   ------------------------------------------------------------ */
function baueFooter() {
  const jahr = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-raster">
        <div>
          <h3>${SHOP.name}</h3>
          <p>${SHOP.slogan}<br>${SHOP.ort}</p>
        </div>
        <div>
          <h3>Shop</h3>
          <ul>
            <li><a href="produkte.html">Alle Produkte</a></li>
            <li><a href="warenkorb.html">Warenkorb</a></li>
            <li><a href="ueber-uns.html">Über uns</a></li>
            <li><a href="kontakt.html">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h3>Rechtliches</h3>
          <ul>
            <li><a href="impressum.html">Impressum</a></li>
            <li><a href="datenschutz.html">Datenschutz</a></li>
            <li><a href="agb.html">AGB</a></li>
            <li><a href="widerruf.html">Widerruf</a></li>
          </ul>
        </div>
        <div>
          <h3>Kontakt</h3>
          <ul>
            <li><a href="mailto:${SHOP.email}">${SHOP.email}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-unten">
        © ${jahr} ${SHOP.name} · Erstellt mit Sorgfalt 🍯
      </div>
    </div>
  </footer>`;
}

/* ------------------------------------------------------------
   Einfügen & Interaktion
   ------------------------------------------------------------ */
function initSeitengeruest() {
  // Header einfügen (in <div id="header"></div> oder ganz oben in <body>)
  const headerZiel = document.getElementById("header");
  if (headerZiel) headerZiel.innerHTML = baueHeader();
  else document.body.insertAdjacentHTML("afterbegin", baueHeader());

  // Footer einfügen (in <div id="footer"></div> oder ganz unten in <body>)
  const footerZiel = document.getElementById("footer");
  if (footerZiel) footerZiel.innerHTML = baueFooter();
  else document.body.insertAdjacentHTML("beforeend", baueFooter());

  // Mobiles Menü (Hamburger) umschalten
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const offen = menu.classList.toggle("offen");
      toggle.setAttribute("aria-expanded", offen ? "true" : "false");
    });
  }
}

/* Warenkorb-Zähler oben aktualisieren (wird auch von cart.js aufgerufen) */
function aktualisiereWarenkorbAnzeige() {
  const el = document.getElementById("warenkorbAnzahl");
  if (el) el.textContent = warenkorbAnzahl();
}

/* Kleine Erfolgsmeldung unten einblenden */
function zeigeToast(text) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  // erzwingt Reflow, damit die Animation zuverlässig startet
  void toast.offsetWidth;
  toast.classList.add("sichtbar");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("sichtbar"), 2200);
}

/* Preis hübsch formatieren, z. B. 8.5 -> "8,50 €" */
function preisFormat(betrag) {
  return betrag.toLocaleString("de-AT", {
    style: "currency",
    currency: "EUR",
  });
}

/* ------------------------------------------------------------
   Produkt-Karte als HTML erzeugen (für Start- & Produktseite).
   Nutzt PRODUKTE-Daten aus products.js.
   ------------------------------------------------------------ */
function renderProduktKarte(produkt) {
  const bild = (typeof produktBild === "function")
    ? produktBild(produkt)
    : (produkt.bild || "assets/images/platzhalter.svg");
  const ausverkauft = !produkt.verfuegbar;

  const knopf = ausverkauft
    ? `<button class="btn" disabled>Ausverkauft</button>`
    : `<button class="btn btn--gruen" onclick="inWarenkorb('${produkt.id}')">In den Warenkorb</button>`;

  return `
  <article class="karte">
    <a href="produkt.html?id=${produkt.id}">
      <img class="karte__bild" src="${bild}" alt="${produkt.name}" loading="lazy">
    </a>
    <div class="karte__body">
      <span class="karte__kategorie">${produkt.kategorie}</span>
      <h3 class="karte__titel">
        <a href="produkt.html?id=${produkt.id}" style="color:inherit;text-decoration:none">${produkt.name}</a>
      </h3>
      <p class="karte__text">${produkt.kurz}</p>
      <div class="karte__fuss">
        <span class="preis">${preisFormat(produkt.preis)}
          <small>/ ${produkt.einheit}</small>
        </span>
      </div>
      ${knopf}
    </div>
  </article>`;
}

// Beim Laden der Seite ausführen
document.addEventListener("DOMContentLoaded", initSeitengeruest);
