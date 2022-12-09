import day from '../../runner/day.js';

import { range, dedupe } from '../../helpers/utility.js';

export default day(({ answer, source }) => {
  const headMoves = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1]
  };

  const move = (p, direction) => p.map((v, i) => v + direction[i]);

  const computeHeadPositions = () => {
    const moves = source.split('\n').flatMap(l => {
      const [direction, count] = l.split(' ');
      return range(0, parseInt(count)).map(() => headMoves[direction]);
    });

    let head = [0, 0];
    return moves.map(headMove => {
      head = move(head, headMove);
      return head;
    });
  };

  const headPositions = computeHeadPositions();

  const infinityNorm = p => Math.max(...p.map(v => Math.abs(v))); // ayyyy it's our good friend the L-infinity norm!
  const relative = (a, b) => b.map((v, i) => v - a[i]);

  const moveTail = (head, tail) => {
    const tailRelativeToHead = relative(tail, head);

    if (infinityNorm(tailRelativeToHead) <= 1) {
      return tail;
    }

    // The head will only be in positions indicated by 'h' below (as we will always be catching up
    // so we're either diagonally or cardinally adjacent - and the head has only moved once).
    //       hhh
    //       ..h
    //       T.h
    //   Soooo.. we can work out how the tail should move by looking at the relative vector - just
    // find any instances of where it'd move by > 1 in a direction and snub that down to 1.
    const tailMove = tailRelativeToHead.map(v =>
      Math.abs(v) > 1 ? Math.sign(v) * (Math.abs(v) - 1) : v
    );

    return move(tail, tailMove);
  };

  const dedupePositions = array => dedupe(array, (a, b) => a.every((v, i) => v === b[i]));

  const computeTailVisits = () => {
    let tail = [0, 0];
    const tailPositions = [];

    headPositions.forEach(head => {
      tail = moveTail(head, tail);
      tailPositions.push(tail);
    });

    return dedupePositions(tailPositions).length;
  };

  answer(computeTailVisits(), 5960);

  const computeLongerTailVisits = () => {
    const tail = range(1, 9).map(() => [0, 0]);

    const tailEndPositions = [];

    headPositions.forEach(head => {
      tail.forEach((_, i) => {
        tail[i] = moveTail(i === 0 ? head : tail[i - 1], tail[i]);
      });

      tailEndPositions.push(tail[tail.length - 1]);
    });

    return dedupePositions(tailEndPositions).length;
  };

  // todo: pass length to the above & use it in both answers!

  answer(computeLongerTailVisits(), 2327);
});
