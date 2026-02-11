const typeColors = {
  fire: ["#ff9a9e", "#ff6a88"],
  water: ["#89f7fe", "#66a6ff"],
  grass: ["#a8ff78", "#78ffd6"],
  electric: ["#fddb92", "#d1fdff"],
  psychic: ["#ff9a9e", "#fad0c4"],
  ice: ["#a1c4fd", "#c2e9fb"],
  dragon: ["#667eea", "#764ba2"],
  dark: ["#434343", "#000000"],
  fairy: ["#ffdde1", "#ee9ca7"],
  normal: ["#d3cce3", "#e9e4f0"]
};

async function searchPokemon() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const container = document.getElementById("pokemonContainer");

  if (!input) {
    showError("Please enter a Pokémon name.");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!response.ok) throw new Error();

    const data = await response.json();
    displayPokemon(data);

  } catch {
    showError("Pokémon not found.");
  }
}

function displayPokemon(data) {
  const container = document.getElementById("pokemonContainer");
  const type = data.types[0].type.name;
  const colors = typeColors[type] || ["#e0c3fc", "#ffffff"];

  document.body.style.background = `
    linear-gradient(135deg, ${colors[0]}, ${colors[1]})
  `;

  container.innerHTML = `
    <div class="pokemon-card">
      <h2>#${data.id} ${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" />
      <p><strong>Type:</strong> ${type}</p>

      ${data.stats.map(stat => `
        <div class="stat">
          <div class="stat-label">
            <span>${stat.stat.name.toUpperCase()}</span>
            <span>${stat.base_stat}</span>
          </div>
          <div class="stat-bar">
            <div class="stat-fill" style="width: ${stat.base_stat / 2}%"></div>
          </div>
        </div>
      `).join("")}

      <button onclick="toggleShiny(${data.id})">✨ Toggle Shiny</button>
    </div>
  `;
}

async function toggleShiny(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  const img = document.querySelector(".pokemon-card img");

  if (img.src === data.sprites.front_default) {
    img.src = data.sprites.front_shiny;
  } else {
    img.src = data.sprites.front_default;
  }
}

function showError(message) {
  const container = document.getElementById("pokemonContainer");
  container.innerHTML = `<div class="error-card">${message}</div>`;

  document.body.style.background = `
    linear-gradient(
      135deg,
      #8ec5fc,
      #c9d6ff,
      #e0c3fc,
      #ffffff
    )
  `;
}

document.getElementById("searchInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") searchPokemon();
  });
