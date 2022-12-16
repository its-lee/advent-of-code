import day from '../../../runner/day.js';
import { subtractVectors, manhattanNorm } from '../../../helpers/vector.js';
import { range } from '../../../helpers/utility.js';

export default day(({ source, isInput }) => {
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
    const yDistance = Math.abs(lineY - centre[1]);
    if (yDistance > radius) {
      return [];
    }

    const xRadius = 2 * radius + 1 - 2 * yDistance;
    return range(centre[0] - (radius - yDistance), xRadius);
  };

  const getUnbeaconed = (y, excludeSensed) => {
    const unbeaconed = new Set();

    readings.forEach(({ sensor, beacon }) => {
      const radius = manhattanNorm(subtractVectors(sensor, beacon));
      intersectCircleWithLine(sensor, radius, y).forEach(v => unbeaconed.add(v));
    });

    if (excludeSensed) {
      // After the previous pass, we need to remove any items from the unbeaconed list which we know to be beacons.
      readings.forEach(({ beacon }) => {
        if (beacon[1] === y) {
          unbeaconed.delete(beacon[0]);
        }
      });
    }

    return unbeaconed;
  };

  const countUnbeaconed = () => {
    return getUnbeaconed(SCAN_LINE, true).size;
  };

  const findBeacon = () => {
    for (let y = 0; y <= MAX_DISTANCE; ++y) {
      console.log(y);
      console.time('hmm');
      getUnbeaconed(y, false);
      console.timeEnd('hmm');
    }
  };

  return [() => countUnbeaconed(), () => findBeacon()];
});
