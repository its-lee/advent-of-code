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

  const radialMap = [
    ([x, y, z], d) => [x - d, y, z],
    ([x, y, z], d) => [x + d, y, z],
    ([x, y, z], d) => [x, y - d, z],
    ([x, y, z], d) => [x, y + d, z],
    ([x, y, z], d) => [x, y, z - d],
    ([x, y, z], d) => [x, y, z + d]
  ];

  const computeSurfaceArea = (coords, grid) =>
    coords.reduce(
      (acc, c) =>
        acc + radialMap.map(a => a(c, 1)).filter(([x, y, z]) => !grid[x]?.[y]?.[z]).length,
      0
    );

  const mapGrid = cb =>
    grid.flatMap((xs, x) => xs.flatMap((ys, y) => ys.map((v, z) => cb([x, y, z], v))));

  const findInteriorPoints = () => {
    return mapGrid((c, v) => {
      if (v === 1) {
        return null;
      }

      // if one direction ever returns undefined - we're done - it's exterior
      // if one direction ever returns 0 - we need to continue looking in that direction as it doesn't mean anything
      // if one direction ever returns 1 - we can stop looking in that direction
      //   if all directions return 1 eventually, we can stop as it's interior

      // we can just look for isInterior - but we need some kind of termination condition
      // todo: replace this number, we need to compute it!
      let continuedRadialMap = [...radialMap];

      let radius = 1;
      while (radius < 100) {
        const valuesAtRadius = continuedRadialMap
          .map(a => a(c, radius))
          .map(([x, y, z]) => grid[x]?.[y]?.[z]);

        // Don't continue going in directions where we've found a wall
        continuedRadialMap = continuedRadialMap.filter((_, i) => valuesAtRadius[i] !== 1);

        if (!continuedRadialMap.length) {
          return c;
        }

        ++radius;
      }

      return null;
    }).filter(Boolean);
  };

  return [
    () => computeSurfaceArea(coords, grid),
    () => {
      console.log(findInteriorPoints());
    }
  ];
});
