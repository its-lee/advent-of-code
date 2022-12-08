import input from './input.js';
import submission from '../../submission.js';

const sumOfTop = limit =>
  input
    .split('\n\n')
    .map(s => s.split('\n'))
    .map(g => g.reduce((prev, curr) => prev + parseInt(curr), 0))
    .filter(x => !isNaN(x))
    .sort((a, b) => a - b)
    .slice(-limit)
    .reduce((prev, curr) => prev + curr, 0);

export default submission().add(sumOfTop(1), 68442).add(sumOfTop(3), 2048371);
