let currentPokemon = null;
let shiny = false;

async function searchPokemon() {
  const name = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("status");
  const card = document.getElementById("card");

  status.textContent = "Loading...";
  card.classList.add("hidden");

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error("Not found");

    const data = await res.json();
    currentPokemon = data;
    shiny = false;

    renderPokemon();
    status.textContent = "";
    card.classList.remove("hidden");

  } catch {
    status.textContent = "Pokémon not found ❌";
  }
}

function renderPokemon() {
  document.getElementById("name").textContent =
    `#${currentPokemon.id} ${currentPokemon.name.toUpperCase()}`;

  document.getElementById("sprite").src =
    shiny ? currentPokemon.sprites.front_shiny
          : currentPokemon.sprites.front_default;

  document.getElementById("types").textContent =
    "Type: " + currentPokemon.types.map(t => t.type.name).join(", ");

  document.getElementById("stats").innerHTML =
    currentPokemon.stats.map(s =>
      `<p>${s.stat.name}: ${s.base_stat}</p>`
    ).join("");
}

function toggleShiny() {
  shiny = !shiny;
  renderPokemon();
}
