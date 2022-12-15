import day from '../../../runner/day.js';
import { range } from '../../../helpers/utility.js';

export default day(source => {
  const CONTENT = {
    AIR: '.',
    ROCK: '#',
    SAND: 'o'
  };

  const rockVectors = source
    .split('\n')
    .flatMap(line => {
      const parts = line.split(' -> ');
      return parts.slice(0, -1).map((p, i) => [p, parts[i + 1]]);
    })
    .map(pair => pair.map(coord => coord.split(',').map(v => parseInt(v))));

  const maxOrdinate = (vectors, index) => Math.max(...vectors.flatMap(v => v).map(v => v[index]));
  const width = maxOrdinate(rockVectors, 0);
  const height = maxOrdinate(rockVectors, 1);

  const grid = range(0, width).map(() => range(0, height).map(() => CONTENT.AIR));

  rockVectors.forEach(([a, b]) => {
    const diff = [a[0] !== b[0], a[1] !== b[1]];

    if (diff.filter(Boolean).length === 2) {
      console.log('hmmm', a, b);
    }
  });

  //console.log(grid);
});
