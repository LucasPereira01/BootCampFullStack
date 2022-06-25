window.addEventListener('load', () => {
  doSpread();
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
  doRest();
  doDestruction();
});

function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });
  console.log(nameEmailArray);
  return nameEmailArray;
}

function doFilter() {
  const olderThan50 = people.results.filter((person) => {
    return person.dob.age > 50;
  });
  console.log(olderThan50);
}

function doForEach() {
  const mappedPeople = doMap();
  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
  console.log(mappedPeople);
}

function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);
  console.log(totalAges);

  let sumAges = 0;
  for (let i = 0; i < people.results.length; i++) {
    var current = people.results[i];
    sumAges = sumAges + current.dob.age;
  }
  console.log(sumAges);
}

function doFind() {
  const found = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });
  console.log(found);
}

function doSome() {
  // retorna verdadeiro  se tiver um ou mais
  const found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });
  console.log(found);
}

function doEvery() {
  // retorna verdadeiro se todos forem
  const every = people.results.every((person) => {
    return person.nat === 'BR';
  });
  console.log(every);
}

function doSort() {
  const mappedNames = people.results
    .map((person) => {
      return {
        name: person.name.first,
      };
    })
    .filter((person) => {
      return person.name.startsWith('A');
    })
    .sort((a, b) => {
      return a.name.length - b.name.length; // comparando - 0 +
    });
  console.log(mappedNames);
}

//spread (...) concatenar 2 objetos [Mr + Ms]

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWomen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  const marriedPeople = [...marriedMen, ...marriedWomen]; //spread
  console.log(marriedPeople);
}

function doRest() {
  function infinitSum(...numbers) {
    //rest
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }
  console.log(infinitSum(10, 100, 5, 7, 10));
}

function doDestruction() {
  const first = people.results[0];

  const { username, password } = first.login;
  console.log(username);
  console.log(password);
}
