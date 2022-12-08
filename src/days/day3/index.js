import submission from '../../submission.js';
import input from './input.js';
import { charCode } from '../../helpers/utility.js';
import { intersect } from '../../helpers/logic.js';
import { sumReducer, chunkReducer } from '../../helpers/reducers.js';

const lines = input.split('\n');

export default submission()
  .add(
    lines
      .map(s => {
        const a = s.split('');
        const i = intersect(a.slice(0, a.length / 2), a.slice(a.length / 2));
        return charCode(i[0]);
      })
      .reduce(...sumReducer()),
    7990
  )
  .add(
    lines
      .reduce(...chunkReducer(3))
      .map(v => charCode(intersect(...v.map(u => u.split('')))[0]))
      .reduce(...sumReducer()),
    2602
  );
