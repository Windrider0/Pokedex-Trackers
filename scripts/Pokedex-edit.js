const myNav = document.getElementById("myNav");
const Marks = myNav.querySelector(".overlay-content");
const pokedexName = document.getElementById("Pokedex-name");
const gameIcon = document.getElementById("game-icon");
const updatePokedex = document.getElementById("update-pokedex");
const changePresets = document.getElementById("change-presets");
const Selectors = document.querySelectorAll("#Selectors .btn");
const Markers = document.querySelectorAll("#Markers .btn");
let clicked1 = null;
let clicked2 = null;

const Status = {
	"Marks": "Off",
	"loadStatus": "Normal",
	"selectMode": "Single"
};

let allPokedexes = getAllPokedexes();
const pokedexID = window.location.hash.substring(1);
const pokedex = findPokedex(allPokedexes, pokedexID);

if (!pokedex) {
	location.assign("./index.html");
}

if (Status.selectMode === "Single") {
	Selectors[0].classList.add("active");
	Selectors[1].classList.remove("active");
}

if (Status.selectMode === "Box") {
	Selectors[0].classList.remove("active");
	Selectors[1].classList.add("active");
}

if (Status.loadStatus === "Normal") {
	Markers[0].classList.add("active");
	Markers[1].classList.remove("active");
}

if (Status.loadStatus === "Shiny") {
	Markers[0].classList.remove("active");
	Markers[1].classList.add("active");
}

if (myMarks[pokedex.gameSet] === undefined) {
	document.getElementById("Marks").style.display = "none";
}

displayPresets(myPokemon);

if (pokedex.mode === "National Mode") {
	changePresets.querySelectorAll(".btn")[0].classList.add("active");
} else {
	changePresets.querySelectorAll(".btn")[0].classList.remove("active");
	changePresets.querySelectorAll(".btn")[1].classList.add("active");
}

renderPokedex(pokedex);
renderNumber();

updatePokedex.addEventListener("click", () => {
	pokedex.id = window.location.hash.substr(1);
	pokedex.name = pokedexName.textContent;
	savePokedex(allPokedexes);

	setTimeout(() => {
		updatePokedex.querySelector("i").className = "icon-dots";
	}, 1000);

	setTimeout(() => {
		updatePokedex.querySelector("i").className = "icon-checkmark";
	}, 2000);

	setTimeout(() => {
		updatePokedex.querySelector("i").className = "icon-save";
	}, 3000);
});

document.getElementById("delete-pokedex").addEventListener("click", () => {
	const confirmation = confirm("Are you sure you want to delete this Pokedex?");

	if (confirmation) {
		deletePokedex(allPokedexes, pokedex.id);
		savePokedex(allPokedexes);
		location.assign("./index.html");
	}
});

Selectors[0].addEventListener("click", () => {
	Status.selectMode = "Single";
	Selectors[0].classList.add("active");
	Selectors[1].classList.remove("active");
	renderPokedex(pokedex);
});

Selectors[1].addEventListener("click", () => {
	Status.selectMode = "Box";
	Selectors[0].classList.remove("active");
	Selectors[1].classList.add("active");
	renderPokedex(pokedex);
});

Markers[0].addEventListener("click", () => {
	Status.loadStatus = "Normal";
	Markers[0].classList.add("active");
	Markers[1].classList.remove("active");
	renderPokedex(pokedex);
});

Markers[1].addEventListener("click", () => {
	Status.loadStatus = "Shiny";
	Markers[0].classList.remove("active");
	Markers[1].classList.add("active");
	renderPokedex(pokedex);
});

pokedexName.addEventListener("click", (e) => {
	e.preventDefault();

	if (e.target.hasAttribute("contenteditable")) {
		pokedex.name = e.target.textContent;
	} else {
		if (!e.target.hasAttribute("contenteditable")) {
			e.target.setAttribute("contenteditable", "");
		} else {
			e.target.removeAttribute("contenteditable");
		}
	}
});