import solution from '../../../runner/solution.js';

import { range } from '../../../helpers/utility.js';

export default solution(({ source }) => {
  const movements = {
    '<': true,
    '>': false
  };

  const getMovementQueue = () => source.split('').map(c => movements[c]);

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

  const computeHeight = maxShapes => {
    // We need a safe height for array lengths which is higher than the max number of shapes
    // we'll drop (< 2100) * the max height of a shape (5).
    const wellMaxHeight = maxShapes * 5;
    const wellWidth = 7;

    const createWell = () =>
      range(0, wellWidth).map(() => range(0, wellMaxHeight).map(() => CONTENT.AIR));

    const well = createWell();
    const movementQueue = getMovementQueue();
    let nextMovementQueueIndex = 0;
    let highestBlock = -1;

    const addNewShape = shapeType => shapeType.map(s => [2 + s[0], highestBlock + 4 + s[1]]);

    const moveShapeDown = shape => shape.map(s => [s[0], s[1] - 1]);

    const moveShapeSideways = (shape, isLeft) => shape.map(s => [s[0] + (isLeft ? -1 : 1), s[1]]);

    const hasShapeCollided = shape => {
      return shape.some(
        ([x, y]) => x < 0 || x >= wellWidth || y < 0 || well[x][y] === CONTENT.BLOCK
      );
    };

    const getHighestPointOnShape = shape => Math.max(...shape.map(s => s[1]));

    const writeShapeToWell = shape => shape.forEach(([x, y]) => (well[x][y] = CONTENT.BLOCK));

    const getNextMovement = () => {
      const movement = movementQueue[nextMovementQueueIndex];
      nextMovementQueueIndex = (nextMovementQueueIndex + 1) % movementQueue.length;
      return movement;
    };

    const dropShape = shape => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const movement = getNextMovement();
        const sideways = moveShapeSideways(shape, movement);

        // If a sideways movement is blocked, we just ignore its effect.
        shape = hasShapeCollided(sideways) ? shape : sideways;

        const down = moveShapeDown(shape);

        if (hasShapeCollided(down)) {
          return shape;
        } else {
          shape = down;
        }
      }
    };

    // eslint-disable-next-line no-unused-vars
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
      const newShape = addNewShape(SHAPES_TYPES[shapeTypeIndex]);

      const droppedShape = dropShape(newShape);
      highestBlock = Math.max(highestBlock, getHighestPointOnShape(droppedShape));

      writeShapeToWell(droppedShape);
    }

    // For the height, we need to add 1 to translate from an index.
    return highestBlock + 1;
  };

  return [() => computeHeight(2022)];
});
