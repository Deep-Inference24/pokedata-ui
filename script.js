let isShiny = false;
let currentPokemon = null;

const typeGradients = {
  electric: "linear-gradient(135deg, #fff7cc, #ffe066)",
  fire: "linear-gradient(135deg, #ffe5d0, #ff9f80)",
  water: "linear-gradient(135deg, #e0f2ff, #90cdf4)",
  grass: "linear-gradient(135deg, #e6fffa, #9ae6b4)",
  psychic: "linear-gradient(135deg, #fce7f3, #f9a8d4)",
  ice: "linear-gradient(135deg, #e0f7ff, #bae6fd)",
  dark: "linear-gradient(135deg, #e5e7eb, #9ca3af)",
  fairy: "linear-gradient(135deg, #fff1f2, #fbcfe8)",
  default: "linear-gradient(135deg, #f5f7fa, #e4ebf5)"
};

async function searchPokemon() {
  const name = document.getElementById("pokemonInput").value.toLowerCase();
  if (!name) return;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    alert("Pokémon not found");
    return;
  }

  const data = await res.json();
  currentPokemon = data;
  isShiny = false;
  renderPokemon(data);
}

function renderPokemon(data) {
  document.getElementById("card").classList.remove("hidden");

  document.getElementById("pokemonName").innerText =
    `#${data.id} ${data.name.toUpperCase()}`;

  document.getElementById("pokemonImg").src =
    data.sprites.front_default;

  const type = data.types[0].type.name;
  document.getElementById("pokemonType").innerText = `Type: ${type}`;

  document.body.style.background =
    typeGradients[type] || typeGradients.default;

  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = "";

  data.stats.forEach(stat => {
    const value = stat.base_stat;
    statsDiv.innerHTML += `
      <div class="stat">
        <span>${stat.stat.name.toUpperCase()}</span>
        <div class="bar">
          <div style="width:${Math.min(value,100)}%;
          background:linear-gradient(90deg,#111,#555)"></div>
        </div>
      </div>
    `;
  });
}

function toggleShiny() {
  if (!currentPokemon) return;

  isShiny = !isShiny;
  document.getElementById("pokemonImg").src =
    isShiny
      ? currentPokemon.sprites.front_shiny
      : currentPokemon.sprites.front_default;
}
