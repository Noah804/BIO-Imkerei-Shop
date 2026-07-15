# 🐝 BIO-Imkerei Moser — Online-Shop

Ein einfacher, echter Webshop aus reinem HTML, CSS und JavaScript.
Kein Server, kein Node.js, kein Build-Werkzeug nötig — die Dateien laufen
direkt im Browser und auf jedem einfachen Webhosting.

---

## 1. Shop ansehen (lokal)

Doppelklick auf **`index.html`** — die Seite öffnet sich im Browser.
Von dort kannst du dich durch den ganzen Shop klicken.

> Tipp: Änderungen an Dateien werden erst sichtbar, wenn du die Seite im
> Browser neu lädst (Taste **F5**).

---

## 2. Die wichtigsten Dateien

| Datei / Ordner        | Wofür                                              |
|-----------------------|----------------------------------------------------|
| `index.html`          | Startseite                                         |
| `produkte.html`       | Produktübersicht mit Kategorie-Filter             |
| `produkt.html`        | Einzelnes Produkt (Adresse: `produkt.html?id=…`)  |
| `warenkorb.html`      | Warenkorb & Kasse                                 |
| `ueber-uns.html`      | Über die Imkerei                                  |
| `kontakt.html`        | Kontaktformular                                   |
| `impressum.html` u.a. | Rechtliche Pflichtseiten                          |
| `css/style.css`       | **Das gesamte Design** (Farben ganz oben)         |
| `js/products.js`      | **Deine Produkte** (hier pflegst du am meisten)   |
| `js/main.js`          | Navigation, Fußzeile, Shop-Grunddaten             |
| `js/cart.js`          | Warenkorb-Logik                                   |
| `assets/images/`      | Bilder (Produktfotos, Logo)                       |

---

## 3. Shop-Grunddaten ändern (Name, E-Mail, Ort)

Öffne **`js/main.js`** und ändere ganz oben den Block `SHOP`:

```javascript
const SHOP = {
  name: "BIO-Imkerei Moser",
  slogan: "Honig & Bienenprodukte direkt vom Imker",
  email: "kontakt@imkerei-moser.at",
  ort: "Saalfelden, Österreich",
};
```

Diese Werte erscheinen automatisch in der Navigation, der Fußzeile und im Kontakt.

---

## 4. Produkte pflegen (das Wichtigste!)

Alle Produkte stehen in **`js/products.js`** in der Liste `PRODUKTE`.
Jedes Produkt ist ein Block:

```javascript
{
  id: "bluetenhonig",              // eindeutig, klein, keine Leerzeichen
  name: "Blütenhonig",
  kategorie: "Honig",
  preis: 8.50,                     // Punkt als Komma! (8.50 = 8,50 €)
  einheit: "500 g Glas",
  kurz: "Kurzbeschreibung für die Übersicht.",
  beschreibung: "Langer Text für die Detailseite.",
  bild: "assets/images/bluetenhonig.jpg",
  verfuegbar: true,                // false = "ausverkauft"
},
```

- **Produkt ändern:** Werte überschreiben.
- **Produkt hinzufügen:** einen Block kopieren, einfügen, Werte ändern
  (auf das Komma am Ende achten).
- **Produkt entfernen:** den ganzen `{ … },`-Block löschen.
- **Ausverkauft:** `verfuegbar: false` setzen.

### Produktbilder
1. Foto in den Ordner `assets/images/` legen (z. B. `bluetenhonig.jpg`).
2. Beim Produkt den Pfad eintragen: `bild: "assets/images/bluetenhonig.jpg"`.
3. Fehlt ein Bild, zeigt der Shop automatisch das Platzhalter-Bild 🍯.

> Empfehlung: Bilder vor dem Hochladen verkleinern (z. B. max. 1200 px Breite),
> damit die Seite schnell lädt. Querformat (4:3) sieht in den Karten am besten aus.

---

## 5. Farben / Design anpassen

In **`css/style.css`** ganz oben im Block `:root` stehen alle Farben zentral:

```css
--honig:  #f2a900;   /* Hauptfarbe */
--braun:  #3a2a15;   /* Textfarbe */
...
```

Eine Farbe hier ändern = überall im Shop geändert.

---

## 6. Rechtliche Seiten ausfüllen

In `impressum.html`, `datenschutz.html`, `agb.html`, `widerruf.html`
alle gelb markierten `[Platzhalter]` durch echte Daten ersetzen.

> ⚠️ **Wichtig:** Das sind **Vorlagen, kein Rechtsrat.** Vor dem echten Verkauf
> prüfen lassen — die **WKO (Wirtschaftskammer)** bietet Mitgliedern kostenlose
> Muster und Beratung. Bei Lebensmitteln zusätzlich Kennzeichnungspflichten beachten.

---

## 7. Bezahlung einrichten (Schritt 9)

Noch offen. Der „Zur Kasse"-Button zeigt aktuell nur einen Hinweis.
Geplanter Weg (sicher, ohne eigenen Server):

- **Stripe Payment Links** *(empfohlen, EU-tauglich)* oder **PayPal**.
- Du legst pro Produkt (oder für den Warenkorb) einen Bezahllink an und
  wir verknüpfen ihn im Shop.
- Kund:innen zahlen sicher direkt bei Stripe/PayPal — du berührst nie
  Kreditkartendaten.

Sag Bescheid, dann richten wir das gemeinsam ein.

---

## 8. Shop online stellen (Hosting)

Der Shop besteht nur aus Dateien und läuft auf jedem statischen Hosting.
Einfache, kostenlose Möglichkeiten:

| Anbieter            | Wie                                                        |
|---------------------|-----------------------------------------------------------|
| **Netlify**         | Ordner auf netlify.com per Drag & Drop hochladen          |
| **Cloudflare Pages**| Projekt verbinden, veröffentlichen                        |
| **GitHub Pages**    | Dateien in ein Repository, Pages aktivieren               |
| **Eigenes Webhosting** | Dateien per FTP in den Web-Ordner laden                 |

Eigene Domain (z. B. `imkerei-moser.at`) kann bei allen ergänzt werden.

---

## 9. Was noch zu tun ist (Checkliste)

- [ ] Shop-Grunddaten in `js/main.js` prüfen (Name, E-Mail, Ort)
- [ ] Echte Produkte in `js/products.js` eintragen
- [ ] Echte Produktfotos in `assets/images/` legen
- [ ] Über-uns-Text schreiben
- [ ] Rechtliche Seiten ausfüllen und prüfen lassen
- [ ] Versandkosten & Lieferbedingungen festlegen
- [ ] Bezahlung (Stripe/PayPal) einrichten
- [ ] Shop online stellen

---

*Erstellt mit Sorgfalt 🍯 — viel Erfolg mit dem Shop!*
