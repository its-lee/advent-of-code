import day from '../../helpers/day.js';

import { charCode } from '../../helpers/utility.js';
import { sumReducer } from '../../helpers/reducers.js';

export default day(({ answer, source }) => {
  const gameScore = (them, us) => {
    const winDrawLose = (3 + us - them) % 3;
    return (winDrawLose + 1) * 3;
  };

  answer(
    source
      .split('\n')
      .map(l => {
        let [them, us] = l.toLowerCase().split(' ').map(charCode);
        us -= 23;

        console.log(them, us, 'score: ', us, '+', gameScore(them, us));
        return us + gameScore(them, us);

        // final score = us + (score for winning)
      })
      .reduce(...sumReducer())
  );
});
