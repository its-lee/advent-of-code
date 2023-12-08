import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
  const isNumber = c => !Number.isNaN(Number.parseInt(c));

  const reduceNumbers = numbers => Number.parseInt(numbers.at(0) + numbers.at(-1));

  const reduceString = s => reduceNumbers(s.split('').filter(c => isNumber(c)));

  const digitWords = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };

  const sumOfDigits = mapWords =>
    source
      .split('\n')
      .map(s => {
        if (mapWords) {
          Object.keys(digitWords).forEach(
            word => (s = s.replace(word, digitWords[word].toString()))
          );
        }
        return s;
      })
      .map(s => reduceString(s))
      .reduce((prev, curr) => prev + curr, 0);

  return [() => sumOfDigits(false), () => sumOfDigits(true)];
});
