import day from '../../../runner/day.js';

export default day(source => {
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

  return [
    () => {
      return pairs.filter(v => compare(...v.pair) === 1).reduce((acc, v) => acc + v.index + 1, 0);
    },
    () => {
      const addedPackets = [[[2]], [[6]]];
      const allPackets = [...pairs.flatMap(p => p.pair), ...addedPackets];
      const sortedPackets = allPackets.sort((a, b) => -compare(a, b));

      return addedPackets
        .map(ap =>
          sortedPackets.findIndex(p => {
            return p.length == ap.length && p[0].length === ap.length && p[0][0] === ap[0][0];
          })
        )
        .reduce((acc, v) => acc * (v + 1), 1);
    }
  ];
});
