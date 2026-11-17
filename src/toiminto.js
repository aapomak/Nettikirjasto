
// Hakutoiminto, joka etsii kirjoja niiden nimen, tekijän tai aiheen perusteella.
const books = [
  // Tähän lisätään kirjoja, muodossa: { title, genre, kirjailija }.
  { title: "Harakan elämä", genre: "Elämän kerta", author: "Kaisa Heikkinen" },
  { title: "Mäentie", genre: "Romaani", author: "Aapo Mäkinen" },
  { title: "Suomen historia", genre: "Historia", author: "Mustafa Omar" },
  { title: "Matematiikan kauheudet", genre: "Kauhu", author: "Samu Posio" },
  { title: "Geometricaalinen Syöksy", genre: "Romaani", author: "Joe Metri Dash" },
  { title: "ST1 Suur Ryöstö", genre: "Rikos", author: "Niko Harakka" },
  { title: "Smarketin Tapaturma", genre: "Rikos", author: "Miro Posio" }
];

const form = document.getElementById("book-search-form");
const input = document.getElementById("book-search");
const suggestions = document.getElementById("search-suggestions");
const status = document.getElementById("search-status");
const results = document.getElementById("search-results");

let activeSuggestion = -1;

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fi")
    .trim();
}

function getBookFields(book) {
  return [book.title, book.author, book.category].filter(Boolean);
}

function findBooks(query) {
  const searchTerm = normalize(query);

  return books.filter((book) =>
    getBookFields(book).some((field) => normalize(field).includes(searchTerm)),
  );
}

function closeSuggestions() {
  suggestions.hidden = true;
  input.setAttribute("aria-expanded", "false");
  input.removeAttribute("aria-activedescendant");
  activeSuggestion = -1;
}

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
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    title.textContent = book.title;
    details.textContent = [book.author, book.category]
      .filter(Boolean)
      .join(" · ");
    option.append(title, details);
    option.addEventListener("click", () => selectBook(book));
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
    title.textContent = book.title;
    details.textContent = [book.author, book.category]
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
    status.textContent = books.length
      ? "Kirjoita kirjan nimi, tekijä tai aihe."
      : "Hakuun ei ole vielä lisätty kirjoja.";
    return;
  }

  if (books.length === 0) {
    status.textContent = "Kirjoja ei ole vielä lisätty hakuun.";
    return;
  }

  const matches = findBooks(query);
  renderResults(matches);
  status.textContent = matches.length
    ? `Löytyi ${matches.length} ${matches.length === 1 ? "kirja" : "kirjaa"}.`
    : "Hakusanalla ei löytynyt Kirjoja.";
}

function selectBook(book) {
  input.value = book.title;
  submitSearch();
  input.focus();
}

input.addEventListener("input", () => {
  const query = input.value.trim();
  renderResults([]);

  if (!query) {
    closeSuggestions();
    status.textContent = books.length
      ? "Kirjoita kirjan nimi, tekijä tai aihe."
      : "Hakuun ei ole vielä lisätty kirjoja.";
    return;
  }

  if (books.length === 0) {
    closeSuggestions();
    status.textContent = "Kirjoja ei ole vielä lisätty hakuun.";
    return;
  }

  const matches = findBooks(query);
  renderSuggestions(matches);
  status.textContent = matches.length
    ? `${Math.min(matches.length, 6)} hakuehdotusta.`
    : "Hakusanalla ei löytynyt Kirjoja.";
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
    option.click();
  } else if (event.key === "Escape") {
    closeSuggestions();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitSearch();
});

document.addEventListener("click", (event) => {
  if (!form.contains(event.target)) {
    closeSuggestions();
  }
});

// Haku koodin loppu.
