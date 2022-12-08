import input from './input.js';

const sumOfTop = limit =>
  input
    .split('\n\n')
    .map(s => s.split('\n'))
    .map(g => g.reduce((prev, curr) => prev + parseInt(curr), 0))
    .filter(x => !isNaN(x))
    .sort((a, b) => a - b)
    .slice(-limit)
    .reduce((prev, curr) => prev + curr, 0);

export default [
  { expected: 68442, actual: sumOfTop(1) },
  { expected: 204837, actual: sumOfTop(3) }
];
