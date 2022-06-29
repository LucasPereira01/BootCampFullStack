const urlUsers =
  'https://randomuser.me/api/?results=100&seed=promise&nat=us,fr,au,br';
const urlCountrys = 'https://restcountries.com/v2/all';
let = globalUsers = [];
let = globalCountries = [];
let = globalUsersAndCountries = [];

async function start() {
  await fetchUsers();
  await fetchCountries();
  hideSpinner();
  mergeUsersAndCountries();
  render();
}

async function fetchUsers() {
  const res = await fetch(urlUsers);
  const json = await res.json();
  globalUsers = json.results.map(({ name, picture, nat }) => {
    return {
      userName: name.first,
      userPicture: picture.large,
      userCountry: nat,
    };
  });
}
async function fetchCountries() {
  const res = await fetch(urlCountrys);
  const json = await res.json();
  globalCountries = json.map(({ name, alpha2Code, flag }) => {
    return {
      countryName: name,
      countryCode: alpha2Code,
      countryFlag: flag,
    };
  });
}
function hideSpinner() {
  const spinner = document.querySelector('#spinner');
  spinner.classList.add('hide');
}
function mergeUsersAndCountries() {
  globalUsersAndCountries = [];

  globalUsers.forEach((user) => {
    const userCountry = globalCountries.find((country) => {
      return country.countryCode === user.userCountry;
    });
    globalUsersAndCountries.push({ ...user, ...userCountry });
  });
}
function render() {
  const divUsers = document.querySelector('#divUsers');

  divUsers.innerHTML = `
  <div class='row'>
  ${globalUsersAndCountries
    .map(({ userPicture, userName, countryFlag }) => {
      return `
    <div class='col s6 m4 l3'>
        <div class='flex-row bordered'>
        <img class='avatar' src='${userPicture}'/>

        <div class='flex-column'>
        <span>${userName}</span>
        <img class='flag' src='${countryFlag}'/>
        </div>
        </div>
    </div>
    `;
    })
    .join('')}
  </div>
  `;
}

start();
