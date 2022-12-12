import day from '../../../runner/day.js';

import { charCode } from '../../../helpers/utility.js';
import { relative } from '../../../helpers/vector.js';

export default day(({ answer, source }) => {
  let grid = source
    .split('\n')
    .map(row => row.split(''))
    .flatMap((row, y) =>
      row.map((char, x) => ({
        char,
        value: charCode(char === 'E' ? 'z' : char),
        position: [x, y]
      }))
    );

  const areAdjacent = (a, b) =>
    relative(a, b)
      .map(v => Math.abs(v))
      .reduce((acc, v) => acc + v, 0) === 1;

  grid = grid.map((cell, index) => {
    cell.index = index;
    cell.adjacent = grid
      .filter(c => areAdjacent(cell.position, c.position))
      .filter(c => c.value <= cell.value + 1); // ignore cells which are too steep

    return cell;
  });

  const locateByChar = m => grid.find(({ char }) => char === m);

  const start = locateByChar('S');
  const end = locateByChar('E');

  const vertices = [];
  const adjacent = {};

  grid.forEach(cell => {
    vertices.push(cell.index);
    adjacent[cell.index] = cell.adjacent.map(c => c.index);
  });

  const breadthFirstShortestPath = (end, start = vertices[0]) => {
    let adj = adjacent;

    const queue = [start];

    const discovered = [];
    discovered[start] = true;

    const edges = [];
    edges[start] = 0;

    const predecessors = [];
    predecessors[start] = null;

    const buildPath = (end, start, predecessors) => {
      const stack = [end];

      let u = predecessors[end];

      while (u != start) {
        stack.push(u);
        u = predecessors[u];
      }

      stack.push(start);

      return stack.reverse();
    };

    while (queue.length) {
      let v = queue.shift();

      if (v === end) {
        return buildPath(end, start, predecessors);
      }

      adj[v].forEach(adjv => {
        if (!discovered[adjv]) {
          discovered[adjv] = true;
          queue.push(adjv);
          edges[adjv] = edges[v] + 1;
          predecessors[adjv] = v;
        }
      });
    }

    return false;
  };

  answer(breadthFirstShortestPath(end.index, start.index).length - 1); // don't include the start

  // https://jarednielsen.com/data-structure-graph-shortest-path/
});
