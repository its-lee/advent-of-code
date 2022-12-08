import day from '../../helpers/day.js';

export default day(({ answer, source }) => {
  const grid = source.split('\n').map(row => row.split('').map(v => parseInt(v)));

  const cells = grid.map((row, rowIndex) => {
    return row.flatMap((value, columnIndex) => ({ value, row: rowIndex, column: columnIndex }));
  });

  console.log(cells);
});
