import solution from '../../../runner/solution.js';

import breadthFirstSearch from '../../../helpers/breadthFirstSearch.js';

export default solution(({ source }) => {
  const nodes = source.split('\n').map(l => {
    const [, name, value, to] =
      /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/.exec(l);

    return { name, value: parseInt(value), adjacent: to.split(', ') };
  });

  const root = 'AA';

  console.log(nodes);

  // Looking at the data, *most* nodes have a value of 0. The optimal solution would visit as many
  // valued nodes (a value > 0) as possible, using the shortest paths when travelling.
  //
  // So, what we'll do is:
  //   i) 'Eliminate' non-valued nodes by computing the minimum distance between the valued nodes.
  //   ii) Go through the possible paths of valued nodes (which is a far smaller tree than the
  //       total nodes), and maximise the total value over those paths.

  const valuedNodes = nodes.filter(n => n.value);

  nodes.forEach(node => {
    // Find the shortest path to all valued nodes excluding ourselves
    node.valuedAdjacent = [];
    if (!node.value) {
      return;
    }

    const valuedNodesNotSelf = valuedNodes.filter(n => n.name !== node.name);
  });

  return [];
});
