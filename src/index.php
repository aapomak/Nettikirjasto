<?php
session_start();

$loggedIn = isset($_SESSION['user_id'], $_SESSION['username']);
$username = $loggedIn ? $_SESSION['username'] : '';
?>
<!DOCTYPE html>
<html lang="fi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <meta
      name="description"
      content="Posionmäen kirjaston verkkokirjasto – löydä luettavaa ja tutustu kirjaston palveluihin."
    />
    <title>Posionmäen kirjasto – Nettikirjasto</title>
    <script src="toiminto.js" defer></script>
  </head>
  <body>
    <div class="topline">
      <div class="container topline-inner">
        <div class="account-status" aria-live="polite">
          <?php if ($loggedIn): ?>
            Kirjautunut tilillä: <strong><?= htmlspecialchars($username, ENT_QUOTES, 'UTF-8') ?></strong>
            · <a href="logout.php">Kirjaudu ulos</a>
          <?php else: ?>
            <a href="kirjaudu.html">Kirjaudu sisään</a>
            · <a href="rekisteröityminen.html">Rekisteröidy</a>
          <?php endif; ?>
        </div>
        <span>Tervetuloa lukemisen äärelle</span>
      </div>
    </div>

    <header>
      <div class="container header-main">
        <div class="brand" aria-label="Posionmäen kirjasto">
          <span class="brand-mark" aria-hidden="true">P</span>
          <span>
            <span class="brand-name">Posionmäen kirjasto</span>
            <span class="brand-subtitle">Nettikirjasto</span>
          </span>
        </div>
        <nav aria-label="Sivuston osiot">
          <a href="kirjasto.html">Kirjat ja aineistot</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-content">
          <p class="eyebrow">Löydä seuraava lukuelämys</p>
          <h1>Kirjastossa alkaa monta tarinaa.</h1>
          <p class="hero-copy">
            Tutustu kirjoihin, löydä uutta luettavaa ja tule viihtymään
            Posionmäen kirjastoon.
          </p>
          <form class="search-form" id="book-search-form" role="search">
            <label class="visually-hidden" for="book-search">
              Hae kirjan nimellä, tekijällä tai aiheella
            </label>
            <div class="search-control">
              <span class="search-icon" aria-hidden="true"></span>
              <input
                id="book-search"
                name="q"
                type="search"
                placeholder="Kirjan nimi, tekijä tai aihe"
                autocomplete="off"
                role="combobox"
                aria-autocomplete="list"
                aria-haspopup="listbox"
                aria-controls="search-suggestions"
                aria-expanded="false"
              />
              <button type="submit">Hae</button>
            </div>
            <ul
              class="search-suggestions"
              id="search-suggestions"
              role="listbox"
              aria-label="Hakuehdotukset"
              hidden
            ></ul>
            <p class="search-status" id="search-status" aria-live="polite"></p>
            <section
              class="search-results"
              id="search-results"
              aria-label="Haun tulokset"
              hidden
            ></section>
          </form>
        </div>
      </section>

      <section class="section featured">
        <div class="container">
          <div class="section-heading">
            <h2>Vinkkejä lukemiseen</h2>
            <p class="section-note">Kirjaston nostoja juuri sinulle.</p>
          </div>
          <div class="book-grid">
            <a class="book" data-book-id="harakan-elama" href="kirja.html?id=harakan-elama">
              <img class="book-cover" src="kuvat/Harakan_elämä.jpg" alt="Harakan elämä -kirjan kansi" loading="lazy" />
              <h3>Harakan elämä</h3>
              <p>Kaisa Heikkinen · Elämän kerta</p>
            </a>
            <a class="book" data-book-id="maentie" href="kirja.html?id=maentie">
              <img class="book-cover" src="kuvat/Mäentie.jpg" alt="Mäentie-kirjan kansi" loading="lazy" />
              <h3>Mäentie</h3>
              <p>Aapo Mäkinen · Romaani</p>
            </a>
            <a class="book" data-book-id="suomen-historia" href="kirja.html?id=suomen-historia">
              <img class="book-cover" src="kuvat/Suomen_historia.jpg" alt="Suomen Historia -kirjan kansi" loading="lazy" />
              <h3>Suomen Historia</h3>
              <p>Mustafa Omar · Historia</p>
            </a>
            <a class="book" data-book-id="matematiikan-kauhut" href="kirja.html?id=matematiikan-kauhut">
              <img class="book-cover" src="kuvat/Matematiikan_kauhut.jpg" alt="Matematiikan kauhut -kirjan kansi" loading="lazy" />
              <h3>Matematiikan kauhut</h3>
              <p>Samu Posio · Kauhu</p>
            </a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container info-grid">
          <article class="info-card">
            <p class="eyebrow">Meillä kirjastossa</p>
            <h2>Enemmän kuin kirjoja</h2>
            <p>
              Posionmäen kirjasto tarjoaa kirjojen lisäksi myös monipuolisia
              palveluita, kuten tapahtumia, työpajoja ja lukupiirejä. Tule
              tutustumaan ja löydä oma suosikkisi!
            </p>
          </article>
          <article class="info-card">
            <p class="eyebrow">Tule käymään</p>
            <h2>Aukioloajat</h2>
            <div class="hours-list">
              <span>Maanantai–perjantai</span><span>09-17</span>
              <span>Lauantai</span><span>03-07</span>
              <span>Sunnuntai</span><span>20-22</span>
            </div>
          </article>
        </div>
      </section>
    </main>

    <footer>
      <div class="container footer-content">
        <p>Posionmäen kirjasto</p>
        <p class="footer-muted">Posionmäentie 13, 67470 Posionmäki</p>
        <p class="footer-muted">Puhelin: 0123456789</p>
        <p class="footer-muted">Sähköposti: info@posionmäenkirjasto.fi</p>
      </div>
    </footer>
  </body>
</html>
