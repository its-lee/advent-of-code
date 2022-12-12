import day from '../../../runner/day.js';

import { charCode } from '../../../helpers/utility.js';
import { relative } from '../../../helpers/vector.js';

export default day(({ answer, source }) => {
  let grid = source
    .split('\n')
    .map(row => row.split(''))
    .flatMap((row, y) =>
      row.map((s, x) => ({
        mark: s,
        value: charCode(s === 'E' ? 'z' : s),
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

  const locateByMark = m => grid.find(({ mark }) => mark === m);

  const start = locateByMark('S');
  const end = locateByMark('E');

  const vertices = [];
  const adjacent = {};

  grid.forEach(cell => {
    vertices.push(cell.index);
    adjacent[cell.index] = cell.adjacent.map(c => c.index);
  });

  const bfs = (goal, root = vertices[0]) => {
    let adj = adjacent;

    const queue = [root];

    const discovered = [];
    discovered[root] = true;

    const edges = [];
    edges[root] = 0;

    const predecessors = [];
    predecessors[root] = null;

    const buildPath = (goal, root, predecessors) => {
      const stack = [goal];

      let u = predecessors[goal];

      while (u != root) {
        stack.push(u);
        u = predecessors[u];
      }

      stack.push(root);

      return stack.reverse();
    };

    while (queue.length) {
      let v = queue.shift();

      if (v === goal) {
        return buildPath(goal, root, predecessors);
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

  answer(bfs(end.index, start.index).length - 1); // don't include the start

  // https://jarednielsen.com/data-structure-graph-shortest-path/
});
