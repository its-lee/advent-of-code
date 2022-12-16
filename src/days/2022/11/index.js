import { range } from '../../../helpers/utility.js';
import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
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
        trueMonkeyIndex: readLastInt(trueStr)
      };
    });
  };

  const computeThrown = (monkeys, monkey, applyInspectionChange) => {
    const thrown = monkey.items.map(item => {
      let updated = monkey.operation(item);
      if (applyInspectionChange) {
        updated = Math.floor(updated / 3);
      } else {
        // Reduce the updated value down to mod (product of divisors).
        // This works as each monkey only looks at the result after additions and multiplications
        // mod their divisor - so if there's an additive part that's a multiple of this divisor product
        // they're not going to see it anyway (as it'll be 0 mod their divisor).
        //
        // This lets us reduce the values passed down to a value always less than this product -
        // rather than having to contend with absolutely colossal values (that using BigInt will
        // support) which crash my machine as the amount of memory required to store all the digits
        // is wayyyy too much. Even this is assuming that using BigInt wouldn't truncate (I don't
        // think it would, we're only perform integral operations and it essentially stores digits
        // in a string).
        //
        // This only works because we're using integral operations (+, *), if we were still doing
        // integer division by 3 it wouldn't as that's a lossy operation.
        //
        // Note: We could optimise this further by using the LCM (or by not computing this every
        // single time..)
        updated %= monkeys.reduce((acc, v) => acc * v.divisor, 1);
      }

      return {
        item: updated,
        index: updated % monkey.divisor ? monkey.falseMonkeyIndex : monkey.trueMonkeyIndex
      };
    });

    monkey.items = [];
    return thrown;
  };

  const applyRound = (monkeys, applyInspectionChange, throws) => {
    monkeys.forEach((m, index) => {
      const nextMonkeys = computeThrown(monkeys, m, applyInspectionChange);
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

  return [() => computeScore(20, true), () => computeScore(10000, false)];
});
