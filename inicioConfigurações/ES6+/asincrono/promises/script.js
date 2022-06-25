window.addEventListener('load', () => {
  const url = 'https://api.github.com/users/rrgomide';

  fetch(url)
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisição');
    });
  divisionPromisse(12, 2)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log('Falha na divisao' + error);
    });
});

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
