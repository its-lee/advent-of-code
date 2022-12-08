import day from '../../helpers/day.js';
import { range } from '../../helpers/utility.js';
import { intersect, union } from '../../helpers/logic.js';
import { sumReducer } from '../../helpers/reducers.js';

export default day(({ part, source }) => {
  const lines = source.split('\n');

  const parseRanges = s =>
    s.split(',').map(r => {
      const [s, e] = r.split('-');
      return range(parseInt(s), parseInt(e) - parseInt(s) + 1);
    });

  part(
    lines
      .map(parseRanges)
      .map(v => union(...v).length === Math.max(...v.map(a => a.length)))
      .reduce(...sumReducer()),
    657
  );

  part(
    lines
      .map(parseRanges)
      .map(v => !!intersect(...v).length)
      .reduce(...sumReducer()),
    938
  );
});
