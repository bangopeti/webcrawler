type TestNum = {
  count: number;
};

const isBiggerThanFive = (testNum: TestNum): boolean => testNum.count > 5;

const test: TestNum = {
  count: 8,
};

console.log(isBiggerThanFive(test));
console.log(isBiggerThanFive(test));
console.log(isBiggerThanFive(test));
console.log(isBiggerThanFive(test));
