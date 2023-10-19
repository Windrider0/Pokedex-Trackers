let allPokedexes = getAllPokedexes();
let filters = "";
let filteredPokedexes = filterPokedex(allPokedexes, filters);

const searchText = document.getElementById("search-text");
const pokedexDIV = document.getElementById("Pokedex-div");

loadMainPage();

searchText.addEventListener("input", () => {
	filters = searchText.value.toLowerCase();
	filteredPokedexes = filterPokedex(allPokedexes, filters);

	renderFilteredPokedexes(filteredPokedexes);
});

document.getElementById("add-pokedex").addEventListener("click", () => {
	const id = GenerateRandomId();

	window.location.assign(`./add-pokedex.html#${id}`);
});