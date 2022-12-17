import solution from '../../../runner/solution.js';

import { charCode, parseGrid } from '../../../helpers/utility.js';
import { subtractVectors } from '../../../helpers/vector.js';
import breadthFirstSearch from '../../../helpers/breadthFirstSearch.js';

export default solution(({ source }) => {
  const areAdjacent = (a, b) =>
    subtractVectors(b, a)
      .map(v => Math.abs(v))
      .reduce((acc, v) => acc + v, 0) === 1;

  const extractGrid = () => {
    let grid = parseGrid(source).map(v => ({
      ...v,
      value: charCode(v.char === 'E' ? 'z' : v.char)
    }));

    return grid.map(cell => ({
      ...cell,
      adjacent: grid
        .filter(c => areAdjacent(cell.position, c.position))
        .filter(c => c.value <= cell.value + 1) // ignore cells which are too steep
    }));
  };

  const search = breadthFirstSearch();

  const grid = extractGrid();
  grid.forEach(cell => {
    search.addVertex(
      cell.index,
      cell.adjacent.map(c => c.index)
    );
  });

  const locateByChar = m => grid.find(({ char }) => char === m);
  const end = locateByChar('E');

  const shortestPathLength = start => search.computeLength(start.index, end.index);

  return [
    () => shortestPathLength(locateByChar('S')),
    () => {
      return Math.min(
        ...grid
          .filter(c => c.value === 1)
          .map(start => shortestPathLength(start))
          .filter(l => l !== undefined)
      );
    }
  ];
});
