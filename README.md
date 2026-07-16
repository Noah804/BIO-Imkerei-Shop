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

## 10. Shop aktualisieren (Änderungen online stellen)

Der Shop liegt auf GitHub und ist unter **GitHub Pages** live:
`https://noah804.github.io/BIO-Imkerei-Shop/`

Nach jeder Änderung (Produkt, Text, Bild, Farbe …) machst du **drei Dinge**,
damit die Änderung im Internet erscheint:

1. **Datei ändern und speichern.**
2. **Hochladen.** Ordner in der Kommandozeile öffnen und diese Befehle eingeben:

   ```bash
   git add -A
   git commit -m "Kurz beschreiben, was geändert wurde"
   git push
   ```

   > `git add -A`   = alle Änderungen vormerken
   > `git commit`  = Änderungen als Paket speichern (Text in "…" anpassen)
   > `git push`    = Paket zu GitHub hochladen

3. **Warten.** Nach ca. 1 Minute ist die Änderung online (Seite mit F5 neu laden).

### So öffnest du die Kommandozeile im richtigen Ordner
- Im Datei-Explorer in den Shop-Ordner gehen.
- Oben in die Adresszeile klicken, `cmd` tippen, **Enter** — es öffnet sich
  ein schwarzes Fenster, das schon im richtigen Ordner steht.

### Falls etwas nicht klappt
- **"nothing to commit"** → es gab keine Änderung, oder die Datei war nicht
  gespeichert. Erst speichern, dann erneut `git add -A`.
- **Fehler beim `git push`** → meist die Anmeldung. Einfach nochmal versuchen;
  ggf. öffnet sich ein GitHub-Browser-Fenster zum Anmelden.
- **Unsicher?** Claude fragen — oder Claude die drei Befehle ausführen lassen.

### GitHub Pages einmalig aktivieren (nur beim ersten Mal)
Repository auf github.com → **Settings → Pages** → Branch auf **`main`**,
Ordner **`/ (root)`** → **Save**. Danach läuft alles automatisch.

## 11. Lagerbestand / „Ausverkauft" (später entscheiden)

Wunsch: eine Tabelle mit Stückzahlen führen — und wenn etwas verkauft wird,
soll sich die Zahl verringern und bei 0 automatisch „ausverkauft" anzeigen.

**Wichtig zu wissen:** Der Shop ist eine *statische Website* (nur Dateien, kein
Server). Eine Excel-Datei auf dem PC hat **keine Verbindung** zur Website — sie
kann sich beim Verkauf nicht von selbst ändern. Damit sich eine Stückzahl
*automatisch* verringert, muss die Bestellung irgendwo im Internet mitgeschrieben
werden. Das kann eine rein statische Seite allein nicht.

Drei mögliche Wege (in Ruhe entscheiden):

| Weg | Wie es sich anfühlt | Automatisch? | Kosten |
|-----|---------------------|--------------|--------|
| **A) Manuell im Code** | Pro Produkt eine Zahl in `js/products.js`; bei 0 = „ausverkauft" (`verfuegbar: false`) | ❌ selbst ändern | gratis |
| **B) Google-Tabelle** | Wie Excel: Mengen in eine Online-Tabelle schreiben, die Website liest sie live | 🟡 halb (Abzug beim Verkauf selbst) | gratis |
| **C) Echtes Shop-System** (z. B. Ecwid) | Fertiges Lager + Kasse + Bezahlung, „ausverkauft" von selbst | ✅ voll automatisch | teils gratis / teils kostenpflichtig |

- **A** ist das, was der Shop schon kann (`verfuegbar: true/false` je Produkt).
- **B** kommt der Excel-Idee am nächsten: echte Tabelle, Website reagiert live,
  ohne Code hochzuladen. Nur der Abzug beim Verkauf erfolgt von Hand (Stripe/PayPal
  schicken bei jeder Bestellung eine E-Mail).
- **C** macht das „automatisch abziehen + ausverkauft" komplett von selbst,
  ersetzt aber den selbst gebauten Warenkorb durch ein eingebautes Fremd-System.

**Empfehlung für eine kleine Imkerei:**
- „einfach & gratis, kleiner Handgriff pro Verkauf ist okay" → **Weg B**.
- „muss wirklich vollautomatisch sein" → **Weg C (Ecwid)**.

> Wenn du dich entschieden hast: Claude Bescheid sagen, dann wird der gewählte
> Weg gemeinsam eingerichtet.

## 12. Bewertungen verwalten (löschen)

Die Kundenbewertungen werden bei **Firebase** (Google) gespeichert. Von dort
kannst du einzelne oder alle Bewertungen löschen — z. B. Test-Einträge oder
unpassende Bewertungen.

> Hinweis: Die Firebase-Konsole ist auf **Englisch**. Die englischen
> Button-Namen stehen darum unten in `Anführungszeichen`.

**So kommst du zu den Bewertungen:**
1. Öffne <https://console.firebase.google.com> und wähle das Projekt
   **BIO Imkerei Moser**.
2. **Ganz links** im Menü unter `Project shortcuts` auf **`Firestore`** klicken.
3. **Oben** in der Reiter-Zeile auf den Reiter **`Data`** klicken (der erste).
4. Du siehst eine Spalte mit der Sammlung **`bewertungen`**. Klick sie an —
   in der Spalte daneben erscheinen alle Bewertungen.

**Eine einzelne Bewertung löschen:**
- In der mittleren Spalte die gewünschte Bewertung anklicken.
- **Oben** über der rechten Spalte auf das **Drei-Punkte-Menü ⋮** klicken.
- **`Delete document`** wählen → mit **`Delete`** bestätigen.

**Alle Bewertungen auf einmal löschen:**
- Mit der Maus über den Namen **`bewertungen`** fahren → rechts erscheint ein
  **Drei-Punkte-Menü ⋮**.
- Draufklicken → **`Delete collection`**.
- Zur Sicherheit musst du meist **`bewertungen`** eintippen → dann roter Button
  **`Delete`**.

Danach zeigt die Bewertungsseite wieder „Noch keine Bewertungen — sei die/der
Erste!". Neue Bewertungen von Kund:innen erscheinen weiterhin automatisch.

> Löschen geht **nur hier in der Firebase-Konsole**, nicht auf der Website
> selbst — so kann niemand fremde Bewertungen entfernen.

---

*Erstellt mit Sorgfalt 🍯 — viel Erfolg mit dem Shop!*
