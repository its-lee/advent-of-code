import day from '../../../runner/day.js';
import {
  subtractVectors,
  manhattanNorm,
  addVectors,
  computeDimensions
} from '../../../helpers/vector.js';

export default day(({ source }) => {
  const buildCircle = (centre, radius) => {
    let circle = [];
    for (let x = -radius; x <= radius; ++x) {
      const height = radius - Math.abs(x);
      for (let y = -height; y <= height; ++y) {
        circle.push(addVectors(centre, [x, y]));
      }
    }

    return circle;
  };

  const sensorCircles = source
    .split('\n')
    .map(l => {
      const [, sx, sy, bx, by] =
        /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/
          .exec(l)
          .map(v => parseInt(v));

      return {
        sensor: [sx, sy],
        beacon: [bx, by]
      };
    })
    .map(({ sensor, beacon }) => {
      const radius = manhattanNorm(subtractVectors(sensor, beacon));
      return buildCircle(sensor, radius);
    });

  // Note that this contains duplicates - which aren't a problem for our purposes.
  const coordsWithoutSensors = sensorCircles.flatMap(v => v);

  const [width] = computeDimensions(coordsWithoutSensors);

  console.log(coordsWithoutSensors);

  return [];
});
