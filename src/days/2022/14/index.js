import solution from '../../../runner/solution.js';
import { range } from '../../../helpers/utility.js';
import {
  subtractVectors,
  addVectors,
  areEqualVectors,
  computeDimensions
} from '../../../helpers/vector.js';

export default solution(({ source, writeDebugFile }) => {
  const CONTENT = {
    AIR: '.',
    ROCK: '#',
    SAND: 'o'
  };

  const rocks = source
    .split('\n')
    .flatMap(line => {
      const parts = line.split(' -> ');
      return parts.slice(0, -1).map((p, i) => [p, parts[i + 1]]);
    })
    .map(pair => pair.map(coord => coord.split(',').map(v => parseInt(v))))
    .flatMap(([a, b]) => {
      const r = subtractVectors(b, a);
      const changingIndex = r.findIndex(Boolean);
      const changedValue = r[changingIndex];

      return range(0, Math.abs(changedValue) + 1).map(v => {
        const p = [0, 0];
        p[changingIndex] = Math.sign(changedValue) * v;
        return addVectors(a, p);
      });
    });

  const simulateSandfall = hasFloor => {
    const dimensions = computeDimensions(rocks);
    const width = dimensions[0] * (hasFloor ? 2 : 1);
    const height = dimensions[1] + (hasFloor ? 2 : 0);

    // Initialise the grid as all air then add the rocks
    const grid = range(0, width).map(() => range(0, height).map(() => CONTENT.AIR));
    // then add the rocks..
    rocks.forEach(([x, y]) => (grid[x][y] = CONTENT.ROCK));
    if (hasFloor) {
      range(0, width).forEach(x => (grid[x][height - 1] = CONTENT.ROCK));
    }

    // eslint-disable-next-line no-unused-vars
    const print = () => {
      const buffer = [];
      for (let y = 0; y < grid[0].length; ++y) {
        buffer.push(grid.map(v => v[y]).join(''));
      }

      writeDebugFile(buffer.join('\n'));
    };

    const moves = [p => [p[0], p[1] + 1], p => [p[0] - 1, p[1] + 1], p => [p[0] + 1, p[1] + 1]];

    const progressSand = sand => {
      for (const move of moves) {
        const moved = move(sand);

        // Bounds check: I don't really think this will happen by design of the provided
        // input - but it's a hunch, so let's notify if it does happen, and work out how
        // factor it in if it happens.
        if (moved[0] < 0 || moved[0] >= width || moved[1] < 0 || moved[1] >= height) {
          throw new Error(
            `Sand moved out of range of the grid - (${moved}) vs (${width}, ${height})`
          );
        }

        if (grid[moved[0]][moved[1]] === CONTENT.AIR) {
          return moved;
        }
      }

      return null;
    };

    const applySand = () => {
      const sandSource = [500, 0];
      let sand = sandSource;
      let rests = true;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const movedSand = progressSand(sand);
        if (movedSand) {
          sand = movedSand;
          if (sand[1] === height - 1) {
            rests = false;
            break;
          }
        } else {
          if (hasFloor && areEqualVectors(sand, sandSource)) {
            rests = false;
          }

          break;
        }
      }

      if (sand) {
        grid[sand[0]][sand[1]] = CONTENT.SAND;
      }

      return rests;
    };

    const exhaustSand = () => {
      let resting = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        resting++;
        if (!applySand()) {
          // This one didn't reach a point where it could rest, so we need to remove 1.
          // That's not the case when we're looking at dropped sand in part 2.
          return resting - (hasFloor ? 0 : 1);
        }
      }
    };

    return exhaustSand();
  };

  return [() => simulateSandfall(false), () => simulateSandfall(true)];
});
