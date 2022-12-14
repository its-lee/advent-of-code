import solution from '../../../runner/solution.js';

import { charCode } from '../../../helpers/utility.js';
import { intersect } from '../../../helpers/logic.js';
import { sumReducer, chunkReducer } from '../../../helpers/reducers.js';

export default solution(({ source }) => {
  const lines = source.split('\n');

  return [
    () =>
      lines
        .map(s => {
          const a = s.split('');
          const i = intersect(a.slice(0, a.length / 2), a.slice(a.length / 2));
          return charCode(i[0]);
        })
        .reduce(...sumReducer()),
    () =>
      lines
        .reduce(...chunkReducer(3))
        .map(v => charCode(intersect(...v.map(u => u.split('')))[0]))
        .reduce(...sumReducer())
  ];
});
