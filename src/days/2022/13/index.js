import day from '../../../runner/day.js';

export default day(({ answer, source }) => {
  const pairs = source
    .split('\n\n')
    .map(pair => pair.split('\n').map(eval))
    .map((pair, index) => ({ pair, number: index + 1 }));

  const simpleCompare = (l, r) => (l < r ? 1 : l > r ? -1 : 0);

  const compare = (left, right) => {
    [left, right] = [left, right].map(v => (Array.isArray(v) ? v : [v]));

    for (let i = 0; i < Math.max(left.length, right.length); ++i) {
      const l = left[i];
      const r = right[i];

      if (l === undefined) {
        return 1;
      } else if (r === undefined) {
        return -1;
      }

      if (typeof l === 'number' && typeof r === 'number') {
        const numberComparison = simpleCompare(l, r);
        if (numberComparison) {
          return numberComparison;
        }
      } else {
        const comparison = compare(l, r);
        if (comparison) {
          return comparison;
        }
      }
    }

    return 0;
  };

  const sumOfOrderedNumbers = pairs
    .filter(v => compare(...v.pair) === 1)
    .reduce((acc, v) => acc + v.number, 0);

  answer(sumOfOrderedNumbers);
});
