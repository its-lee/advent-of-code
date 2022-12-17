import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
  const parsed = source.split('\n').map(l => {
    console.log(l);
    const [, valve, flow, to] =
      /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/.exec(l);

    return { valve, flow: parseInt(flow), to: to.split(', ') };
  });

  const root = 'AA';

  console.log(parsed);

  // Looking at the data, *most* nodes have a value of 0. The optimal solution would visit as many
  // valued nodes (a value > 0) as possible, using the shortest paths when travelling.
  //
  // So, what we'll do is:
  //   i) 'Eliminate' non-valued nodes by computing the minimum distance between the valued nodes.
  //   ii) Determine every permutation of valued nodes (which is a far smaller set than the total nodes),
  //       and maximise the total value over those permutations.

  return [];
});
