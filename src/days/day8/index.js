import day from '../../helpers/day.js';

export default day(({ answer, source }) => {
  const grid = source.split('\n').map(row => row.split('').map(v => parseInt(v)));
  const cells = grid.flatMap((row, y) => row.map((value, x) => ({ value, x, y })));

  const visible = cells.filter(({ value, x, y }) => {
    const tallerOrEqualCells = cells.filter(c => c.value >= value);

    const directions = [
      tallerOrEqualCells.filter(c => c.y === y && c.x < x),
      tallerOrEqualCells.filter(c => c.y === y && c.x > x),
      tallerOrEqualCells.filter(c => c.x === x && c.y > y),
      tallerOrEqualCells.filter(c => c.x === x && c.y < y)
    ];

    return directions.some(d => d.length === 0);
  });

  answer(visible.length);
});
