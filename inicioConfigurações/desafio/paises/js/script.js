/* 
Estado da aplicação (state)
*/

const url = 'https://restcountries.com/v2/all';
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');
  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector(
    '#totalPopulationFavorites'
  );
  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch(url);
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    };
  });

  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  renderCountryButtons();
}

function renderCountryList() {
  let countriesHtml = '<div>';

  allCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;

    const countryHtml = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn">+</a>
      </div>
      <div>
         <img src="${flag}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name} </li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>
  
    `;
    countriesHtml += countryHtml;
  });
  countriesHtml += '</div>';

  tabCountries.innerHTML = countriesHtml;
}

function renderFavorites() {
  let favoritesHtml = '<div>';
  favoriteCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;

    const favoriteCountryHtml = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
      </div>
      <div>
         <img src="${flag}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name} </li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>
  
    `;
    favoritesHtml += favoriteCountryHtml;
  });
  favoritesHtml += '</div>';

  tabFavorites.innerHTML = favoritesHtml;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce((acc, curr) => {
    return acc + curr.population;
  }, 0);
  const totalFavorites = favoriteCountries.reduce((acc, curr) => {
    return acc + curr.population;
  }, 0);
  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}

function renderCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorite(button.id));
  });
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorite(button.id));
  });
}

function addToFavorite(id) {
  const countryToadd = allCountries.find((country) => country.id === id);
  favoriteCountries = [...favoriteCountries, countryToadd];
  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter((country) => country.id !== id);
  render();
}
function removeFromFavorite(id) {
  const countryToRemove = favoriteCountries.find(
    (country) => country.id === id
  );
  allCountries = [...allCountries, countryToRemove];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoriteCountries = favoriteCountries.filter((country) => country.id !== id);
  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
