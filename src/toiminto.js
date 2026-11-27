const books = [
  {
    id: "harakan-elama",
    title: "Harakan elämä",
    genre: "Elämän kerta",
    author: "Kaisa Heikkinen",
    image: "kuvat/Harakan_elämä.jpg",
    description:
      "Kaisa Heikkisen lämminhenkinen kertomus elämästä, muistoista ja pienistä arjen hetkistä.",
  },
  {
    id: "maentie",
    title: "Mäentie",
    genre: "Romaani",
    author: "Aapo Mäkinen",
    image: "kuvat/Mäentie.jpg",
    description:
      "Matka Mäentielle vie lukijan kylän ihmisten, kohtaamisten ja yllättävien käänteiden keskelle.",
  },
  {
    id: "suomen-historia",
    title: "Suomen historia",
    genre: "Historia",
    author: "Mustafa Omar",
    image: "kuvat/Suomen_historia.jpg",
    description:
      "Selkeä katsaus Suomen historian vaiheisiin ja tapahtumiin, jotka ovat muovanneet maata.",
  },
  {
    id: "matematiikan-kauhut",
    title: "Matematiikan kauhut",
    genre: "Kauhu",
    author: "Samu Posio",
    image: "kuvat/Matematiikan_kauhut.jpg",
    description:
      "Laskut muuttuvat painajaisiksi tässä humoristisessa kauhutarinassa, jossa mikään vastaus ei ole helppo.",
  },
  {
    id: "geometricaalinen-syoksy",
    title: "Geometricaalinen Syöksy",
    genre: "Romaani",
    author: "Joe Metri Dash",
    image: "kuvat/Joe_GD.jpg",
    description:
      "Vauhdikas seikkailu, jossa geometriset pulmat johdattavat päähenkilön yhä syvemmälle mysteeriin.",
  },
  {
    id: "st1-suur-ryosto",
    title: "ST1 Suur Ryöstö",
    genre: "Rikos",
    author: "Niko Harakka",
    image: "kuvat/ST1_Ryöstö.jpg",
    description:
      "Huoltoasemalla tapahtunut ryöstö käynnistää rikostutkinnan, jossa jokaisella on jotakin salattavaa.",
  },
  {
    id: "smarketin-tapaturma",
    title: "Smarketin Tapaturma",
    genre: "Rikos",
    author: "Miro Posio",
    image: "kuvat/Smarket.jpg",
    description:
      "Tavalliselta näyttävä päivä S-marketissa saa rikosjuonen liikkeelle ja herättää kysymyksiä tapahtuneesta.",
  },
  {
    id: "tokmannin-kellari-hirio",
    title: "Tokmannin kellari hirviö",
    genre: "Kauhu",
    author: "Nimetön Työntekijä",
    image: "kuvat/Tokmanni.jpg",
    description:
      "Tokmannin kellarista kuuluu outoja ääniä, ja työntekijä päättää selvittää, mitä varastossa piilee.",
  },
  {
    id: "final-boss",
    title: "Final Boss",
    genre: "Draama",
    author: "Anu Saukko",
    image: "kuvat/anusaukko.jpg",
    description:
      "Draama rohkeudesta kohdata elämän vaikeimmat vastukset ja löytää oma suunta niiden jälkeen.",
  },
  {
    id: "harakkojen-salaisuus",
    title: "Harakkojen salaisuus",
    genre: "Rikos",
    author: "Kaisa Heikkinen",
    image: "kuvat/Harakan_elämä.jpg",
    description:
      "Harakoiden ympärille kietoutuva salaisuus saa kyläläiset etsimään johtolankoja ennen kuin on liian myöhäistä.",
  },
  {
    id: "niko-files",
    title: "Niko Files",
    genre: "Rikos",
    author: "Joonatan Soranta",
    image: "kuvat/Joe_GD.jpg",
    description:
      "Niko kokoaa hajanaisia vihjeitä tapaukseen, jonka yksityiskohdat eivät tunnu sopivan yhteen.",
  },
  {
    id: "suvun-kumivene",
    title: "Suvun Kumivene",
    genre: "Romaani",
    author: "Kaisa Heikkinen",
    image: "kuvat/Mäentie.jpg",
    description:
      "Suvun yhteinen retki kumiveneellä muuttuu kertomukseksi sukulaisista, muistoista ja yllätyksistä.",
  },
  {
    id: "harakan-elama-2",
    title: "Harakan elämä 2",
    genre: "Elämän kerta",
    author: "Kaisa Heikkinen",
    image: "kuvat/Harakan_elämä.jpg",
    description:
      "Harakan elämä jatkuu uusien muistojen ja käänteiden parissa tässä tarinan toisessa osassa.",
  },
];

const form = document.getElementById("book-search-form");
const input = document.getElementById("book-search");
const suggestions = document.getElementById("search-suggestions");
const status = document.getElementById("search-status");
const results = document.getElementById("search-results");
const detail = document.getElementById("book-detail");

function openBook(book) {
  window.location.href = `kirja.html?id=${encodeURIComponent(book.id)}`;
}

function setupBookCard(card) {
  const book = books.find((item) => item.id === card.dataset.bookId);

  if (!book) {
    return;
  }

  if (card.tagName !== "A") {
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute(
      "aria-label",
      `${book.title}, ${book.author}, ${book.genre}. Avaa kirjan tiedot.`,
    );
  }
}

function renderBookDetail() {
  const bookId = new URLSearchParams(window.location.search).get("id");
  const book = books.find((item) => item.id === bookId);
  const notFound = document.getElementById("book-not-found");
  const backLink = document.getElementById("book-back-link");
  const referrer = document.referrer;

  if (referrer) {
    try {
      const previousPage = new URL(referrer);
      if (previousPage.origin === window.location.origin) {
        backLink.href = previousPage.href;
      }
    } catch {
      backLink.href = "index.php";
    }
  }

  if (!book) {
    notFound.hidden = false;
    return;
  }

  document.title = `${book.title} – Posionmäen kirjasto`;
  document.getElementById("book-detail-image").src = book.image;
  document.getElementById("book-detail-image").alt = `${book.title} -kirjan kansi`;
  document.getElementById("book-detail-title").textContent = book.title;
  document.getElementById("book-detail-author").textContent = book.author;
  document.getElementById("book-detail-genre").textContent = book.genre;
  document.getElementById("book-detail-description").textContent =
    book.description;
  detail.hidden = false;
}

if (detail) {
  renderBookDetail();
}

document.querySelectorAll(".book[data-book-id]").forEach(setupBookCard);

document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-book-id]");

  if (card && card.tagName !== "A") {
    const book = books.find((item) => item.id === card.dataset.bookId);
    if (book) {
      openBook(book);
    }
  }

  if (form && !form.contains(event.target)) {
    closeSuggestions();
  }
});

document.addEventListener("keydown", (event) => {
  const card = event.target.closest(".book[data-book-id], .search-result[data-book-id]");

  if (
    card &&
    card.tagName !== "A" &&
    (event.key === "Enter" || event.key === " ")
  ) {
    event.preventDefault();
    const book = books.find((item) => item.id === card.dataset.bookId);
    if (book) {
      openBook(book);
    }
  }
});

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fi")
    .trim();
}

function getBookFields(book) {
  return [book.title, book.author, book.genre].filter(Boolean);
}

function findBooks(query) {
  const searchTerm = normalize(query);

  return books.filter((book) =>
    getBookFields(book).some((field) => normalize(field).includes(searchTerm)),
  );
}

function closeSuggestions() {
  if (!suggestions || !input) {
    return;
  }

  suggestions.hidden = true;
  input.setAttribute("aria-expanded", "false");
  input.removeAttribute("aria-activedescendant");
  activeSuggestion = -1;
}

let activeSuggestion = -1;

function setActiveSuggestion(index) {
  const options = suggestions.querySelectorAll('[role="option"]');

  if (!options.length) {
    return;
  }

  activeSuggestion = (index + options.length) % options.length;
  options.forEach((option, optionIndex) => {
    const isActive = optionIndex === activeSuggestion;
    option.setAttribute("aria-selected", String(isActive));

    if (isActive) {
      input.setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    }
  });
}

function renderSuggestions(matches) {
  suggestions.textContent = "";
  activeSuggestion = -1;

  matches.slice(0, 6).forEach((book, index) => {
    const option = document.createElement("li");
    const title = document.createElement("span");
    const details = document.createElement("small");

    option.className = "search-suggestion";
    option.id = `search-suggestion-${index}`;
    option.dataset.bookId = book.id;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    title.textContent = book.title;
    details.textContent = [book.author, book.genre]
      .filter(Boolean)
      .join(" · ");
    option.append(title, details);
    suggestions.append(option);
  });

  suggestions.hidden = matches.length === 0;
  input.setAttribute("aria-expanded", String(matches.length > 0));
}

function renderResults(matches) {
  results.textContent = "";

  matches.forEach((book) => {
    const article = document.createElement("article");
    const title = document.createElement("h2");
    const details = document.createElement("p");

    article.className = "search-result";
    article.dataset.bookId = book.id;
    article.tabIndex = 0;
    article.setAttribute("role", "link");
    article.setAttribute("aria-label", `${book.title}. Avaa kirjan tiedot.`);
    title.textContent = book.title;
    details.textContent = [book.author, book.genre]
      .filter(Boolean)
      .join(" · ");
    article.append(title, details);
    results.append(article);
  });

  results.hidden = matches.length === 0;
}

function submitSearch() {
  const query = input.value.trim();

  closeSuggestions();
  renderResults([]);

  if (!query) {
    status.textContent = "Kirjoita kirjan nimi, tekijä tai aihe.";
    return;
  }

  const matches = findBooks(query);
  renderResults(matches);
  status.textContent = matches.length
    ? `Löytyi ${matches.length} ${matches.length === 1 ? "kirja" : "kirjaa"}.`
    : "Hakusanalla ei löytynyt kirjoja.";
}

function selectBook(book) {
  openBook(book);
}

if (form && input && suggestions && status && results) {
  input.addEventListener("input", () => {
    const query = input.value.trim();
    renderResults([]);

    if (!query) {
      closeSuggestions();
      status.textContent = "Kirjoita kirjan nimi, tekijä tai aihe.";
      return;
    }

    const matches = findBooks(query);
    renderSuggestions(matches);
    status.textContent = matches.length
      ? `${Math.min(matches.length, 6)} hakuehdotusta.`
      : "Hakusanalla ei löytynyt kirjoja.";
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" && !suggestions.hidden) {
      event.preventDefault();
      setActiveSuggestion(activeSuggestion + 1);
    } else if (event.key === "ArrowUp" && !suggestions.hidden) {
      event.preventDefault();
      setActiveSuggestion(
        activeSuggestion < 0
          ? suggestions.querySelectorAll('[role="option"]').length - 1
          : activeSuggestion - 1,
      );
    } else if (
      event.key === "Enter" &&
      activeSuggestion >= 0 &&
      !suggestions.hidden
    ) {
      event.preventDefault();
      const option = suggestions.querySelectorAll('[role="option"]')[
        activeSuggestion
      ];
      const book = books.find((item) => item.id === option.dataset.bookId);
      if (book) {
        selectBook(book);
      }
    } else if (event.key === "Escape") {
      closeSuggestions();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitSearch();
  });
}
