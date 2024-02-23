type TestNum = {
  count: number;
};

const isBiggerThanFive = (testNum: TestNum): boolean => testNum.count > 5;

const test: TestNum = {
  count: 6,
};

console.log(isBiggerThanFive(test));
