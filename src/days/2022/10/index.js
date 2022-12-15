import day from '../../../runner/day.js';
import { range } from '../../../helpers/utility.js';

export default day(({ source }) => {
  const commands = source.split('\n');
  const SCREEN_WIDTH = 40;

  const computeRegisterValues = () => {
    let register = 1;
    return commands.flatMap(c => {
      const resolved = c === 'noop' ? ['noop'] : [c, 'noop'];
      let change = 0;
      const match = /addx (.*)/.exec(c);
      if (match) {
        [, change] = match.map(v => parseInt(v));
      }

      const history = resolved.map(() => register);
      register += change;

      return history;
    });
  };

  const computeInterestingScore = () => {
    return computeRegisterValues().reduce((acc, value, index) => {
      const cycle = index + 1;
      const isntInteresting = (cycle - SCREEN_WIDTH / 2) % SCREEN_WIDTH;
      return acc + (isntInteresting ? 0 : cycle * value);
    }, 0);
  };

  const computeDisplay = () => {
    const rows = [];
    computeRegisterValues().forEach((register, cycle) => {
      const rowIndex = Math.floor(cycle / SCREEN_WIDTH);
      const columnIndex = cycle % SCREEN_WIDTH;

      if (rowIndex >= rows.length) {
        rows.push([]);
      }

      rows[rowIndex][columnIndex] = range(register - 1, 3).includes(columnIndex) ? '#' : '.';
    });

    return rows.map(row => row.join('')).join('\n');
  };

  return [
    () => computeInterestingScore(),
    // console.log(computeDisplay());
    // The actual answer (which you need to use your human eyes to see) is: BACEKLHF
    () => computeDisplay()
  ];
});
