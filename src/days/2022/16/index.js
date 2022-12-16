import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
  const parsed = source.split('\n').map(l => {
    console.log(l);
    const [, valve, flow, to] =
      /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/.exec(l);

    return { valve, flow: parseInt(flow), to: to.split(', ') };
  });

  console.log(parsed);

  return [];
});
