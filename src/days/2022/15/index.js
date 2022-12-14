import solution from '../../../runner/solution.js';
import { subtractVectors, manhattanNorm } from '../../../helpers/vector.js';
import { intervalsUnion, intervalsLength } from '../../../helpers/interval.js';

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

  const getCircleIntersectionsAtHeight = y => {
    const intervals = readings
      .map(({ sensor, beacon }) => {
        const radius = manhattanNorm(subtractVectors(sensor, beacon));
        return intersectCircleWithLine(sensor, radius, y);
      })
      .filter(Boolean);

    return intervalsUnion(intervals);
  };

  const countUnbeaconed = () => {
    const unbeaconedCount = intervalsLength(getCircleIntersectionsAtHeight(SCAN_LINE));

    const uniqueBeaconCountOnLine = new Set(
      readings.filter(({ beacon }) => beacon[1] === SCAN_LINE).map(({ beacon }) => beacon[0])
    ).size;

    // After the previous pass, we need to remove any items from the unbeaconed list which we know to be beacons.
    return unbeaconedCount - uniqueBeaconCountOnLine;
  };

  const findBeacon = () => {
    for (let y = 0; y <= MAX_DISTANCE; ++y) {
      const intervals = getCircleIntersectionsAtHeight(y);
      if (intervals.length === 2) {
        const leftInterval = intervals.sort((a, b) => a[0] - b[0])[0];
        const x = leftInterval[1] + 1;
        console.log('intervals', intervals);
        return [x, y];
      }
    }
  };

  return [
    () => countUnbeaconed(),
    () => {
      const [x, y] = findBeacon();
      return 4000000 * x + y;
    }
  ];
});
