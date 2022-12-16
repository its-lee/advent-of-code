import day from '../../../runner/day.js';
import { subtractVectors, manhattanNorm } from '../../../helpers/vector.js';
import { range } from '../../../helpers/utility.js';

export default day(({ source, isInput }) => {
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

  const countUnbeaconed = scanLine => {
    const unbeaconed = new Set();

    readings.forEach(({ sensor, beacon }) => {
      const radius = manhattanNorm(subtractVectors(sensor, beacon));
      intersectCircleWithLine(sensor, radius, scanLine).forEach(v => unbeaconed.add(v));
    });

    // After the previous pass, we need to remove any items from the unbeaconed list which we know to be beacons.
    readings.forEach(({ beacon }) => {
      if (beacon[1] === scanLine) {
        unbeaconed.delete(beacon[0]);
      }
    });

    return unbeaconed.size;
  };

  const SCAN_LINE = isInput ? 2000000 : 10;

  return [() => countUnbeaconed(SCAN_LINE)];
});
