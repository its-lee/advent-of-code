import { range } from '../../../helpers/utility.js';
import day from '../../../runner/day.js';

export default day(({ answer, source }) => {
  const commands = source.split('\n');

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
      const isntInteresting = (cycle - 20) % 40;
      return acc + (isntInteresting ? 0 : cycle * value);
    }, 0);
  };

  answer(computeInterestingScore());
});