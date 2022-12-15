import day from '../../../runner/day.js';
import { range } from '../../../helpers/utility.js';
import { relative, addVectors } from '../../../helpers/vector.js';

export default day(source => {
  const CONTENT = {
    AIR: '.',
    ROCK: '#',
    SAND: 'o'
  };

  const rocks = source
    .split('\n')
    .flatMap(line => {
      const parts = line.split(' -> ');
      return parts.slice(0, -1).map((p, i) => [p, parts[i + 1]]);
    })
    .map(pair => pair.map(coord => coord.split(',').map(v => parseInt(v))))
    .flatMap(([a, b]) => {
      const r = relative(a, b);
      const changingIndex = r.findIndex(Boolean);
      const changedValue = r[changingIndex];

      return range(0, Math.abs(changedValue) + 1).map(v => {
        const p = [0, 0];
        p[changingIndex] = Math.sign(changedValue) * v;
        return addVectors(a, p);
      });
    });

  const computeGridDimensions = vectors =>
    [0, 1].map(index => Math.max(...vectors.map(v => v[index])) + 1);
  const [width, height] = computeGridDimensions(rocks);

  // initialise the grid as all air..
  const grid = range(0, width).map(() => range(0, height).map(() => CONTENT.AIR));
  // then add the rocks..
  rocks.forEach(([x, y]) => (grid[x][y] = CONTENT.ROCK));

  const print = () => {
    for (let y = 0; y < grid[0].length; ++y) {
      console.log(grid.map(v => v[y]).join(''));
    }
  };

  print();
});
