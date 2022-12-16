import day from '../../../runner/day.js';
import { subtractVectors, manhattanNorm } from '../../../helpers/vector.js';
import { range } from '../../../helpers/utility.js';

export default day(({ source }) => {
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

    /*
      radius 2
      yDistance  
        0 - fine (5 wide),              c - 2
        1 (below) - fine (3 wide),      c - 1
        2 - fine (1 wide),              c - 0
        >= 3 bad

            *   
      -----+++------
          *****
           ***
            *
    */
  };

  const SCAN_LINE = 2000000;
  const unbeaconed = new Set();

  readings.forEach(({ sensor, beacon }) => {
    const radius = manhattanNorm(subtractVectors(sensor, beacon));
    intersectCircleWithLine(sensor, radius, SCAN_LINE).forEach(v => unbeaconed.add(v));
  });

  // After the previous pass, we need to remove any items from the unbeaconed list which we know to be beacons.
  readings.forEach(({ beacon }) => {
    if (beacon[1] === SCAN_LINE) {
      unbeaconed.delete(beacon[0]);
    }
  });

  console.log(unbeaconed.size);

  // Note that this contains duplicates - which aren't a problem for our purposes.
  //const coordsWithoutSensors = sensorCircles.flatMap(v => v);
  //const [width] = computeDimensions(readings.flatMap(r => [r.sensor, r.beacon]));
  //console.log(width);

  //console.log(coordsWithoutSensors);

  // 5286569 too big

  return [];
});
