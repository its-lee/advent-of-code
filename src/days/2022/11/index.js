import day from '../../../runner/day.js';

export default day(({ answer, source }) => {
  const readLastInt = str =>
    str
      .split(' ')
      .slice(-1)
      .map(v => parseInt(v))[0];

  const computeOperand = (old, str) => (str === 'old' ? old : parseInt(str));

  const monkeys = source.split('\n\n').map(m => {
    const [, itemsStr, operationStr, divisorStr, trueStr, falseStr] = m.split('\n');
    const [left, operator, right] = operationStr.split(' = ').slice(-1)[0].split(' ');

    return {
      items: itemsStr
        .split(': ')
        .slice(-1)[0]
        .split(', ')
        .map(v => parseInt(v)),
      operation: old => {
        const l = computeOperand(old, left);
        const r = computeOperand(old, right);
        return operator === '*' ? l * r : l + r;
      },
      divisor: readLastInt(divisorStr),
      dispatch: [readLastInt(falseStr), readLastInt(trueStr)]
    };
  });

  console.log(monkeys);
});
