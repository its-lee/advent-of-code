import day from '../../../runner/day.js';

export default day(({ answer, source }) => {
  const pairs = source
    .split('\n\n')
    .map(pair => pair.split('\n').map(eval))
    .map((pair, index) => ({ pair, index }));

  const simpleCompare = (l, r) => (l < r ? 1 : l > r ? -1 : 0);

  const compare = (left, right) => {
    [left, right] = [left, right].map(v => (Array.isArray(v) ? v : [v]));

    for (let i = 0; i < Math.max(left.length, right.length); ++i) {
      const l = left[i];
      const r = right[i];

      const lengthCompare = simpleCompare(l === undefined ? 0 : 1, r === undefined ? 0 : 1);
      if (lengthCompare) {
        return lengthCompare;
      }

      const comparer = typeof l === 'number' && typeof r === 'number' ? simpleCompare : compare;
      const comparison = comparer(l, r);
      if (comparison) {
        return comparison;
      }
    }

    return 0;
  };

  const computeSumOfOrderedIndices = () => {
    return pairs.filter(v => compare(...v.pair) === 1).reduce((acc, v) => acc + v.index + 1, 0);
  };

  answer(computeSumOfOrderedIndices());
});
