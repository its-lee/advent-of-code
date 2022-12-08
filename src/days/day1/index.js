import day from '../../helpers/day.js';

export default day(({ answer, source }) => {
  const sumOfTop = limit =>
    source
      .split('\n\n')
      .map(s => s.split('\n'))
      .map(g => g.reduce((prev, curr) => prev + parseInt(curr), 0))
      .filter(x => !isNaN(x))
      .sort((a, b) => a - b)
      .slice(-limit)
      .reduce((prev, curr) => prev + curr, 0);

  answer(sumOfTop(1), 68442);
  answer(sumOfTop(3), 204837);
});
