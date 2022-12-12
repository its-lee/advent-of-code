import day from '../../../runner/day.js';

import { transposeMatrix } from '../../../helpers/utility.js';

export default day(({ answer, source }) => {
  const grid = transposeMatrix(source.split('\n').map(l => l.split('')));

  // grid[x][y]

  console.log(grid);
});
