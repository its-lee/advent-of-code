import day from '../../../runner/day.js';

import { range } from '../../../helpers/utility.js';
import { intersect, union } from '../../../helpers/logic.js';
import { sumReducer } from '../../../helpers/reducers.js';

export default day(({ source }) => {
  const parseRanges = s =>
    s.split(',').map(r => {
      const [s, e] = r.split('-');
      return range(parseInt(s), parseInt(e) - parseInt(s) + 1);
    });

  const ranges = source.split('\n').map(parseRanges);

  return [
    () =>
      ranges
        .map(v => union(...v).length === Math.max(...v.map(a => a.length)))
        .reduce(...sumReducer()),
    () => ranges.map(v => !!intersect(...v).length).reduce(...sumReducer())
  ];
});
