import day from '../../helpers/day.js';

export default day(({ part, input }) => {
  const [stringizedInitialState, moves] = input.split('\n\n');

  const computeInitialState = () => {
    const stateRows = stringizedInitialState.split('\n').slice(0, -1).reverse();
    const emptyState = stateRows[0]
      .split('')
      .filter(c => c === '[')
      .map(() => []);

    return stateRows.reduce((acc, line) => {
      line.split('').forEach((c, i) => {
        if (i % 4 === 1 && c.trim() !== '') {
          acc[Math.floor(i / 4)].push(c);
        }
      });

      return acc;
    }, emptyState);
  };

  const initialState = computeInitialState();
  const moveRegex = new RegExp(`^${'\\D+(\\d+)'.repeat(3)}$`);

  const computeMutatedTop = reverse => {
    return moves
      .split('\n')
      .reduce((state, move) => {
        const [, amount, from, to] = moveRegex.exec(move).map(v => parseInt(v));
        const moving = state[from - 1].splice(-amount, amount);
        state[to - 1].push(...(reverse ? moving.reverse() : moving));
        return state;
      }, initialState)
      .reduce((acc, column) => {
        acc.push(column[column.length - 1]);
        return acc;
      }, [])
      .reduce((acc, v) => acc + v);
  };

  part(computeMutatedTop(true), 'WHTLRMZRC');
  part(computeMutatedTop(false), 'CPZPMPBMM');
});
