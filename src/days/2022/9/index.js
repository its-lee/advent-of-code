import day from '../../../runner/day.js';

import { range, dedupe } from '../../../helpers/utility.js';
import { relative, infinityNorm, areEqualVectors } from '../../../helpers/vector.js';

export default day(source => {
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

  const moveTail = (head, tail) => {
    const tailRelativeToHead = relative(tail, head);

    if (infinityNorm(tailRelativeToHead) <= 1) {
      // We're close enough..
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

  const dedupePositions = array => dedupe(array, areEqualVectors);

  const computeTailVisits = bodyLength => {
    const body = range(1, bodyLength).map(() => [0, 0]);
    const tailPositions = [];

    headPositions.forEach(head => {
      body.forEach((_, i) => {
        body[i] = moveTail(i === 0 ? head : body[i - 1], body[i]);
      });

      tailPositions.push(body[body.length - 1]);
    });

    return dedupePositions(tailPositions).length;
  };

  return [() => computeTailVisits(1), () => computeTailVisits(9)];
});
