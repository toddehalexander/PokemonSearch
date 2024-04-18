// Array to store Pokémon names fetched from PokeAPI
let pokemonNames = [];

// Fetch Pokémon names from PokeAPI and initialize autocomplete
fetch('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0')
  .then(response => response.json())
  .then(data => {
    pokemonNames = data.results.map(pokemon => pokemon.name);
    autocomplete(document.getElementById("pokemon-input"), pokemonNames);
  });

// Autocomplete function to handle input and display dropdown
function autocomplete(inp, arr) {
  let currentFocus;

  inp.addEventListener("input", function(e) {
    let a, b, i, val = this.value;
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = `
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png" style="width:30px;height:30px;">
          <strong>${arr[i].substr(0, val.length)}</strong>
          ${arr[i].substr(val.length)}
          <input type='hidden' value='${arr[i]}'>
        `;
        b.addEventListener("click", function(e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          fetchPokemonDetails(inp.value.toLowerCase());
          inp.value = ''; // Clear the input field
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function(e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

function displayPokemonSprites(data) {
  const spriteContainer = document.getElementById('pokemon-sprites');
  spriteContainer.innerHTML = `
    <h3>Pokémon Sprites</h3>
    <div class="sprite-row">
      <div class="sprite-item">
        <img src="${data.sprites.front_default}" alt="${data.name} front default">
        <p>Front Default</p>
      </div>
      <div class="sprite-item">
        <img src="${data.sprites.back_default}" alt="${data.name} back default">
        <p>Back Default</p>
      </div>
      <div class="sprite-item">
        <img src="${data.sprites.front_shiny}" alt="${data.name} front shiny">
        <p>Front Shiny</p>
      </div>
      <div class="sprite-item">
        <img src="${data.sprites.back_shiny}" alt="${data.name} back shiny">
        <p>Back Shiny</p>
      </div>
    </div>
  `;
}

function fetchPokemonDetails(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      const pokemonDetails = document.getElementById("pokemon-details");
      const types = data.types.map(type => type.type.name).join(', ');

      // Fetch move details for each move the Pokémon can learn
      const movePromises = data.moves.map(move => fetch(move.move.url).then(response => response.json()));

      Promise.all(movePromises)
        .then(moveDetails => {
          const moveList = moveDetails.map(move => `${move.name} (Power: ${move.power || 'N/A'})`).join('</li><li>');

          pokemonDetails.innerHTML = `
            <h2>${data.name}</h2>
            <p>Type: ${types}</p>
            <div id="pokemon-sprites"></div>
            <h3>Moves:</h3>
            <ul>
              <li>${moveList}</li>
            </ul>
            <h3>Base Stats:</h3>
            <ul>
              ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
            </ul>
          `;
          displayPokemonSprites(data);
        })
        .catch(error => {
          console.error('Error fetching move details:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching Pokémon data:', error);
      alert('Error fetching Pokémon data. Please try again.');
    });
}