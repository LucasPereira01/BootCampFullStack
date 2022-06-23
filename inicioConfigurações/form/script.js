window.addEventListener('load', start);

function start() {
  console.log('Rodando');

  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);
}
function countName(event) {
  var count = event.target.value;
  var span = document.querySelector('#nameLength');
  span.textContent = count.length;
}
