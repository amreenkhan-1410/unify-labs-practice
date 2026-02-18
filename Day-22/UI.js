export function showLoader(show) {
  document.getElementById("loader").classList.toggle("hidden", !show);
}

export function renderCards(data, favorites) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>💰 $${item.current_price}</p>
      <button data-id="${item.id}">
        ${favorites.includes(item.id) ? "★ Favorited" : "☆ Favorite"}
      </button>
    `;

    container.appendChild(card);
  });
}

export function showError(message) {
  alert(message);
}
