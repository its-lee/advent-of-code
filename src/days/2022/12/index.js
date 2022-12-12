import day from '../../../runner/day.js';

import { charCode } from '../../../helpers/utility.js';
import { relative, areEqualVectors } from '../../../helpers/vector.js';

export default day(({ answer, source }) => {
  // TODO: dedupe this linearization from #8, move value map to end
  const grid = source
    .split('\n')
    .map(row => row.split('').map(v => charCode(v)))
    .flatMap((row, y) => row.map((value, x) => ({ value, position: [x, y] })));

  const start = grid.find(({ value }) => value === charCode('S'));

  const areAdjacent = (a, b) =>
    relative(a, b)
      .map(v => Math.abs(v))
      .reduce((acc, v) => acc + v, 0) === 1;

  const findNextSteps = path => {
    const current = path[path.length - 1];
    return grid
      .filter(c => areAdjacent(current.position, c.position))
      .filter(c => c.value <= current.value + 1) // ignore cells which are too step
      .filter(c => !path.some(p => areEqualVectors(p.position, c.position))); // don't go where we've already gone to avoid infinite cycles
  };

  console.log(findNextSteps([start]));
});
