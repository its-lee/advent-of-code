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

  const maxOrdinates = vectors => [0, 1].map(index => Math.max(...vectors.map(v => v[index])));
  const [width, height] = maxOrdinates(rocks);

  const grid = range(0, width).map(() => range(0, height).map(() => CONTENT.AIR));

  console.log(rocks, width, height);
});
