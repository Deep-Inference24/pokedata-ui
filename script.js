async function searchPokemon() {
    const input = document.getElementById("pokemonInput").value.toLowerCase();
    const container = document.getElementById("cardContainer");

    if (!input) return;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

        if (!response.ok) {
            container.innerHTML = `<p style="color:red; font-weight:600;">Pokémon not found</p>`;
            return;
        }

        const data = await response.json();

        const statsHTML = data.stats.map(stat => `
            <div class="stat">
                <div class="stat-label">${stat.stat.name.toUpperCase()}</div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width:${stat.base_stat / 2}%"></div>
                </div>
                <div class="stat-value">${stat.base_stat}</div>
            </div>
        `).join("");

        container.innerHTML = `
            <div class="card">
                <h2>#${data.id} ${data.name.toUpperCase()}</h2>
                <img id="pokeImage" src="${data.sprites.front_default}">
                <p><strong>Type:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
                ${statsHTML}
                <button class="toggle-btn" onclick="toggleShiny('${data.sprites.front_shiny}', '${data.sprites.front_default}')">
                    ✨ Toggle Shiny
                </button>
            </div>
        `;

    } catch (error) {
        container.innerHTML = `<p style="color:red;">Error loading data</p>`;
    }
}

function toggleShiny(shiny, normal) {
    const img = document.getElementById("pokeImage");
    img.src = img.src === normal ? shiny : normal;
}
