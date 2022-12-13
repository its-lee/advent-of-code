import day from '../../../runner/day.js';

export default day(({ answer, source }) => {
  const pairs = source
    .split('\n\n')
    .map(pair => pair.split('\n').map(eval))
    .map((pair, index) => ({ pair, number: index + 1 }));

  console.log(pairs);

  /*
If both values are integers, the lower integer should come first.
If the left integer is lower than the right integer, the inputs are in the right order.
If the left integer is higher than the right integer, the inputs are not in the right order.
Otherwise, the inputs are the same integer; continue checking the next part of the input.

If both values are lists, compare the first value of each list, then the second value, and so on.
If the left list runs out of items first, the inputs are in the right order.
If the right list runs out of items first, the inputs are not in the right order.
If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.

*/

  const simpleCompare = (l, r) => (l < r ? 1 : l > r ? -1 : 0);

  const compare = (left, right) => {
    [left, right] = [left, right].map(v => (Array.isArray(v) ? v : [v]));

    console.log('arrays', left, 'vs', right);

    for (let i = 0; i < Math.max(left.length, right.length); ++i) {
      const l = left[i];
      const r = right[i];

      console.log(l, 'vs', r);

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

    return 1;
  };

  const sumOfOrderedNumbers = pairs.filter(v => compare(...v.pair) === 1).map(v => v.number);
  //.reduce((acc, v) => acc + v.number, 0);

  // 6061 is too high

  answer(sumOfOrderedNumbers);
});
