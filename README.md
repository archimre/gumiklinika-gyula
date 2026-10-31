# Gumiklinika Gyula — webdesign-koncepció

Független, statikus webdesign-demo a gyulai **Gumiklinika Bt.** számára. Nem a vállalkozás hivatalos weboldala, nem áll kapcsolatban vele, és nem használható hivatalos oldalként a cég engedélye nélkül.

A leadfájl szerint a cégnek nincs saját weboldala; a nyilvános listák csak telefont és címet adnak. Ez a koncepció egy **műhely-munkalap / műszaki adatlap** nyelvet használ: szolgáltatás- és árlista, profilmérő, valamint időpontkérés egy nyomtatható munkalap-formában.

**Élő demó:** https://archimre.github.io/gumiklinika-gyula/ — nyilvánosan elérhető, de `noindex` jelöléssel. A linket csak a bemutatás céljára ossza meg.

## Futtatás

```bash
cd website-mockups/gumiklinika-gyula
python3 -m http.server 8000
```

Ezután nyissa meg a `http://localhost:8000` címet. Az `index.html` közvetlen megnyitása is működik: nincs build, nincs framework, nincs külső futásidejű függőség.

## Mit tartalmaz

- **Hero** – saját fotó-specimen metszetjelölésekkel, mérési vonalakkal és mono címkékkel.
- **Szolgáltatások** – kódolt munkák (GCS-01 … ELL-06) árral, időtartammal; a „Kiválaszt” gomb előkészíti a munkalapot.
- **Műhely** – rövid folyamatleírás és valódi műhelyfotó.
- **Profilmérő** – interaktív csúszka (1,6–8,0 mm), nyári/téli üzemmód, élő minősítés (jogi minimum, téli 4 mm-es ajánlás).
- **Időpontkérés** – munkalap: szolgáltatás, név, telefon, autó, gumiméret, dátum, idősáv, megjegyzés. Élő előzetes munkalap jobb oldalon; validáció; fiktív `GK-…` visszaigazolás. Vasárnapra nem enged időpontot, szombaton csak délelőtti idősávot.
- **Kapcsolat** – cím, telefon, minta nyitvatartás, mai nap kiemelése, 4,8/26 értékelés, sematikus térkép.
- **Koncepció-jelölés** – fekete felső sáv, „Minta” címkék, lábléc; a HTML `noindex, nofollow`.

A munkalap **nem küld semmit sehova**: nincs backend, API, adatbázis vagy analitika. Az űrlapadatok nem tárolódnak, és a foglalás a lap újratöltésekor elvész.

## Fájlok

```
gumiklinika-gyula/
├── index.html
├── styles.css
├── app.js
├── README.md
├── .github/workflows/pages.yml
├── .gitignore
└── assets/
    ├── favicon.svg
    ├── tire-tread.jpg      (hero)
    ├── tire-workshop.jpg   (műhely)
    ├── tire-sidewall.jpg   (profilmérő)
    └── fonts/              (Barlow Condensed, IBM Plex Sans/Mono + OFL)
```

## Dizájn

- **Nyelv:** műhely-munkalap / műszaki adatlap. Hideg papír alap, fekete vonalak, négyzetsarkok, látható rács, vágójelek, mérővonalak, mono adatcímkék, pecsét és vonalkód.
- **Paletta:** `#eef0ea` papír, `#101410` tus, `#ff4a00` munkaruha-narancs, `#1b3bff` műszaki kék. Nincs színátmenet, üveg, lágy árnyék vagy lekerekített kártya.
- **Tipográfia:** Barlow Condensed (600/800) a címekhez, IBM Plex Sans a szöveghez, IBM Plex Mono a címkékhez és adatokhoz. Mindhárom helyben van, OFL licenccel.
- **Fotók:** a három kép specimenként, mono kreditfelirattal; a hero és a műhely kép vágójelekkel, mérési vonalakkal.
- **Szándékos különbség** a másik két demóhoz képest: a Bols Café meleg, editorial-serif világa és a Skorpió sötét, színátmenetes/bento világa helyett itt hideg, ipari, nyomtatott munkalap-esztétika van.
- **Reszponzív:** 320, 360, 390, 414, 768, 1024 és 1440 px szélességen ellenőrizve, vízszintes túlcsordulás nélkül.
- **Akadálymentesség:** skip link, szemantikus címkék, `aria-live` a minősítésnél, `aria-expanded` a mobil menünél, billentyűzetes fókusz, natív date input, csökkentett mozgás támogatása. JavaScript nélkül egy rövid telefonszámos figyelmeztetés jelenik meg a munkalapnál.

## Tények és források (2026. 10. 31.)

- **Név:** Gumiklinika Kereskedelmi és Szolgáltató Bt. (a felületen: Gumiklinika Bt.).
- **Cím:** 5700 Gyula, Liszt Ferenc utca 4.
- **Telefon:** +36 30 955 3153.
- **Koordináták:** 46.647345 N, 21.2671757 E (OpenStreetMap / near-place).
- **Profil:** gumiabroncs-értékesítés és -szerelés (Infobel: „Sale and fitting of tyres”).
- **Értékelés:** 4,8/5, 26 értékelés (Infobel, a gyűjtés napján).
- **Weboldal:** a leadfájl és a Cylex szerint nincs saját weboldal; a koncepció ezt a hiányt mutatja be.
- **Nyitvatartás:** nyilvánosan nem elérhető, ezért a felületen **minta** (H–P 08:00–17:00, Szo 08:00–12:00, V zárva), és mindenhol jelölve van.

## Demó-adatok

- **A teljes szolgáltatás- és árlista** (GCS-01 … ELL-06, árak, időtartamok) minta. A valós szolgáltatások és árak egyeztetést igényelnek.
- **Nyitvatartás** – minta, nem a cég live adata.
- **Időpontkérés** – a munkalap, a `GK-…` szám, a validáció és a visszaigazolás demó; valódi foglalás nem történik.
- **Térkép** – sematikus vázlat, nem méretarányos, nem élő térkép.
- **A profilmérő** tájékoztató becslés; a 4 mm-es téli ajánlás és az 1,6 mm-es jogi minimum általános szakmai iránymutatás, nem helyettesíti a helyszíni ellenőrzést.

## Fotók és licencek

A képek illusztrációk, nem a Gumiklinika tényleges fotói. A felület csak CSS-ben vágja őket; a fájlok méretezett változatok.

- **Futófelület (hero):** Shixart1985, „Close view of worn tire showing tread patterns and dirt in a garage setting”, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), [Commons](https://commons.wikimedia.org/wiki/File:Close_view_of_worn_tire_showing_tread_patterns_and_dirt_in_a_garage_setting.jpg).
- **Műhely (centrírozó):** Shixart1985, „Machine is used for checking tire alignment at a garage in a busy city”, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), [Commons](https://commons.wikimedia.org/wiki/File:Machine_is_used_for_checking_tire_alignment_at_a_garage_in_a_busy_city.jpg).
- **Oldalfal (profilmérő):** A7N8X, „Winter tires with North American symbol”, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), [Commons](https://commons.wikimedia.org/wiki/File:Winter_tires_with_North_American_symbol.jpg).

## Közzététel GitHub Pages-en

1. Hozzon létre egy külön repositoryt, és a **jelen mappa tartalmát** tegye a repository gyökerébe.
2. `git add . && git commit -m "Gumiklinika Gyula webdesign concept" && git push`.
3. GitHub → Settings → Pages → Source: **GitHub Actions**. A `.github/workflows/pages.yml` a `main` ág push-jakor deployol.
4. A demo `noindex, nofollow` metát tartalmaz. Ezt csak a cég írásos engedélyével, hivatalos átadás után érdemes eltávolítani.

## Következő lépés egy valódi megbízás felé

1. Telefonon egyeztetni a valós szolgáltatásokat, árakat, nyitvatartást és a fotózás lehetőségét.
2. A demót külön linken megmutatni; a „Kiválaszt → munkalap” folyamat jól mutatja, hogyan lehetne online időpontot kérni.
3. Élesítéshez backend vagy űrlapszolgáltatás kell (értesítés a műhelynek), valamint adatvédelmi tájékoztató.
4. Hivatalossá tétel csak engedéllyel: a koncepció-jelölések és a `noindex` eltávolítása, saját fotók, impresszum.

A demó nem hivatalos, és nem szabad úgy publikálni, mintha a Gumiklinika saját oldala lenne.
