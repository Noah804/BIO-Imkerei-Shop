# Plan — Imkerei Shop

## Technik-Entscheidung
- **Frontend:** reines HTML + CSS + JavaScript (kein Build-Tool, kein Node.js nötig).
  Läuft in jedem Browser und auf jedem einfachen Webhosting.
- **Warenkorb:** JavaScript, gespeichert im Browser (`localStorage`).
- **Produktdaten:** zentral in einer Datei `js/products.js` — leicht editierbar.
- **Bezahlung:** externer Dienst
  - Variante A: **Stripe Payment Links** (empfohlen, EU-tauglich, Rechnungen automatisch).
  - Variante B: **PayPal**-Buttons.
  → Bis dein Konto eingerichtet ist, gibt es einen klar markierten Platzhalter.
- **Hosting später:** z. B. Netlify, Cloudflare Pages, GitHub Pages oder normales Webhosting.

## Projektstruktur
```
Imkerei Shop/
├─ index.html            Startseite
├─ produkte.html         Produktübersicht
├─ produkt.html          Produkt-Detail (?id=…)
├─ warenkorb.html        Warenkorb & Kasse
├─ ueber-uns.html        Über die Imkerei
├─ kontakt.html          Kontakt
├─ impressum.html        Pflichtseite
├─ datenschutz.html      Pflichtseite (DSGVO)
├─ agb.html              Pflichtseite
├─ widerruf.html         Pflichtseite (Widerrufsrecht)
├─ css/style.css         Design
├─ js/products.js        Produktdaten (hier pflegst du Produkte)
├─ js/cart.js            Warenkorb-Logik
├─ js/main.js            allgemeines Verhalten (Menü, Rendering)
├─ assets/images/        Produktbilder & Logo
└─ README.md             Anleitung für dich
```

## Schritte (Reihenfolge)
1. [x] Ziel & Plan festhalten (GOAL.md, PLAN.md).
2. [x] Grundgerüst: Ordner, CSS-Design (Honig-Theme), Kopf/Fuß-Navigation.
3. [x] Produktdaten-Struktur + Beispielprodukte.
4. [x] Startseite.
5. [x] Produktübersicht + Detailseite.
6. [x] Warenkorb-Logik + Warenkorbseite.
7. [x] Rechtliche Seiten (Vorlagen zum Ausfüllen).
8. [x] Kontakt & Über-uns.
9. [ ] Bezahlung anbinden (Stripe/PayPal).
10. [ ] Eigene Texte, Bilder, Preise einpflegen.
11. [ ] Online stellen (Hosting).
12. [x] README-Anleitung erstellt.

## Offene Punkte, die DU liefern musst
- Firmendaten für Impressum (Name, Adresse, E-Mail, ggf. UID).
- Echte Produkte: Namen, Beschreibungen, Preise, Fotos.
- Konto bei Stripe oder PayPal.
- Versandkosten & Lieferbedingungen.

## Wichtiger rechtlicher Hinweis
Die rechtlichen Seiten sind **Vorlagen**, kein Rechtsrat. Vor dem echten
Verkauf sollten Impressum/Datenschutz/AGB/Widerruf geprüft werden
(z. B. WKO-Vorlagen oder Anwalt/Anwältin).
```
