import day from '../../helpers/day.js';

import { charCode } from '../../helpers/utility.js';
import { sumReducer } from '../../helpers/reducers.js';

export default day(({ answer, source }) => {
  const gameScore = (them, us) => {
    // winDrawLose = -1 = lose, 0 = draw, 1 = win
    let winDrawLose = (3 + us - them) % 3;
    winDrawLose = winDrawLose === 2 ? -1 : winDrawLose;
    return (winDrawLose + 1) * 3;
  };

  answer(
    source
      .split('\n')
      .map(l => {
        let [them, us] = l.toLowerCase().split(' ').map(charCode);
        us -= 23;
        return us + gameScore(them, us);
      })
      .reduce(...sumReducer()),
    15523
  );
});
