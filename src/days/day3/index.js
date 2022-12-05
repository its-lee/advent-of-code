import input from './input.js';
import { sumReducer, chunkReducer, intersect, charCode } from '../../helpers.js';

const lines = input.split('\n');

export default [
  lines
    .map(s => {
      const a = s.split('');
      const i = intersect(a.slice(0, a.length / 2), a.slice(a.length / 2));
      return charCode(i[0]);
    })
    .reduce(...sumReducer()),
  lines
    .reduce(...chunkReducer(3))
    .map(v => charCode(intersect(...v.map(u => u.split('')))[0]))
    .reduce(...sumReducer())
];
