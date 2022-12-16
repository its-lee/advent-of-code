import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
  const sumOfTop = limit =>
    source
      .split('\n\n')
      .map(s => s.split('\n'))
      .map(g => g.reduce((prev, curr) => prev + parseInt(curr), 0))
      .filter(x => !isNaN(x))
      .sort((a, b) => a - b)
      .slice(-limit)
      .reduce((prev, curr) => prev + curr, 0);

  return [() => sumOfTop(1), () => sumOfTop(3)];
});
