const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");
const nameOutput = document.getElementById("pokemon-name");
const idOutput = document.getElementById("pokemon-id");
const weightOutput = document.getElementById("weight");
const heightOutput = document.getElementById("height");
const typesOutput = document.getElementById("types");
const imgElement = document.getElementById("poke-img");
const hpOutput = document.getElementById("hp");
const attackOutput = document.getElementById("attack");
const defenseOutput = document.getElementById("defense");
const specialAttackOutput = document.getElementById("special-attack");
const specialDefenseOutput = document.getElementById("special-defense");
const speedOutput = document.getElementById("speed");

searchForm.addEventListener("submit", async (e) => {
    console.log(e);
  e.preventDefault();

  const text = searchInput?.value;

  const pokemon = await fetchPokemon(text?.toLowerCase());

  if(!pokemon){
    alert("Pokémon not found");
    return;
  }

  console.log(pokemon);

  populatePokemonData(pokemon);
});

const fetchPokemon = async (searchText) => {
  try {
    const baseUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
    const response = await fetch(baseUrl + searchText);

    if (!response.ok) {
      console.log(response);
      return;
    }

    const json = await response.json();

    return json;
  } catch (err) {
    alert(err.message);
  }
};

const populatePokemonData = (pokemon) => {
  nameOutput.textContent = pokemon.name.toUpperCase();
  idOutput.textContent = "Id: " + pokemon.id;
  weightOutput.textContent = "Weight: " + pokemon.weight;
  heightOutput.textContent = "Height: " + pokemon.height;
  typesOutput.textContent =
    "Types: " + pokemon.types.map((x) => x.type.name).join(", ");
  imgElement.src = pokemon.sprites.front_default;
  hpOutput.textContent = pokemon.stats.find(
    (x) => x.stat.name === "hp"
  ).base_stat;
  attackOutput.textContent = pokemon.stats.find(
    (x) => x.stat.name === "attack"
  ).base_stat;
  defenseOutput.textContent = pokemon.stats.find(
    (x) => x.stat.name === "defense"
  ).base_stat;
  specialAttackOutput.textContent = pokemon.stats.find(
    (x) => x.stat.name === "special-attack"
  ).base_stat;
  specialDefenseOutput.textContent = pokemon.stats.find(
    (x) => x.stat.name === "special-defense"
  ).base_stat;
  speedOutput.textContent = pokemon.stats.find(
    (x) => x.stat.name === "speed"
  ).base_stat;
};
