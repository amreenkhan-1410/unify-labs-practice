import { fetchMarketData } from "./API.js";
import { renderCards, showLoader, showError } from "./UI.js";

const State = {
  data: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  theme: localStorage.getItem("theme") || "light"
};

document.body.classList.toggle("dark", State.theme === "dark");

async function init() {
  showLoader(true);
  try {
    State.data = await fetchMarketData();
    updateUI();
  } catch {
    showError("Failed to fetch data.");
  }
  showLoader(false);
}

function updateUI() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const sort = document.getElementById("sortSelect").value;

  let filtered = State.data.filter(item =>
    item.name.toLowerCase().includes(search)
  );

  filtered.sort((a, b) =>
    sort === "price"
      ? b.current_price - a.current_price
      : a.name.localeCompare(b.name)
  );

  renderCards(filtered.slice(0, 20), State.favorites);
}

document.getElementById("searchInput").addEventListener("input", updateUI);
document.getElementById("sortSelect").addEventListener("change", updateUI);

document.getElementById("cardContainer").addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    State.favorites.includes(id)
      ? State.favorites = State.favorites.filter(f => f !== id)
      : State.favorites.push(id);

    localStorage.setItem("favorites", JSON.stringify(State.favorites));
    updateUI();
  }
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  State.theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", State.theme);
});

init();
