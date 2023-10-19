const titleElement = "Pokedex Tracker (v7.3.0)";

/* Generate Random Id */
const GenerateRandomId = () => {
	return Math.random().toString(36).substr(2, 9);
}

/* Save to localStorage */
const savePokedex = (obj) => {
	localStorage.setItem(titleElement, JSON.stringify(obj));
}

/* Get from localStorage */
const getAllPokedexes = () => {
	const pokedexJSON = localStorage.getItem(titleElement);

	try {
		return pokedexJSON !== null ? JSON.parse(pokedexJSON) : [];
	} catch(e) {
		return [];
	}
}

/* Find pokedex */
const findPokedex = (obj, id) => {
	return obj.find((e) => e.id === id);
}

/* toggle pokemon status */
const toggleStatus = function(pokemon, id) {
	const pokedexID = pokedex.pokemon.find((element) => element.title === pokemon.closest(".box").querySelector(".box-title").textContent).box.find((element) => element.id === id);

	if (pokedexID) {
		if (pokedexID.status[Status.loadStatus] !== undefined) {
			pokedexID.status[Status.loadStatus] = !pokedexID.status[Status.loadStatus];
		}
	}
}

/* toggle box status */
const toggleBox = function(obj) {
	const pokedexID = pokedex.pokemon.find((element) => element.title === obj.closest(".box").querySelector(".box-title").textContent).box;

	if (pokedexID) {
		pokedexID.forEach((element) => {
			if (element.status[Status.loadStatus] !== undefined) {
				element.status[Status.loadStatus] = !element.status[Status.loadStatus];
			}
		});
	}
}

const generateMarks = (items) => {
	const item = document.createElement("div");
	item.classList.add("item");

	const img = document.createElement("img");
	img.src = `./Marks/${items}.png`;
	img.addEventListener("click", () => {
		if (Status.selectMode === "Single") {
			addMark(items);
		}
		if (Status.selectMode === "Box") {
			addMarks(items);
		}
		savePokedex(allPokedexes);
		displayMarks(pokedex.gameSet);
	});

	if (clicked2.marks[Status.loadStatus].includes(items)) {
		img.classList.add("active");
	}

	const label = document.createElement("span");
	label.classList.add("label");
	label.textContent = items.replace(" Mark", "");

	item.appendChild(img);
	item.appendChild(label);

	return item;
}

const displayMarks = (arr) => {
	Marks.innerHTML = "";

	if (myMarks[arr] !== undefined) {
		myMarks[arr].forEach((e) => {
			Marks.appendChild(generateMarks(e));
		});
	}
}

const addMark = (name) => {
	const placeholder1 = pokedex.pokemon.find((e) => e.title === clicked1.title);
	const placeholder2 = placeholder1.box.find((e) => e.id === clicked2.id);

	if (placeholder2.marks[Status.loadStatus].includes(name)) {
		const markIndex = placeholder2.marks[Status.loadStatus].findIndex((e) => e.includes(name));
		placeholder2.marks[Status.loadStatus].splice(markIndex, 1);
	} else {
		placeholder2.marks[Status.loadStatus].push(name);
	}
}

const addMarks = (name) => {
	const placeholder1 = pokedex.pokemon.find((e) => e.title === clicked1.title).box;

	if (placeholder1) {
		placeholder1.forEach((elem) => {
			if (elem.marks[Status.loadStatus].includes(name)) {
				const markIndex = elem.marks[Status.loadStatus].findIndex((e) => e.includes(name));
				elem.marks[Status.loadStatus].splice(markIndex, 1);
			} else {
				elem.marks[Status.loadStatus].push(name);
			}
		});
	}
}

const openMarks = (width) => {
	myNav.style.width = `${width}%`;
}

const setClicked = function(element, elem) {
	const placeholder1 = pokedex.pokemon.find((e) => e.title === element.closest(".box").querySelector(".box-title").textContent);
	const placeholder2 = placeholder1.box.find((e) => e.id === elem);

	clicked1 = placeholder1;
	clicked2 = placeholder2;
}

const toggleMarks = () => {
	if (Status.Marks === "Off") {
		Status.Marks = "On";
	} else {
		Status.Marks = "Off";
	}
	renderPokedex(pokedex);
}

/* Generate Pokemon DOM structure */
const generatePokemonDOM = (element) => {
	const div = document.createElement("div");
	div.classList.add("pkm-wrapper");

	const label = document.createElement("span");
	label.classList.add("label");
	label.textContent = element.name;

	if (label.innerHTML.includes("(F)")) {
		label.innerHTML = element.name.replace("(F)", "(&female;)");
	}

	if (label.innerHTML.includes("(M)")) {
		label.innerHTML = element.name.replace("(M)", "(&male;)");
	}

	if (Status.selectMode === "Single") {
		div.classList.add("Single");
	}

	if (element.status[Status.loadStatus] === false) {
		div.classList.add("uncaught");
	}


	if (element.locked[Status.loadStatus] === true) {
		div.classList.add("uncaught", "shiny-locked");
	}

	const img = document.createElement("img");
	img.src = `./pokemon/${Status.loadStatus}/${element.name}.png`;
	img.addEventListener("click", function() {
		if (Status.Marks === "Off") {
			if (Status.selectMode === "Single") {
				toggleStatus(this, element.id);
			}
			if (Status.selectMode === "Box") {
				toggleBox(this);
			}
		}
		if (Status.Marks === "On") {
			setClicked(this, element.id);
			if (element.locked[Status.loadStatus] === false) {
				openMarks(100);
				displayMarks(pokedex.gameSet);
			}
		}
		renderPokedex(pokedex);
		renderNumber();
	});

	div.appendChild(img);
	div.appendChild(label);

	if (Status.Marks === "Off") {
		if (element.status[Status.loadStatus] === true) {
			const icons = {
				1: document.createElement("i"),
				2: document.createElement("i")
			};

			icons[1].classList.add("icon-caught");
			icons[2].classList.add("icon-uncaught");

			div.appendChild(icons[1]);
			div.appendChild(icons[2]);
		}

		if (element.status[Status.loadStatus] === false) {
			const icon = document.createElement("i");
			icon.classList.add("icon-pokeball");

			div.appendChild(icon);
		}
	}
	if (Status.Marks === "On") {
		if (element.locked[Status.loadStatus] === false) {
			const num = document.createElement("div");
			num.classList.add("number");
			num.innerHTML = element.marks[Status.loadStatus].length;

			div.appendChild(num);
		}
	}
	return div;
}

/* Generate Box D.O.M. structure */
const generateBoxDOM = (obj) => {
	const box = document.createElement("div");
	box.classList.add("box");

	const boxHeader = document.createElement("div");
	boxHeader.classList.add("box-header");

	const boxTitle = document.createElement("div");
	boxTitle.classList.add("box-title");
	boxTitle.textContent = obj.title;

	const boxGrid = document.createElement("div");
	boxGrid.classList.add("box-grid");

	if (Status.selectMode === "Box") {
		boxGrid.classList.add("Box");
	}

	obj.box.forEach((e) => {
		boxGrid.appendChild(generatePokemonDOM(e));
	});

	boxHeader.appendChild(boxTitle);
	box.appendChild(boxHeader);
	box.appendChild(boxGrid);

	return box;
}

/* Render pokemon */
const renderPokemon = (obj) => {
	const pokedexSection = document.getElementById("Pokedex-section");
	pokedexSection.innerHTML = "";

	if (obj.length > 0) {
		obj.forEach((e) => {
			pokedexSection.appendChild(generateBoxDOM(e));
		});
	}
}

/* Render pokedex */
const renderPokedex = (obj) => {
	const dexMode = document.getElementById("dex-mode");
	const pokedexName = document.getElementById("Pokedex-name");
	const gameIcon = document.getElementById("game-icon");
	const dexName = document.getElementById("dex-name");

	obj.id = window.location.hash.substr(1);
	pokedexName.textContent = obj.name;
	gameIcon.src = obj.icon;
	dexName.textContent = obj.game;
	dexMode.textContent = obj.mode;

	renderPokemon(obj.pokemon);
}

/* Calculate status */
const calculateStatus = (incomplete, complete) => {
	return `${incomplete} / ${complete}`;
}

/* Load main page */
const loadMainPage = () => {
	const pokedexesFromStorage = getAllPokedexes();

	if (pokedexesFromStorage.length > 0) {
		pokedexDIV.classList.remove("single");
		pokedexDIV.classList.add("multiple");
		pokedexesFromStorage.forEach(renderMainPokedexes);
	} else {
		const emptyMessage = document.createElement("p");
		emptyMessage.classList.add("empty-message");
		emptyMessage.textContent = "Nothing to show!!";

		pokedexDIV.classList.remove("multiple");
		pokedexDIV.classList.add("single");
		pokedexDIV.appendChild(emptyMessage);
	}
}

/* filter pokedex */
const filterPokedex = (allPokedexes, filters) => {
	return allPokedexes.filter((element) => element.name.toLowerCase().includes(filters.toLowerCase()));
}

const renderFilteredPokedexes = (filteredPokedex) => {
	pokedexDIV.textContent = "";

	filteredPokedex.forEach(renderMainPokedexes);
}

const renderMainPokedexes = (pokedex) => {
	const numberOfNormalPokemon = pokedex.pokemon.reduce((total, element) => {
		return total + element.box.filter((value) => {
			return value.forms.includes("Normal");
		}).length;
	}, 0);

	const numberOfShinyPokemon = pokedex.pokemon.reduce((total, element) => {
		return total + element.box.filter((value) => {
			return value.forms.includes("Shiny");
		}).length;
	}, 0);

	const completeNormalPokedex = pokedex.pokemon.reduce((total, element) => {
		return total + element.box.filter((value) => {
			return value.status.Normal === true;
		}).length;
	}, 0);

	const completeShinyPokedex = pokedex.pokemon.reduce((total, element) => {
		return total + element.box.filter((value) => {
			return value.status.Shiny === true;
		}).length;
	}, 0);

	const gameCard = document.createElement("div");
	gameCard.classList.add("game-card");
	gameCard.addEventListener("click", () => {
		window.location.assign(`./edit-pokedex.html#${pokedex.id}`);
	});

	const cardBody = document.createElement("div");
	cardBody.classList.add("card-body");

	const cardImg = document.createElement("div");
	cardImg.classList.add("card-img");

	const img = document.createElement("img");
	img.src = pokedex.icon;

	const cardStatsWrapper = document.createElement("div");
	cardStatsWrapper.classList.add("card-stats-wrapper");

	const cardStats = document.createElement("div");
	cardStats.classList.add("card-stats");

	const icons = {
		1: document.createElement("i"),
		2: document.createElement("i"),
		3: document.createElement("i")
	};

	icons[1].classList.add("icon-box");
	icons[2].classList.add("icon-caught");
	icons[3].classList.add("icon-shiny");

	const spans = {
		1: document.createElement("span"),
		2: document.createElement("span"),
		3: document.createElement("span")
	};

	spans[1].textContent = pokedex.pokemon.length;
	spans[2].textContent = calculateStatus(completeNormalPokedex, numberOfNormalPokemon);
	spans[3].textContent = calculateStatus(completeShinyPokedex, numberOfShinyPokemon);

	cardImg.appendChild(img);

	cardStats.appendChild(icons[1]);
	cardStats.appendChild(spans[1]);
	cardStats.appendChild(icons[2]);
	cardStats.appendChild(spans[2]);
	cardStats.appendChild(icons[3]);
	cardStats.appendChild(spans[3]);

	cardStatsWrapper.appendChild(cardStats);

	cardBody.appendChild(cardImg);
	cardBody.appendChild(cardStatsWrapper);

	gameCard.appendChild(cardBody);

	pokedexDIV.appendChild(gameCard);
}

const renderNumber = () => {
	const boxCounter = document.getElementById("box-counter");
	const pokemonCounter = document.getElementById("pokemon-counter");
	const shinyCounter = document.getElementById("shiny-counter");

	const numberOfNormalPokemon = pokedex.pokemon.reduce((total, element) => {
		return total + element.box.filter((value) => {
			return value.forms.includes("Normal");
		}).length;
	}, 0);

	const numberOfShinyPokemon = pokedex.pokemon.reduce((total, element) => {
		return total + element.box.filter((value) => {
			return value.forms.includes("Shiny");
		}).length;
	}, 0);

	const completeNormalPokedex = pokedex.pokemon.reduce((total, element) => {
		return total + element.box.filter((value) => {
			return value.status.Normal === true;
		}).length;
	}, 0);

	const completeShinyPokedex = pokedex.pokemon.reduce((total, element) => {
		return total + element.box.filter((value) => {
			return value.status.Shiny === true;
		}).length;
	}, 0);

	boxCounter.innerHTML = "";
	pokemonCounter.innerHTML = "";
	shinyCounter.innerHTML = "";

	boxCounter.innerHTML = pokedex.pokemon.length;
	pokemonCounter.innerHTML = calculateStatus(completeNormalPokedex, numberOfNormalPokemon);
	shinyCounter.innerHTML = calculateStatus(completeShinyPokedex, numberOfShinyPokemon);
}

const deletePokedex = (allPokedexes, id) => {
	const pokedexIndex = allPokedexes.findIndex((element) => element.id === id);

	allPokedexes.splice(pokedexIndex, 1);
}

const displayPresets = (obj) => {
	const changePresets = document.getElementById("change-presets");

	Object.keys(obj[pokedex.gameSet]).forEach((e, i) => {
		const btn = document.createElement("span");
		btn.classList.add("btn");
		btn.addEventListener("click", () => {
			changePreset(e);
			displayPreset(i);
		});

		const label = document.createElement("span");
		label.classList.add("label");
		label.innerHTML = e;

		btn.appendChild(label);

		changePresets.appendChild(btn);
	});
}

const displayPreset = (node) => {
	const changePresets  = document.querySelectorAll("#change-presets .btn");

	for (let i = 0; i < changePresets.length; i++) {
		changePresets[i].classList.remove("active");
	}

	changePresets[node].classList.add("active");

	renderPokedex(pokedex);
}

const generatePresets = function(el, elements, elem) {
	const title = el.title;

	const presets = document.getElementById("presets");
	presets.style.display = "block";
	presets.innerHTML = "";

	const textCenter = document.createElement("div");
	textCenter.classList.add("text-center");

	const gameTitle = document.createElement("div");
	gameTitle.classList.add("GamePresetSelector_gameTitle");
	gameTitle.innerHTML = `Pokemon ${el.title}`;

	textCenter.appendChild(gameTitle);
	presets.appendChild(textCenter);

	Object.keys(elements[elem]).forEach((e) => {
		const preset = document.createElement("div");
		preset.classList.add("GamePresetSelector_preset", "inner-container", "bg-beige");
		preset.id = elements[elem][e]["gameSet"];
		preset.title = elements[elem][e]["mode"];

		const presetName = document.createElement("div");
		presetName.classList.add("GamePresetSelector_presetName");
		presetName.innerHTML = elements[elem][e].name;

		const textMiddle = document.createElement("div");
		textMiddle.classList.add("text-middle");

		const btn = document.createElement("div");
		btn.classList.add("btn");
		btn.innerHTML = "Select this preset";
		btn.addEventListener("click", function(e) {
			const select = e.target.closest(".GamePresetSelector_preset");
			addPreset(select.id, title, select.title);
			savePokedex(allPokedexes);
			window.location.assign("./index.html");
		});

		textMiddle.appendChild(btn);

		preset.appendChild(presetName);
		preset.appendChild(textMiddle);

		presets.appendChild(preset);
	});
}

const generateList = (obj, arr) => {
	obj.pokemon = [];

	arr["boxes"].forEach((e, index) => {
		if (e.title === undefined) {
			e.title = `Box ${index + 1}`;
		}

		const placeholder = {
			title: e.title,
			box: []
		};

		e["pokemon"].forEach((elem) => {
			placeholder.box.push({
				"id": GenerateRandomId(),
				"name": elem
			});
		});

		placeholder.box.forEach((elem) => {
			if (ShinyLocked[arr.games].includes(elem.name)) {
				elem.forms = ["Normal"];
				elem.status = {
					"Normal": false
				};
				elem.locked = {
					"Normal": false,
					"Shiny": true
				};
				elem.marks = {
					"Normal": [],
					"Shiny": []
				};
			} else {
				elem.forms = ["Normal", "Shiny"];
				elem.status = {
					"Normal": false,
					"Shiny": false
				};
				elem.locked = {
					"Normal": false,
					"Shiny": false
				};
				elem.marks = {
					"Normal": [],
					"Shiny": []
				};
			}
		});

		obj.pokemon.push(placeholder);
	});
}

const changePreset = function(str) {
	pokedex["mode"] = str;

	generateList(pokedex, myPokemon[pokedex.gameSet][pokedex.mode]);
	savePokedex(allPokedexes);
	renderPokedex(pokedex);
	renderNumber();
}

const addPreset = function(gameSet, str, selection) {
	const placeholder = {
		"id": GenerateRandomId(),
		"name": "",
		"mode": selection,
		"game": `Pokemon ${str}`,
		"gameSet": gameSet,
		"icon": `./icons/Pokemon ${str}.png`,
		"pokemon": []
	};

	if (pokedexName.value.length > 0) {
		placeholder.name = pokedexName.value;
	} else {
		placeholder.name = `Pokemon ${str}`;
	}

	generateList(placeholder, myPokemon[gameSet][selection]);

	allPokedexes.push(placeholder);
}

const generateGamesDOM = (element) => {
	const div = document.createElement("div");
	div.classList.add("GamePresetSelector_gameLogo");
	div.title = element.name;
	div.id = element.gameSet;
	div.addEventListener("click", function() {
		location.assign("#presets");
		generatePresets(this, myPokemon, this.id);
	});

	const img = document.createElement("img");
	img.src = `./icons/Pokemon ${element.name}.png`;

	div.appendChild(img);

	return div;
}

const renderGames = (obj) => {
	const gameSelector = document.querySelector(".GamePresetSelector_games");

	gameSelector.innerHTML = "";

	obj.forEach((e) => {
		gameSelector.appendChild(generateGamesDOM(e));
	});
}

const closeModal = () => {
	clicked1 = null;
	clicked2 = null;
	openMarks(0);
	renderPokedex(pokedex);
}