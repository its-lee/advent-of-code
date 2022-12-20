import solution from '../../../runner/solution.js';

import { range } from '../../../helpers/utility.js';

export default solution(({ source }) => {
  const MOVEMENTS = {
    '<': true,
    '>': false
  };

  const getMovementQueue = () => source.split('').map(c => MOVEMENTS[c]);

  // We need a safe height for array lengths which is higher than the max number of shapes
  // we'll drop (< 2100) * the max height of a shape (5).
  const WELL_MAX_HEIGHT = 2100 * 5;
  const WELL_WIDTH = 7;
  const CONTENT = { AIR: '.', BLOCK: '#' };

  // Per shape:
  //   - x co-ordinates are relative to their left edge (initially 2 units away from the wall)
  //   - y co-ordinates are relative to their bottom edge (initially 3 units above the highest block)
  const SHAPES_TYPES = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0]
    ],
    [
      [0, 1],
      [1, 2],
      [1, 1],
      [1, 0],
      [2, 1]
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3]
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1]
    ]
  ];

  const createWell = () =>
    range(0, WELL_WIDTH).map(() => range(0, WELL_MAX_HEIGHT).map(() => CONTENT.AIR));

  const simulate = maxShapes => {
    const well = createWell();
    const movementQueue = getMovementQueue();

    let highestBlock = 0;

    const addNewShape = shapeType => shapeType.map(s => [2 + s[0], highestBlock + 3 + s[1]]);

    const moveShapeDown = shape => shape.map(s => [s[0], s[1] - 1]);

    const moveShapeSideways = (shape, isLeft) => shape.map(s => [s[0] + (isLeft ? -1 : 1), s[1]]);

    const hasShapeCollided = shape => {
      return shape.some(([x, y]) => {
        return x < 0 || x >= WELL_WIDTH || y < 0 || well[x][y] === CONTENT.BLOCK;
      });
    };

    const getHighestPointOnShape = shape => Math.max(...shape.map(s => s[1]));

    const writeShapeToWell = shape => shape.forEach(([x, y]) => (well[x][y] = CONTENT.BLOCK));

    const dropShape = shape => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const down = moveShapeDown(shape);
        if (hasShapeCollided(down)) {
          return shape;
        }

        const downThenSideways = moveShapeSideways(down, movementQueue.shift());

        // If a sideways movement is blocked, we just ignore its effect.
        shape = hasShapeCollided(downThenSideways) ? down : downThenSideways;
      }
    };

    const printWell = () => {
      for (let y = highestBlock; y >= 0; --y) {
        const line = [];
        for (let x = 0; x < 7; ++x) {
          line.push(well[x][y]);
        }
        console.log(line.join(''));
      }
    };

    for (let shapeIndex = 0; shapeIndex < maxShapes; ++shapeIndex) {
      const shapeTypeIndex = shapeIndex % SHAPES_TYPES.length;
      let newShape = addNewShape(SHAPES_TYPES[shapeTypeIndex]);
      console.log({ newShape });

      const droppedShape = dropShape(newShape);
      console.log({ droppedShape });
      highestBlock = Math.max(highestBlock, getHighestPointOnShape(droppedShape));

      writeShapeToWell(droppedShape);
      printWell();
    }

    return highestBlock;
  };

  // todo: work out the correct number to pass in here
  simulate(1);

  return [];
});
