import input from './input.js';
import { sumReducer, chunkReducer, intersect, charCode, range, union } from '../../helpers.js';

const lines = input.split('\n');

const parseRanges = s =>
  s.split(',').map(r => {
    const [s, e] = r.split('-');
    return range(parseInt(s), parseInt(e) + 1);
  });

export default [
  lines
    .map(parseRanges)
    .map(v => union(...v).length === Math.max(...v.map(a => a.length)))
    .reduce(...sumReducer()),
  lines
    .map(parseRanges)
    .map(v => !!intersect(...v).length)
    .reduce(...sumReducer())
];
