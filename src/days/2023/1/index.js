import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
  const digitWords = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
  };

  const digitNumbers = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9'
  };

  const sumOfDigits = mapWords =>
    source
      .split('\n')
      .map(s => {
        const digitStrings = { ...digitNumbers, ...(mapWords ? digitWords : undefined) };

        const digitPositions = Object.keys(digitStrings)
          .flatMap(key =>
            [...s.matchAll(new RegExp(key, 'g'))].map(m => ({
              index: m.index,
              value: digitStrings[key]
            }))
          )
          .sort((a, b) => a.index - b.index);

        return Number.parseInt(digitPositions.at(0).value + digitPositions.at(-1).value);
      })
      .reduce((prev, curr) => prev + curr, 0);

  return [() => sumOfDigits(false), () => sumOfDigits(true)];
});
