import day from '../../../runner/day.js';

import { charCode, parseGrid } from '../../../helpers/utility.js';
import { relative } from '../../../helpers/vector.js';

export default day(({ answer, source }) => {
  const areAdjacent = (a, b) =>
    relative(a, b)
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
      // Note that there may be multiple shortest-paths, this algoritm just returns the first detected.
      // Originally aided by the docs on https://jarednielsen.com/data-structure-graph-shortest-path/
      //
      // A breadth-first search (a tree-like algorithm) finds the shortest path by virtue of:
      //   1. Finding all paths
      //   2. The order in which we search means we find a path of shortest length first (amongst
      //      paths that we find to terminate)
      //
      // We essentially look at all length 1 paths from the start, then length 2 etc etc and check
      // each time if they reach the end. Because we're looking in path length order, we'll have the
      // shortest path if we find one.
      compute(start, end) {
        const queue = [start];
        const visited = { [start]: true };
        const predecessors = { [start]: null };

        while (queue.length) {
          const v = queue.shift();

          if (v === end) {
            return this.buildPath(end, start, predecessors);
          }

          this.adjacent[v]
            .filter(adjv => !visited[adjv])
            .forEach(adjv => {
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

  const grid = extractGrid();
  grid.forEach(cell => {
    search.addVertex(
      cell.index,
      cell.adjacent.map(c => c.index)
    );
  });

  const locateByChar = m => grid.find(({ char }) => char === m);
  const end = locateByChar('E');

  const shortestPathLength = start => {
    const path = search.compute(start.index, end.index);
    // don't include the start in the length computation
    return path?.length !== undefined ? path.length - 1 : undefined;
  };

  answer(shortestPathLength(locateByChar('S')));

  const shortestPathFromLowestPoints = () => {
    return Math.min(
      ...grid
        .filter(c => c.value === 1)
        .map(start => shortestPathLength(start))
        .filter(l => l !== undefined)
    );
  };

  answer(shortestPathFromLowestPoints());
});
