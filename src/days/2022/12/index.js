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

  const breadthFirstSearch = () => {
    return {
      adjacent: {},
      addVertex(vertex, adjacentVertices) {
        this.adjacent[vertex] = adjacentVertices;
      },
      buildPath(end, start, predecessors) {
        const stack = [end];

        let u = predecessors[end];
        while (u != start) {
          stack.push(u);
          u = predecessors[u];
        }

        stack.push(start);
        return stack.reverse();
      },
      compute(start, end) {
        const queue = [start];
        const visited = { [start]: true };
        const predecessors = { [start]: null };

        while (queue.length) {
          const v = queue.shift();

          if (v === end) {
            return this.buildPath(end, start, predecessors);
          }

          this.adjacent[v].forEach(adjv => {
            if (visited[adjv]) {
              return;
            }

            visited[adjv] = true;
            queue.push(adjv);
            predecessors[adjv] = v;
          });
        }

        return undefined;
      }
    };
  };

  const search = breadthFirstSearch();

  grid.forEach(cell => {
    search.addVertex(
      cell.index,
      cell.adjacent.map(c => c.index)
    );
  });
  const path = search.compute(start.index, end.index);
  answer(path.length - 1); // don't include the start

  // https://jarednielsen.com/data-structure-graph-shortest-path/
});
