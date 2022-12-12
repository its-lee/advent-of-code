import day from '../../../runner/day.js';

import { charCode } from '../../../helpers/utility.js';

export default day(({ answer, source }) => {
  // TODO: dedupe from #8, move value map to end
  const grid = source
    .split('\n')
    .map(row => row.split('').map(v => charCode(v)))
    .flatMap((row, y) => row.map((value, x) => ({ value, x, y })));

  //const grid = transposeMatrix(source.split('\n').map(l => l.split('')));

  // grid[x][y]

  const start = grid.find(({ value }) => value === charCode('S'));

  console.log(grid);
  console.log(start);
});
