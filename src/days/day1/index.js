import day from '../../helpers/day.js';

export default day(({ part, input }) => {
  const sumOfTop = limit =>
    input
      .split('\n\n')
      .map(s => s.split('\n'))
      .map(g => g.reduce((prev, curr) => prev + parseInt(curr), 0))
      .filter(x => !isNaN(x))
      .sort((a, b) => a - b)
      .slice(-limit)
      .reduce((prev, curr) => prev + curr, 0);

  part(sumOfTop(1), 68442);
  part(sumOfTop(3), 204837);
});
