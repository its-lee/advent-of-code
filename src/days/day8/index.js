import day from '../../helpers/day.js';

export default day(({ answer, source }) => {
  const grid = source.split('\n').map(row => row.split('').map(v => parseInt(v)));
  const cells = grid.flatMap((row, y) => row.map((value, x) => ({ value, x, y })));

  const by =
    (getter, reverse = false) =>
    (a, b) =>
      (reverse ? -1 : 1) * (getter(a) - getter(b));

  const computeDirections = (cells, x, y) => {
    // Order is important for part 2, we order so the arrays start from (x, y) and
    // spread radially outwards.
    return [
      cells.filter(c => c.y === y && c.x < x).sort(by(v => v.x, true)),
      cells.filter(c => c.y === y && c.x > x).sort(by(v => v.x, false)),
      cells.filter(c => c.x === x && c.y > y).sort(by(v => v.y, false)),
      cells.filter(c => c.x === x && c.y < y).sort(by(v => v.y, true))
    ];
  };

  const getVisibleCells = () => {
    return cells.filter(({ value, x, y }) => {
      const tallerOrEqualCells = cells.filter(c => c.value >= value);
      return computeDirections(tallerOrEqualCells, x, y).some(d => d.length === 0);
    });
  };

  answer(getVisibleCells().length, 1796);

  const scoreCells = () => {
    return cells.map(({ value, x, y }) => {
      return computeDirections(cells, x, y)
        .map(d => {
          const index = d.findIndex(c => value <= c.value);
          return index < 0 ? d.length : index + 1;
        })
        .reduce((acc, v) => acc * v, 1);
    });
  };

  answer(Math.max(...scoreCells()), 288120);
});
