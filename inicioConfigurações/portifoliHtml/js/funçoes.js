function superSum(from, upTo) {
  let sum = 0;
  for (let i = from; i <= upTo; i++) {
    sum = sum + i;
  }
  return sum;
}
console.log(superSum(1, 10));
console.log(superSum(50, 100));
