const url = 'https://api.github.com/users/rrgomide';

window.addEventListener('load', () => {
  doFetchAsinc();
  executeDivisionPromisse();
  divisionAsync();
});
function doFetch() {
  fetch(url)
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisição');
    });
}

async function doFetchAsinc() {
  const res = await fetch(url);
  const json = await res.json();
  showData(json);
}

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.name;
}

// Criando promisses

function divisionPromisse(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Nao é possivel dividir por 0');
    }
    resolve(a / b);
  });
}

function executeDivisionPromisse() {
  divisionPromisse(12, 2)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log('Falha na divisao' + error);
    });
}

//asyn await
async function divisionAsync() {
  const division = await divisionPromisse(30, 2);
  console.log(division);
}
