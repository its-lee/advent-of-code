import submission from '../../submission.js';
import input from './input.js';
import { sumReducer, intersect, range, union } from '../../helpers.js';

const lines = input.split('\n');

const parseRanges = s =>
  s.split(',').map(r => {
    const [s, e] = r.split('-');
    return range(parseInt(s), parseInt(e) + 1);
  });

export default submission()
  .add(
    lines
      .map(parseRanges)
      .map(v => union(...v).length === Math.max(...v.map(a => a.length)))
      .reduce(...sumReducer()),
    657
  )
  .add(
    lines
      .map(parseRanges)
      .map(v => !!intersect(...v).length)
      .reduce(...sumReducer()),
    938
  );
