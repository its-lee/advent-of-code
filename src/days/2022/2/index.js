import day from '../../../runner/day.js';

import { charCode } from '../../../helpers/utility.js';
import { sumReducer } from '../../../helpers/reducers.js';

export default day(({ source }) => {
  const parsedSource = source.split('\n').map(l => {
    let [a, b] = l.toLowerCase().split(' ').map(charCode);
    b -= 23;
    return [a, b];
  });

  const gameScore = (them, us) => {
    // winDrawLose = -1 = lose, 0 = draw, 1 = win
    let winDrawLose = (3 + us - them) % 3;
    winDrawLose = winDrawLose === 2 ? -1 : winDrawLose;
    return (winDrawLose + 1) * 3;
  };

  const potentialMoves = [1, 2, 3];

  return [
    () => parsedSource.map(([them, us]) => us + gameScore(them, us)).reduce(...sumReducer()),
    () =>
      parsedSource
        .map(([them, scoreHint]) => {
          const requiredGameScore = (scoreHint - 1) * 3;
          const moveScore = potentialMoves.find(us => gameScore(them, us) === requiredGameScore);
          return requiredGameScore + moveScore;
        })
        .reduce(...sumReducer())
  ];
});
