import day from '../../helpers/day.js';

export default day(({ answer, source }) => {
  const grid = source.split('\n').map(row => row.split('').map(v => parseInt(v)));
  const cells = grid.flatMap((row, y) => row.map((value, x) => ({ value, x, y })));

  const countVisibleCells = () => {
    return cells.filter(({ value, x, y }) => {
      const tallerOrEqualCells = cells.filter(c => c.value >= value);

      const directions = [
        tallerOrEqualCells.filter(c => c.y === y && c.x < x),
        tallerOrEqualCells.filter(c => c.y === y && c.x > x),
        tallerOrEqualCells.filter(c => c.x === x && c.y > y),
        tallerOrEqualCells.filter(c => c.x === x && c.y < y)
      ];

      return directions.some(d => d.length === 0);
    }).length;
  };

  answer(countVisibleCells(), 1796);

  const by =
    (getter, reverse = false) =>
    (a, b) =>
      (reverse ? -1 : 1) * (getter(a) - getter(b));

  const scenicScoreCells = () => {
    // Order is important here (it wasn't before!)
    return cells.map(({ value, x, y }) => {
      const directions = [
        cells.filter(c => c.y === y && c.x < x).sort(by(v => v.x, true)),
        cells.filter(c => c.y === y && c.x > x).sort(by(v => v.x, false)),
        cells.filter(c => c.x === x && c.y > y).sort(by(v => v.y, false)),
        cells.filter(c => c.x === x && c.y < y).sort(by(v => v.y, true))
      ];

      const score = directions
        .map(d => {
          const index = d.findIndex(c => value <= c.value);
          return index < 0 ? d.length : index + 1;
        })
        .reduce((acc, v) => acc * v, 1);

      return score;
    });
  };

  answer(Math.max(...scenicScoreCells()), 288120);
});
