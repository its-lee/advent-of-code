import solution from '../../../runner/solution.js';

import breadthFirstSearch from '../../../helpers/breadthFirstSearch.js';

export default solution(({ source }) => {
  /*
    Looking at the data, *most* nodes have a value of 0. The optimal solution would visit as many
    valued nodes (a value > 0) as possible, using the shortest paths when travelling.
  
    So, what we'll do is:
      i) 'Eliminate' non-valued nodes by computing the minimum distance between the valued nodes
          (we're not really eliminating them - more that we're extracting all necessary information
          from them so we don't need to look at them again). 
        
          We add 1 to the shortest paths to accommodate for the 'activation' time required. You 
          might think we'd be missing paths where you visit one of these valued-nodes but then
          go to another valued node. But those paths would always yield equal or lower overall
          score as they're not using paths to valued nodes that are any shorter.
  
      ii) Go through the possible paths of valued nodes (which is a far smaller tree than the
          total nodes), and maximise the total value over those paths.
         
          We also need to factor in the possibility of going to each node and wasting 1 minute
          turning it on or not.

  */

  const rootName = 'AA';

  const isValuedNode = n => n.value || n.name === rootName;

  const buildNodes = () => {
    const nodes = source.split('\n').map(l => {
      const [, name, value, to] =
        /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/.exec(l);

      return { name, value: parseInt(value), to: to.split(', ') };
    });

    const importantNodes = nodes.filter(isValuedNode);

    nodes.forEach(node => {
      // Find the shortest path to all valued nodes excluding ourselves
      node.adjacent = {};
      if (!importantNodes.includes(node)) {
        return;
      }

      const bfs = breadthFirstSearch();
      nodes.forEach(n => bfs.addVertex(n.name, n.to));
      importantNodes
        .filter(n => n.name !== node.name)
        .forEach(n => (node.adjacent[n.name] = bfs.computeLength(node.name, n.name) + 1));
    });

    return nodes;
  };

  const allNodes = buildNodes();
  const nodes = allNodes
    .filter(isValuedNode)
    .reduce((acc, node) => ({ ...acc, [node.name]: node }), {});

  console.log(nodes[rootName]);

  // visit each path breadth-first (for no reason over depth-first other than we've done that recently),
  // terminating paths when they run out of time

  const paths = {};

  const queue = [rootName];
  const visited = { [rootName]: true };

  while (queue.length) {
    const v = queue.shift();

    // we need something like this to terminate!
    // if (v === end) {
    //   return this.buildPath(end, start);
    // }

    // const nonVisitedAdjacent = nodes[v].adjacent.filter(adjv => !visited[adjv]);

    // todo: if nonVisitedAdjacent is empty than we need to finish this path

    // nonVisitedAdjacent.forEach(adjv => {
    //   visited[adjv] = true;    // i don't think we want to ignore previously visited nodes are, as not all edge weights are equal.. but we do want to avoid loops (i.e. BB -> CC -> BB)
    //   queue.push(adjv);
    //   // todo: update our paths with their current times and overall values? factor in turning on / off valves
    //   // paths[v] =
    // });
  }

  return [];
});
