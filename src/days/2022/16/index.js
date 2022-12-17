import solution from '../../../runner/solution.js';

import breadthFirstSearch from '../../../helpers/breadthFirstSearch.js';

export default solution(({ source }) => {
  // Looking at the data, *most* nodes have a value of 0. The optimal solution would visit as many
  // valued nodes (a value > 0) as possible, using the shortest paths when travelling.
  //
  // So, what we'll do is:
  //   i) 'Eliminate' non-valued nodes by computing the minimum distance between the valued nodes
  //      (we're not really eliminating them - more that we're extracting all necessary information
  //      from them so we don't need to look at them again).
  //   ii) Go through the possible paths of valued nodes (which is a far smaller tree than the
  //       total nodes), and maximise the total value over those paths.
  //         We also need to factor in the possibility of going to each node and wasting 1 minute
  //       turning it on or not.

  const buildNodes = () => {
    const nodes = source.split('\n').map(l => {
      const [, name, value, to] =
        /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/.exec(l);

      return { name, value: parseInt(value), adjacent: to.split(', ') };
    });

    const valuedNodes = nodes.filter(n => n.value);

    nodes.forEach(node => {
      // Find the shortest path to all valued nodes excluding ourselves
      node.valuedAdjacent = {};
      if (!node.value) {
        return;
      }

      const bfs = breadthFirstSearch();
      nodes.forEach(n => bfs.addVertex(n.name, n.adjacent));
      valuedNodes
        .filter(n => n.name !== node.name)
        .forEach(n => (node.valuedAdjacent[n.name] = bfs.computeLength(node.name, n.name)));
    });

    return nodes;
  };

  const factorial = v => (v <= 1 ? 1 : v * factorial(v - 1));

  const computePermutations = values => {
    const base = values;
    const permutationCount = factorial(base);

    for (let i = 0; i < permutationCount; ++i) {
      if (i % 1000 === 0) {
        console.log(((100 * i) / permutationCount).toFixed(8));
      }

      const indices = i
        .toString(base)
        .split('')
        .map(i => parseInt(i, base));

      //console.log(indices);
    }

    return;
  };

  const root = 'AA';
  const nodes = buildNodes();
  const valuedNodes = nodes.filter(n => n.value);
  const valuedNodeNames = valuedNodes.map(n => n.name);

  console.log(valuedNodes);
  //computePermutations(valuedNodeNames.length);

  let current = root;

  const adjacent = valuedNodes.reduce(
    (acc, node) => ({ ...acc, [node.name]: node.valuedAdjacent }),
    {}
  );

  // visit each path breadth-first (for no reason over depth-first other than we've done that recently),
  // terminating paths when they run out of time

  const queue = [root];
  const visited = { [root]: true };

  while (queue.length) {
    const v = queue.shift();

    // we need something like this to terminate!
    // if (v === end) {
    //   return this.buildPath(end, start);
    // }

    const nonVisitedAdjacent = adjacent[v].filter(adjv => !visited[adjv]);

    // todo: if nonVisitedAdjacent is empty than we need to finish this path

    nonVisitedAdjacent.forEach(adjv => {
      visited[adjv] = true;
      queue.push(adjv);
    });
  }

  return [];
});
