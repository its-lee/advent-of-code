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

  // search for fails (that's easier!) then invert at the end
  const isOrdered = (left, right) => {
    [left, right] = [left, right].map(v => (Array.isArray(v) ? v : [v]));

    const failingElement = left.find((l, index) => {
      const r = right[index];

      if (r === undefined) {
        return true;
      }

      // if they're both ints, we can do it
      // if at least one is an array - recurse?
      if (typeof l === 'number' && typeof r === 'number') {
        return l > r;
      } else {
        return !isOrdered(l, r);
      }
    });

    return failingElement === undefined;
  };

  const sumOfOrderedNumbers = pairs.filter(v => isOrdered(...v.pair)).map(v => v.number);
  //.reduce((acc, v) => acc + v.number, 0);

  answer(sumOfOrderedNumbers);
});
