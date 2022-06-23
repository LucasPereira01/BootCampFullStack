var a = 7;
var b = 6;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else {
  if (a < b) {
    console.log(a + ' é menor que ' + b);
  } else {
    console.log(a + ' é iqual a ' + b);
  }
}

var dia = 2;

switch (dia) {
  case 1:
    r = 'Domingo';
    break;
  case 2:
    r = 'Segunda';
    break;
  case 3:
    r = 'Terça';
    break;
  case 4:
    r = 'Quarta';
    break;
  case 5:
    r = 'Quinta';
    break;
  case 6:
    r = 'Sexta';
    break;
  case 7:
    r = 'Sabado';
    break;

  default:
    r = 'Dia Invalido';
}

console.log(r);

var a = 7;
var b = 7;

var resposta = a > b ? 'maior' : a < b ? 'menor' : 'iqual';
console.log(resposta);

var diaSemana =
  dia === 1
    ? 'Domingo'
    : dia === 2
    ? 'Segunda'
    : dia === 3
    ? 'Terça'
    : dia === 4
    ? 'Quarta'
    : dia === 5
    ? 'Quinta'
    : dia === 6
    ? 'Sexta'
    : dia === 7
    ? 'Sabado'
    : 'Dia Invalido';
console.log(diaSemana);

// Somatorio com while

var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio = somatorio + numeroAtual;
  numeroAtual++;
}

console.log('A soma é ' + somatorio);

// Do While
var numeroAtual = 1;
var somatorio = 0;

do {
  somatorio = somatorio + numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);
console.log('A soma é ' + somatorio);
// For

var numeroAtual = 1;
var somatorio = 0;

for (numeroAtual; numeroAtual <= 10; numeroAtual++) {
  somatorio = somatorio + numeroAtual;
}
console.log('A soma é ' + somatorio);
