import solution from '../../../runner/solution.js';

import { range } from '../../../helpers/utility.js';
import breadthFirstSearch from '../../../helpers/breadthFirstSearch.js';

export default solution(({ source }) => {
  const blocks = source.split('\n').map(l => l.split(',').map(v => parseInt(v)));

  const getDimensions = blocks => [0, 1, 2].map(i => Math.max(...blocks.map(v => v[i])) + 1);

  const createGrid = () => {
    const [xLength, yLength, zLength] = getDimensions(blocks);

    const grid = range(0, xLength).map(() =>
      range(0, yLength).map(() => range(0, zLength).map(() => 0))
    );

    blocks.forEach(([x, y, z]) => (grid[x][y][z] = 1));

    return grid;
  };

  const adjacent = [
    ([x, y, z]) => [--x, y, z],
    ([x, y, z]) => [++x, y, z],
    ([x, y, z]) => [x, --y, z],
    ([x, y, z]) => [x, ++y, z],
    ([x, y, z]) => [x, y, --z],
    ([x, y, z]) => [x, y, ++z]
  ];

  const findAdjacentCoordinates = c => adjacent.map(a => a(c.position));

  const getNodeName = position => position.join(',');

  const toLinearForm = grid =>
    grid
      .flatMap((xs, x) =>
        xs.flatMap((ys, y) =>
          ys.map((value, z) => ({
            position: [x, y, z],
            value,
            name: [x, y, z].join(',')
          }))
        )
      )
      .map(c => ({ ...c, name: getNodeName(c.position) }));

  const computeSurfaceArea = grid =>
    toLinearForm(grid)
      .filter(c => c.value)
      .reduce(
        (acc, c) =>
          acc + findAdjacentCoordinates(c).filter(([x, y, z]) => !grid[x]?.[y]?.[z]).length,
        0
      );

  return [
    () => computeSurfaceArea(createGrid()),
    () => {
      // We're going to mutate this, so we'll keep our own copy of it.
      const grid = createGrid();
      const linearGrid = toLinearForm(grid);

      const bfs = breadthFirstSearch();

      linearGrid.forEach(c => {
        if (c.value) {
          return;
        }

        const adjacentNames = findAdjacentCoordinates(c)
          .filter(([x, y, z]) => grid[x]?.[y]?.[z] === 0)
          .map(p => getNodeName(p));

        bfs.addVertex(c.name, adjacentNames);
      });

      const startingNode = linearGrid
        .filter(({ position: [x, y, z] }) => x === 0 || y === 0 || z === 0)
        .find(c => !c.value);

      const exteriorAir = bfs
        .compute(startingNode.name)
        .visited.map(name => linearGrid.find(c => c.name === name));

      console.log(exteriorAir);

      return 0;

      // const findInteriorPoints = () => {
      //   return mapGrid(grid, (c, v) => {
      //     if (v === 1) {
      //       return null;
      //     }

      //     let continuedRadialMap = [...adjacent];
      //     let radius = 1;

      //     while (radius < maxRadius) {
      //       const valuesAtRadius = continuedRadialMap
      //         .map(a => a(c, radius))
      //         .map(([x, y, z]) => grid[x]?.[y]?.[z]);

      //       // Don't continue going in directions where we've found a wall
      //       continuedRadialMap = continuedRadialMap.filter((_, i) => !valuesAtRadius[i]);

      //       if (!continuedRadialMap.length) {
      //         return c;
      //       }

      //       ++radius;
      //     }

      //     return null;
      //   }).filter(Boolean);
      // };

      // findInteriorPoints().forEach(([x, y, z]) => (grid[x][y][z] = 1));

      // return computeSurfaceArea(grid);
    }
  ];
});
