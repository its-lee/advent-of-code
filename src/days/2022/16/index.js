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

  const isValuedNode = n => n.flowRate || n.name === rootName;

  const buildNodes = () => {
    const nodes = source.split('\n').map(l => {
      const [, name, flowRate, to] =
        /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/.exec(l);

      return { name, flowRate: parseInt(flowRate), to: to.split(', ') };
    });

    const importantNodes = nodes.filter(isValuedNode);

    nodes.forEach(node => {
      // Find the shortest path to all valued nodes excluding ourselves
      node.adjacent = [];
      if (!importantNodes.includes(node)) {
        return;
      }

      const bfs = breadthFirstSearch();
      nodes.forEach(n => bfs.addVertex(n.name, n.to));
      importantNodes
        .filter(n => n.name !== node.name)
        .forEach(n => {
          node.adjacent.push({ name: n.name, time: bfs.computeLength(node.name, n.name) + 1 });
        });
    });

    return nodes;
  };

  const allNodes = buildNodes();
  const nodes = allNodes
    .filter(isValuedNode)
    .reduce((acc, node) => ({ ...acc, [node.name]: node }), {});

  const extendPath = path => {
    //console.log(path);

    return path.current.adjacent
      .filter(a => !path.visited.includes(a.name))
      .map(next => {
        const timeLeft = path.timeLeft - next.time;
        const visitedAll = path.visited.length === Object.keys(nodes).length - 2;
        //console.log(path.visited.length, Object.keys(nodes).length - 2, visitedAll);

        return timeLeft < 0 || visitedAll
          ? {
              ...path,
              noTimeForMoreNodesOrVisitedAll: true
            }
          : {
              current: nodes[next.name],
              visited: [...path.visited, path.current.name],
              // todo: update score here for time passed
              timeLeft,
              noTimeForMoreNodesOrVisitedAll: false
            };
      });
  };

  const exhaustPaths = () => {
    let paths = [
      {
        current: nodes[rootName],
        visited: [],
        timeLeft: 30,
        flowRate: 0,
        totalFlow: 0,
        noTimeForMoreNodesOrVisitedAll: false
      }
    ];

    const exhaustedPaths = [];

    while (true) {
      const newPaths = paths.flatMap(p => extendPath(p));
      //console.log(newPaths.reverse());

      const noTimeForMoreNodesOrVisitedAllPaths = newPaths.filter(
        p => p.noTimeForMoreNodesOrVisitedAll
      );
      //console.log(noTimeForMoreNodesOrVisitedAllPaths.length);
      exhaustedPaths.push(...noTimeForMoreNodesOrVisitedAllPaths);

      // todo: we now need to add score for the time left on some of these.
      paths = newPaths.filter(p => !p.noTimeForMoreNodesOrVisitedAll);

      if (!paths.length) {
        console.log('returning', paths.length);
        return exhaustedPaths; // todo: exit here with results.
      }
    }
  };

  console.log(exhaustPaths());

  return [];
});
