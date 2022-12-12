import { range } from '../../../helpers/utility.js';
import day from '../../../runner/day.js';

export default day(({ answer, source }) => {
  const readLastInt = str =>
    str
      .split(' ')
      .slice(-1)
      .map(v => parseInt(v))[0];

  const computeOperand = (old, str) => (str === 'old' ? old : parseInt(str));

  const computeInitialState = () => {
    return source.split('\n\n').map(m => {
      const [, itemsStr, operationStr, divisorStr, trueStr, falseStr] = m.split('\n');
      const [left, operator, right] = operationStr.split(' = ').slice(-1)[0].split(' ');

      return {
        items: itemsStr
          .split(': ')
          .slice(-1)[0]
          .split(', ')
          .map(v => parseInt(v)),
        operation(old) {
          const l = computeOperand(old, left);
          const r = computeOperand(old, right);
          return operator === '*' ? l * r : l + r;
        },
        divisor: readLastInt(divisorStr),
        falseMonkeyIndex: readLastInt(falseStr),
        trueMonkeyIndex: readLastInt(trueStr),
        computeThrown(applyInspectionChange) {
          const thrown = this.items.map(item => {
            let updated = this.operation(item);
            if (applyInspectionChange) {
              updated = Math.floor(updated / 3);
            }

            return {
              item: updated,
              index: updated % this.divisor === 0 ? this.trueMonkeyIndex : this.falseMonkeyIndex
            };
          });

          this.items = [];
          return thrown;
        }
      };
    });
  };

  const applyRound = (monkeys, applyInspectionChange, throws) => {
    monkeys.forEach((m, index) => {
      const nextMonkeys = m.computeThrown(applyInspectionChange);
      nextMonkeys.forEach(({ item, index }) => monkeys[index].items.push(item));
      throws[index].push(...nextMonkeys);
    });
  };

  const computeScore = (rounds, applyInspectionChange) => {
    const monkeys = computeInitialState();
    const throws = range(0, monkeys.length).map(() => []);
    range(0, rounds).forEach(() => applyRound(monkeys, applyInspectionChange, throws));

    const throwCounts = throws.map(v => v.length).sort((a, b) => b - a);
    return throwCounts.slice(0, 2).reduce((acc, v) => acc * v, 1);
  };

  answer(computeScore(20, true));
});