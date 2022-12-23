import solution from '../../../runner/solution.js';

import { range } from '../../../helpers/utility.js';

export default solution(({ source }) => {
  const coords = source.split('\n').map(l => l.split(',').map(v => parseInt(v)));

  const createGrid = coords => {
    const [xLength, yLength, zLength] = [0, 1, 2].map(i => Math.max(...coords.map(v => v[i])) + 1);

    const grid = range(0, xLength).map(() =>
      range(0, yLength).map(() => range(0, zLength).map(() => 0))
    );

    coords.forEach(([x, y, z]) => (grid[x][y][z] = 1));

    return grid;
  };

  const grid = createGrid(coords);

  const adjacentMap = [
    ([x, y, z]) => [--x, y, z],
    ([x, y, z]) => [++x, y, z],
    ([x, y, z]) => [x, --y, z],
    ([x, y, z]) => [x, ++y, z],
    ([x, y, z]) => [x, y, --z],
    ([x, y, z]) => [x, y, ++z]
  ];

  const computeSurfaceArea = (coords, grid) => {
    let surfaceArea = 0;

    coords.forEach(c => {
      surfaceArea += adjacentMap.map(a => a(c)).filter(([x, y, z]) => !grid[x]?.[y]?.[z]).length;
    });

    return surfaceArea;
  };

  return [() => computeSurfaceArea(coords, grid)];
});
