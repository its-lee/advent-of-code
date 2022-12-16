import solution from '../../../runner/solution.js';
import { subtractVectors, manhattanNorm } from '../../../helpers/vector.js';
import { intervalIntersection, intervalUnion, intervalsLength } from '../../../helpers/interval.js';
import { range } from '../../../helpers/utility.js';

export default solution(({ source, isInput }) => {
  const SCAN_LINE = isInput ? 2000000 : 10;
  const MAX_DISTANCE = isInput ? 4000000 : 20;

  const readings = source.split('\n').map(l => {
    const [, sx, sy, bx, by] =
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/
        .exec(l)
        .map(v => parseInt(v));

    return {
      sensor: [sx, sy],
      beacon: [bx, by]
    };
  });

  const intersectCircleWithLine = (centre, radius, lineY) => {
    const lineRadius = radius - Math.abs(lineY - centre[1]);
    if (lineRadius < 0) {
      return null;
    }

    const start = centre[0] - lineRadius;
    return [start, start + 2 * lineRadius];
  };

  const getUnbeaconed = y => {
    const intervals = readings
      .map(({ sensor, beacon }) => {
        const radius = manhattanNorm(subtractVectors(sensor, beacon));
        return intersectCircleWithLine(sensor, radius, y);
      })
      .filter(Boolean);

    // demo output should be [ -2, 24 ]
    return intervals;
  };

  // todo: replace this
  const intersectCircleWithLine_old = (centre, radius, lineY) => {
    const yDistance = Math.abs(lineY - centre[1]);
    if (yDistance > radius) {
      return [];
    }

    const xRadius = 2 * radius + 1 - 2 * yDistance;
    return range(centre[0] - (radius - yDistance), xRadius);
  };

  // todo: replace this
  const getUnbeaconed_old = y => {
    const unbeaconed = new Set();

    readings.forEach(({ sensor, beacon }) => {
      const radius = manhattanNorm(subtractVectors(sensor, beacon));
      intersectCircleWithLine_old(sensor, radius, y).forEach(v => unbeaconed.add(v));
    });

    return unbeaconed;
  };

  const countUnbeaconed = () => {
    const unbeaconedCount = getUnbeaconed_old(SCAN_LINE).size;
    const uniqueBeaconCountOnLine = new Set(
      readings.filter(({ beacon }) => beacon[1] === SCAN_LINE).map(({ beacon }) => beacon[0])
    ).size;

    // After the previous pass, we need to remove any items from the unbeaconed list which we know to be beacons.
    return unbeaconedCount - uniqueBeaconCountOnLine;
  };

  const findBeacon = () => {
    for (let y = 0; y <= MAX_DISTANCE; ++y) {
      if (y % 100 === 0) {
        console.log((y / MAX_DISTANCE).toFixed(8) + '%');
      }
      //console.time('hmm');
      const intervals = getUnbeaconed(y);
      for (let x = 0; x <= MAX_DISTANCE; ++x) {
        if (!intervals.some(([l, r]) => x >= l || x <= r)) {
          return [x, y];
        }
      }
      //console.timeEnd('hmm');
    }
  };

  return [() => countUnbeaconed(), () => findBeacon()];
});
