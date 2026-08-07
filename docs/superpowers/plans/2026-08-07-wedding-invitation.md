# To'y Taklifnomasi Sahifasi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page static wedding invitation website (index.html + style.css + script.js) with hero, countdown, program, location, gallery, gift, and RSVP sections, per the approved design spec.

**Architecture:** One static HTML page loaded top-to-bottom as a vertical scroll. Plain CSS (no framework, no build step) and vanilla JS (no dependencies). Each section is built and verified independently, then appended to the growing page via unique marker comments.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (ES5-compatible syntax, no build tool). Served locally for verification via `python3 -m http.server`.

## Global Constraints

- Language: all visible text is Uzbek only (per spec).
- No build tool, no framework, no npm dependencies — plain HTML/CSS/JS only.
- No automated test suite — every task is verified by manually loading the page in a browser and checking behavior visually (per spec: "Avtomatlashtirilgan testlar yo'q").
- All content (names, dates, address, phone number, card number) is placeholder/demo data to be swapped later.
- Countdown must show a static fallback date in the HTML that JS replaces — page must not show blank/broken content if JS fails to load.
- Site must render correctly at mobile width (~390px) and desktop width (~1280px+).

---

## Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `script.js`

**Interfaces:**
- Produces: `<!-- NEXT_SECTION -->` marker in `index.html` (inside `<main>`) — later tasks insert new `<section>` elements immediately before this marker, then re-emit the marker below their new section.
- Produces: `/* NEXT_STYLES */` marker at the end of `style.css` — later tasks insert new CSS rules immediately before this marker, then re-emit the marker below their new rules.
- Produces: `// NEXT_SCRIPT` marker at the end of `script.js` — later tasks insert new JS immediately before this marker, then re-emit the marker below their new code.
- Produces CSS custom properties on `:root`: `--color-bg-start`, `--color-bg-end`, `--color-text`, `--color-accent`, `--font-serif`, `--font-sans`.
- Produces base classes: `.section` (full-viewport centered flex column), `.label` (small uppercase tracking text), `.section-title` (italic serif heading), `.button` (pill-shaped link/button).

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ali &amp; Nilufar - To'y taklifnomasi</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <!-- NEXT_SECTION -->
  </main>
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `style.css`**

```css
:root {
  --color-bg-start: #fdf8f5;
  --color-bg-end: #f8ece4;
  --color-text: #5c4a42;
  --color-accent: #c9a896;
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-sans: 'Helvetica Neue', Arial, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: linear-gradient(180deg, var(--color-bg-start), var(--color-bg-end));
}

.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  position: relative;
}

.label {
  font-size: 11px;
  letter-spacing: 4px;
  opacity: 0.55;
  text-transform: uppercase;
}

.section-title {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 28px;
  margin: 8px 0 24px;
}

.button {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 28px;
  border: 1px solid var(--color-accent);
  border-radius: 24px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.button:hover {
  background: rgba(201, 168, 150, 0.2);
}

/* NEXT_STYLES */
```

- [ ] **Step 3: Create `script.js`**

```js
// NEXT_SCRIPT
```

- [ ] **Step 4: Verify the scaffold loads**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000` in a browser.
Expected: blank page with a soft pink-to-cream gradient background, no console errors (check browser DevTools console).
Stop the server with Ctrl+C when done.

- [ ] **Step 5: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add index.html style.css script.js
git commit -m "Add project scaffold with base styles and markers"
```

---

## Task 2: Hero Section

**Files:**
- Modify: `index.html` (replace `<!-- NEXT_SECTION -->`)
- Modify: `style.css` (replace `/* NEXT_STYLES */`)

**Interfaces:**
- Consumes: `.section`, `.label` classes and `--font-serif`, `--color-accent` variables from Task 1.
- Produces: `#hero` section. No IDs consumed by later tasks.

- [ ] **Step 1: Insert the hero section into `index.html`**

Replace:
```html
    <!-- NEXT_SECTION -->
```
With:
```html
    <section id="hero" class="section hero">
      <div class="hero-decor hero-decor-top">🌸</div>
      <div class="hero-decor hero-decor-bottom">🌸</div>
      <p class="label">TO'Y TAKLIFNOMASI</p>
      <h1 class="couple-names">Ali &amp; Nilufar</h1>
      <p class="hero-date">15 &middot; SENTABR &middot; 2026</p>
      <div class="scroll-hint">PASTGA SURING &darr;</div>
    </section>
    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add hero styles to `style.css`**

Replace:
```css
/* NEXT_STYLES */
```
With:
```css
.hero-decor {
  position: absolute;
  font-size: 20px;
  opacity: 0.6;
}
.hero-decor-top { top: 24px; left: 24px; }
.hero-decor-bottom { bottom: 24px; right: 24px; }

.couple-names {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: 42px;
  margin: 16px 0;
}

.hero-date {
  font-size: 12px;
  letter-spacing: 2px;
  opacity: 0.55;
}

.scroll-hint {
  margin-top: 24px;
  font-size: 10px;
  letter-spacing: 1px;
  border: 1px solid var(--color-accent);
  padding: 6px 18px;
  border-radius: 20px;
  opacity: 0.8;
}

/* NEXT_STYLES */
```

- [ ] **Step 3: Verify the hero section**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000` in a browser.
Expected: centered "Ali & Nilufar" in italic serif, "TO'Y TAKLIFNOMASI" label above it, date below, a pill-shaped "PASTGA SURING ↓" hint, and 🌸 in the top-left and bottom-right corners.
Resize the browser to ~390px width and confirm text stays centered and readable.
Stop the server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add index.html style.css
git commit -m "Add hero section"
```

---

## Task 3: Countdown Timer

**Files:**
- Modify: `index.html` (replace `<!-- NEXT_SECTION -->`)
- Modify: `style.css` (replace `/* NEXT_STYLES */`)
- Modify: `script.js` (replace `// NEXT_SCRIPT`)

**Interfaces:**
- Consumes: `.section`, `.label`, `--font-serif` from Task 1.
- Produces: element IDs `countdown-fallback`, `countdown-timer`, `countdown-days`, `countdown-hours`, `countdown-minutes`, `countdown-seconds`, `countdown-message`. No later task depends on these.

- [ ] **Step 1: Insert the countdown section into `index.html`**

Replace:
```html
    <!-- NEXT_SECTION -->
```
With:
```html
    <section id="countdown-section" class="section countdown-section">
      <p class="label">TO'YIMIZGACHA QOLDI</p>
      <p class="countdown-fallback" id="countdown-fallback">15 sentabr 2026</p>
      <div class="countdown" id="countdown-timer" hidden>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-days">00</span>
          <span class="countdown-unit">kun</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-hours">00</span>
          <span class="countdown-unit">soat</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-minutes">00</span>
          <span class="countdown-unit">daqiqa</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-seconds">00</span>
          <span class="countdown-unit">soniya</span>
        </div>
      </div>
      <p class="countdown-message" id="countdown-message" hidden>Baxtli kunimiz keldi! 🎉</p>
    </section>
    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add countdown styles to `style.css`**

Replace:
```css
/* NEXT_STYLES */
```
With:
```css
.countdown {
  display: flex;
  gap: 20px;
  margin-top: 16px;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-value {
  font-family: var(--font-serif);
  font-size: 36px;
}

.countdown-unit {
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.6;
}

.countdown-fallback,
.countdown-message {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 24px;
  margin-top: 16px;
}

/* NEXT_STYLES */
```

- [ ] **Step 3: Add countdown logic to `script.js`**

Replace:
```js
// NEXT_SCRIPT
```
With:
```js
(function () {
  var WEDDING_DATE = new Date('2026-09-15T17:00:00+05:00');

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function updateCountdown() {
    var now = new Date();
    var diff = WEDDING_DATE.getTime() - now.getTime();

    var fallback = document.getElementById('countdown-fallback');
    var timer = document.getElementById('countdown-timer');
    var message = document.getElementById('countdown-message');

    if (diff <= 0) {
      fallback.hidden = true;
      timer.hidden = true;
      message.hidden = false;
      return;
    }

    fallback.hidden = true;
    timer.hidden = false;
    message.hidden = true;

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    document.getElementById('countdown-days').textContent = pad(days);
    document.getElementById('countdown-hours').textContent = pad(hours);
    document.getElementById('countdown-minutes').textContent = pad(minutes);
    document.getElementById('countdown-seconds').textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// NEXT_SCRIPT
```

- [ ] **Step 4: Verify the countdown ticks and the fallback/completed states work**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000`, scroll to the countdown section.
Expected: the "15 sentabr 2026" fallback text is replaced within a second by four ticking numbers (kun/soat/daqiqa/soniya) that count down.
Temporarily edit `script.js` and change `WEDDING_DATE` to a past date, e.g. `'2020-01-01T00:00:00+05:00'`. Reload the page.
Expected: "Baxtli kunimiz keldi! 🎉" is shown instead of the timer.
Revert `WEDDING_DATE` back to `'2026-09-15T17:00:00+05:00'`.
Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add index.html style.css script.js
git commit -m "Add countdown timer with static fallback and completed state"
```

---

## Task 4: Dastur (Program/Agenda) Section

**Files:**
- Modify: `index.html` (replace `<!-- NEXT_SECTION -->`)
- Modify: `style.css` (replace `/* NEXT_STYLES */`)

**Interfaces:**
- Consumes: `.section`, `.label`, `.section-title`, `--font-serif`, `--color-accent` from Task 1.
- Produces: `#program` section. No later task depends on it.

- [ ] **Step 1: Insert the program section into `index.html`**

Replace:
```html
    <!-- NEXT_SECTION -->
```
With:
```html
    <section id="program" class="section program-section">
      <p class="label">KUN TARTIBI</p>
      <h2 class="section-title">Dastur</h2>
      <div class="timeline">
        <div class="timeline-item">
          <span class="timeline-time">17:00</span>
          <span class="timeline-event">Nikoh marosimi</span>
        </div>
        <div class="timeline-item">
          <span class="timeline-time">18:30</span>
          <span class="timeline-event">Mehmonlar kutib olinadi</span>
        </div>
        <div class="timeline-item">
          <span class="timeline-time">19:00</span>
          <span class="timeline-event">Kelin-kuyov kirishi</span>
        </div>
        <div class="timeline-item">
          <span class="timeline-time">20:00</span>
          <span class="timeline-event">Ziyofat va raqslar</span>
        </div>
      </div>
    </section>
    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add timeline styles to `style.css`**

Replace:
```css
/* NEXT_STYLES */
```
With:
```css
.timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 1px solid var(--color-accent);
  padding-left: 20px;
  text-align: left;
}

.timeline-item {
  display: flex;
  flex-direction: column;
}

.timeline-time {
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 700;
}

.timeline-event {
  font-size: 13px;
  opacity: 0.75;
}

/* NEXT_STYLES */
```

- [ ] **Step 3: Verify the program section**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000`, scroll to the "Dastur" section.
Expected: a left-aligned vertical timeline with a thin vertical line, four time/event pairs in order (17:00 → 20:00).
Stop the server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add index.html style.css
git commit -m "Add program/agenda timeline section"
```

---

## Task 5: Manzil (Location/Map) Section

**Files:**
- Modify: `index.html` (replace `<!-- NEXT_SECTION -->`)
- Modify: `style.css` (replace `/* NEXT_STYLES */`)

**Interfaces:**
- Consumes: `.section`, `.label`, `.section-title`, `.button` from Task 1.
- Produces: `#location` section. No later task depends on it.

- [ ] **Step 1: Insert the location section into `index.html`**

Replace:
```html
    <!-- NEXT_SECTION -->
```
With:
```html
    <section id="location" class="section location-section">
      <p class="label">TO'Y ZALI</p>
      <h2 class="section-title">Manzil</h2>
      <p class="location-name">"Bog'i Rayhon" to'y zali</p>
      <p class="location-address">Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi 45</p>
      <div class="map-embed">
        <iframe
          src="https://www.google.com/maps?q=Toshkent+Amir+Temur+45&output=embed"
          width="100%"
          height="250"
          style="border:0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      <a class="button" href="https://maps.google.com/?q=Toshkent+Amir+Temur+45" target="_blank" rel="noopener">Yo'nalishni ochish</a>
    </section>
    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add location styles to `style.css`**

Replace:
```css
/* NEXT_STYLES */
```
With:
```css
.location-name {
  font-family: var(--font-serif);
  font-size: 18px;
  margin-top: 8px;
}

.location-address {
  font-size: 13px;
  opacity: 0.75;
  margin-top: 4px;
  max-width: 320px;
}

.map-embed {
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

/* NEXT_STYLES */
```

- [ ] **Step 3: Verify the location section**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000`, scroll to the "Manzil" section.
Expected: venue name and address text, an embedded Google Map below it, and a "Yo'nalishni ochish" pill button.
Click the button and confirm it opens Google Maps in a new tab.
Stop the server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add index.html style.css
git commit -m "Add location/map section"
```

---

## Task 6: Galereya (Gallery) Section

**Files:**
- Create: `images/gallery-1.svg`
- Create: `images/gallery-2.svg`
- Create: `images/gallery-3.svg`
- Create: `images/gallery-4.svg`
- Modify: `index.html` (replace `<!-- NEXT_SECTION -->`)
- Modify: `style.css` (replace `/* NEXT_STYLES */`)

**Interfaces:**
- Consumes: `.section`, `.label`, `.section-title` from Task 1.
- Produces: `#gallery` section, `images/gallery-*.svg` placeholder files. No later task depends on these names, but they mark where real photos are swapped in later.

- [ ] **Step 1: Create placeholder gallery images**

Create `images/gallery-1.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#f0ddd0"/>
  <text x="50%" y="50%" font-family="Georgia, serif" font-size="24" fill="#5c4a42" text-anchor="middle" dominant-baseline="middle">Rasm 1</text>
</svg>
```

Create `images/gallery-2.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#f8ece4"/>
  <text x="50%" y="50%" font-family="Georgia, serif" font-size="24" fill="#5c4a42" text-anchor="middle" dominant-baseline="middle">Rasm 2</text>
</svg>
```

Create `images/gallery-3.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#ecd9cb"/>
  <text x="50%" y="50%" font-family="Georgia, serif" font-size="24" fill="#5c4a42" text-anchor="middle" dominant-baseline="middle">Rasm 3</text>
</svg>
```

Create `images/gallery-4.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#fdf3ec"/>
  <text x="50%" y="50%" font-family="Georgia, serif" font-size="24" fill="#5c4a42" text-anchor="middle" dominant-baseline="middle">Rasm 4</text>
</svg>
```

- [ ] **Step 2: Insert the gallery section into `index.html`**

Replace:
```html
    <!-- NEXT_SECTION -->
```
With:
```html
    <section id="gallery" class="section gallery-section">
      <p class="label">XOTIRALAR</p>
      <h2 class="section-title">Galereya</h2>
      <div class="gallery-grid">
        <img class="gallery-image" src="images/gallery-1.svg" alt="Juftlik surati 1" loading="lazy">
        <img class="gallery-image" src="images/gallery-2.svg" alt="Juftlik surati 2" loading="lazy">
        <img class="gallery-image" src="images/gallery-3.svg" alt="Juftlik surati 3" loading="lazy">
        <img class="gallery-image" src="images/gallery-4.svg" alt="Juftlik surati 4" loading="lazy">
      </div>
    </section>
    <!-- NEXT_SECTION -->
```

- [ ] **Step 3: Add gallery styles to `style.css`**

Replace:
```css
/* NEXT_STYLES */
```
With:
```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-width: 400px;
  width: 100%;
  margin-top: 16px;
}

.gallery-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  background: var(--color-bg-end);
}

/* NEXT_STYLES */
```

- [ ] **Step 4: Verify the gallery section**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000`, scroll to the "Galereya" section.
Expected: a 2-column grid of four square placeholder images labeled "Rasm 1"–"Rasm 4", no broken-image icons.
Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add images index.html style.css
git commit -m "Add gallery section with placeholder images"
```

---

## Task 7: Sovg'a (Gift) Section

**Files:**
- Modify: `index.html` (replace `<!-- NEXT_SECTION -->`)
- Modify: `style.css` (replace `/* NEXT_STYLES */`)
- Modify: `script.js` (replace `// NEXT_SCRIPT`)

**Interfaces:**
- Consumes: `.section`, `.label`, `.section-title`, `.button` from Task 1.
- Produces: element IDs `gift-card-number`, `gift-copy-button`. No later task depends on these.

- [ ] **Step 1: Insert the gift section into `index.html`**

Replace:
```html
    <!-- NEXT_SECTION -->
```
With:
```html
    <section id="gift" class="section gift-section">
      <p class="label">SOVG'A</p>
      <h2 class="section-title">Sovg'a</h2>
      <p class="gift-text">Tabriklaringiz biz uchun eng katta sovg'a. Agar moddiy sovg'a berishni istasangiz, quyidagi karta raqamidan foydalanishingiz mumkin:</p>
      <div class="gift-card">
        <span class="gift-card-number" id="gift-card-number">8600 1234 5678 9012</span>
        <button class="button gift-copy-button" id="gift-copy-button" type="button">Nusxalash</button>
      </div>
    </section>
    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add gift styles to `style.css`**

Replace:
```css
/* NEXT_STYLES */
```
With:
```css
.gift-text {
  font-size: 13px;
  opacity: 0.8;
  max-width: 320px;
  margin-top: 8px;
}

.gift-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 16px 24px;
  border: 1px solid var(--color-accent);
  border-radius: 12px;
}

.gift-card-number {
  font-family: var(--font-serif);
  font-size: 18px;
  letter-spacing: 2px;
  user-select: all;
}

/* NEXT_STYLES */
```

- [ ] **Step 3: Add copy-to-clipboard logic to `script.js`**

Replace:
```js
// NEXT_SCRIPT
```
With:
```js
(function () {
  var copyButton = document.getElementById('gift-copy-button');
  var cardNumber = document.getElementById('gift-card-number');
  var originalLabel = copyButton.textContent;

  copyButton.addEventListener('click', function () {
    var text = cardNumber.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        copyButton.textContent = 'Nusxalandi!';
        setTimeout(function () {
          copyButton.textContent = originalLabel;
        }, 2000);
      });
    }
  });
})();

// NEXT_SCRIPT
```

- [ ] **Step 4: Verify the gift section and copy button**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000`, scroll to the "Sovg'a" section.
Expected: gift text, a bordered card showing "8600 1234 5678 9012" and a "Nusxalash" button.
Click "Nusxalash", then paste (Cmd+V) into the browser's address bar to confirm the card number was copied.
Expected: button text changes to "Nusxalandi!" for 2 seconds, then reverts to "Nusxalash".
Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add index.html style.css script.js
git commit -m "Add gift section with copy-to-clipboard button"
```

---

## Task 8: RSVP Section

**Files:**
- Modify: `index.html` (replace `<!-- NEXT_SECTION -->`)
- Modify: `style.css` (replace `/* NEXT_STYLES */`)
- Modify: `script.js` (replace `// NEXT_SCRIPT`)

**Interfaces:**
- Consumes: `.section`, `.label`, `.section-title`, `.button` from Task 1.
- Produces: element ID `rsvp-button`. No later task depends on it.

- [ ] **Step 1: Insert the RSVP section into `index.html`**

Replace:
```html
    <!-- NEXT_SECTION -->
```
With:
```html
    <section id="rsvp" class="section rsvp-section">
      <p class="label">RSVP</p>
      <h2 class="section-title">Kelishingizni tasdiqlang</h2>
      <p class="rsvp-text">Bayramimizni siz bilan birga nishonlashni orziqib kutamiz!</p>
      <a class="button rsvp-button" id="rsvp-button" href="#" target="_blank" rel="noopener">Kelishimni tasdiqlayman</a>
    </section>
    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add RSVP styles to `style.css`**

Replace:
```css
/* NEXT_STYLES */
```
With:
```css
.rsvp-text {
  font-size: 13px;
  opacity: 0.8;
  max-width: 300px;
  margin-top: 8px;
}

/* NEXT_STYLES */
```

- [ ] **Step 3: Add RSVP link-building logic to `script.js`**

Replace:
```js
// NEXT_SCRIPT
```
With:
```js
(function () {
  var PHONE_NUMBER = '998901234567';
  var MESSAGE = "Assalomu alaykum! Ali va Nilufarning to'yiga kelishimni tasdiqlayman.";

  var rsvpButton = document.getElementById('rsvp-button');
  rsvpButton.href = 'https://wa.me/' + PHONE_NUMBER + '?text=' + encodeURIComponent(MESSAGE);
})();

// NEXT_SCRIPT
```

- [ ] **Step 4: Verify the RSVP button**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000`, scroll to the RSVP section.
Expected: "Kelishingizni tasdiqlang" heading, short text, and a "Kelishimni tasdiqlayman" pill button.
Hover over (or inspect) the button and confirm its `href` is `https://wa.me/998901234567?text=...` with the Uzbek message URL-encoded.
Click it and confirm it attempts to open WhatsApp (web or app) in a new tab.
Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add index.html style.css script.js
git commit -m "Add RSVP section with WhatsApp deep link"
```

---

## Task 9: Final Cleanup and Cross-Device Check

**Files:**
- Modify: `index.html` (remove trailing marker)
- Modify: `style.css` (remove trailing marker)
- Modify: `script.js` (remove trailing marker)

**Interfaces:**
- Consumes: all sections and markers from Tasks 1–8.
- Produces: final, marker-free `index.html`, `style.css`, `script.js`.

- [ ] **Step 1: Remove the leftover HTML marker**

In `index.html`, remove the now-unused trailing marker line:
```html
    <!-- NEXT_SECTION -->
```
(Delete this line; it should currently sit right after the closing `</section>` of the RSVP section, just before `</main>`.)

- [ ] **Step 2: Remove the leftover CSS marker**

In `style.css`, remove the trailing marker line:
```css
/* NEXT_STYLES */
```
(Delete this line; it should currently be the last line of the file.)

- [ ] **Step 3: Remove the leftover JS marker**

In `script.js`, remove the trailing marker line:
```js
// NEXT_SCRIPT
```
(Delete this line; it should currently be the last line of the file.)

- [ ] **Step 4: Full cross-device verification**

Run: `cd /Users/fayzullo/Documents/GitHub/wedding-invitation && python3 -m http.server 8000`
Open `http://localhost:8000` in a browser.
Resize the viewport to ~390px width (mobile) and scroll through all seven sections top to bottom (Hero → Countdown → Dastur → Manzil → Galereya → Sovg'a → RSVP): confirm no horizontal scrollbar appears, text doesn't overflow its container, and the map/gallery/timeline all remain legible.
Resize the viewport to ~1280px width (desktop) and repeat the same scroll-through: confirm content stays centered and doesn't stretch awkwardly wide.
Check the browser DevTools console for errors on both sizes.
Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
cd /Users/fayzullo/Documents/GitHub/wedding-invitation
git add index.html style.css script.js
git commit -m "Remove build markers after final section"
```

---

## Self-Review Notes

- **Spec coverage:** All 7 sections from the spec (Hero, Countdown, Dastur, Manzil, Galereya, Sovg'a, RSVP) are covered by Tasks 2–8. Task 1 covers the architecture/scaffold requirement. Task 9 covers the cross-device manual testing requirement and cleans up scaffolding markers. Vizual uslub (romantic + minimal, pink/cream gradient, italic serif headings, accent flourishes) is implemented in Task 1's CSS variables and Task 2's hero styling, reused throughout.
- **Placeholder scan:** All placeholder content (names, date, venue, address, card number, phone number) is explicit, real-looking demo data — not TBD/TODO — matching the spec's explicit placeholder-content requirement.
- **Type/name consistency:** Verified every `id` referenced in `script.js` (`countdown-fallback`, `countdown-timer`, `countdown-days/hours/minutes/seconds`, `countdown-message`, `gift-card-number`, `gift-copy-button`, `rsvp-button`) matches an `id` defined in the corresponding HTML step in the same task.
