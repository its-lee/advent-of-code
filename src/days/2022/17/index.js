import solution from '../../../runner/solution.js';

import { range } from '../../../helpers/utility.js';

export default solution(({ source }) => {
  const USE_NEW_IMPL = true;

  if (USE_NEW_IMPL) {
    const movements = {
      '<': true,
      '>': false
    };

    const getMovementQueue = () => source.split('').map(c => movements[c]);

    // Per shape:
    //   - x co-ordinates are relative to their left edge (initially 2 units away from the wall)
    //   - y co-ordinates are relative to their bottom edge (initially 3 units above the highest block)
    //   - All shape types are defined from bottom-up.
    const shapeTypes = [
      // ####
      [0b1111000],
      // .#.
      // ###
      // .#.
      [0b0100000, 0b1110000, 0b0100000],
      // ..#
      // ..#
      // ###
      [0b1110000, 0b0010000, 0b0010000],
      // #
      // #
      // #
      // #
      [0b1000000, 0b1000000, 0b1000000, 0b1000000],
      // ##
      // ##
      [0b1100000, 0b1100000]
    ].map(s => s.map(x => x >> 2));

    const computeHeight = maxShapes => {
      const well = [];
      const movementQueue = getMovementQueue();
      let nextMovementQueueIndex = 0;
      let highestBlock = -1;

      const addNewShape = shapeType => shapeType.map((x, y) => [x, highestBlock + 4 + y]);

      const moveShapeDown = shape => shape.map((x, y) => [x, y - 1]);

      const moveShapeSidewaysOrIgnore = (shape, isLeft) => {
        // If a sideways movement is blocked, we just ignore its effect.
        const edge = isLeft ? 0b1000000 : 0b0000001;
        return shape.some(([x]) => x & edge)
          ? shape
          : shape.map(([x, y]) => [isLeft ? x << 1 : x >> 1, y]);
      };

      const getHighestPointOnShape = shape => Math.max(...shape.map(s => s[1]));

      const writeShapeToWell = shape => shape.forEach(([x, y]) => (well[y] = x));

      const getNextMovement = () => {
        const movement = movementQueue[nextMovementQueueIndex];
        nextMovementQueueIndex = (nextMovementQueueIndex + 1) % movementQueue.length;
        return movement;
      };

      const dropShape = shape => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const movement = getNextMovement();
          shape = moveShapeSidewaysOrIgnore(shape, movement);

          const down = moveShapeDown(shape);
          const downWouldCollide = down.some(([x, y]) => y < 0 || (well[y] || 0) & x);

          if (downWouldCollide) {
            return shape;
          } else {
            shape = down;
          }
        }
      };

      // eslint-disable-next-line no-unused-vars
      const printWell = () =>
        [...well].reverse().forEach(x => console.log(x.toString(2).padStart(7, '0')));

      for (let shapeIndex = 0; shapeIndex < maxShapes; ++shapeIndex) {
        const shapeTypeIndex = shapeIndex % shapeTypes.length;
        const newShape = addNewShape(shapeTypes[shapeTypeIndex]);

        const droppedShape = dropShape(newShape);
        highestBlock = Math.max(highestBlock, getHighestPointOnShape(droppedShape));

        writeShapeToWell(droppedShape);
      }

      printWell();

      // For the height, we need to add 1 to translate from an index.
      return highestBlock + 1;
    };

    // todo: optimise by looking for the latest possible tetris at each stage.
    return [() => computeHeight(1)];
  } else {
    const movements = {
      '<': true,
      '>': false
    };

    const getMovementQueue = () => source.split('').map(c => movements[c]);

    const CONTENT = { AIR: '.', BLOCK: '#' };

    const shapeTypes = [
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
        const shapeTypeIndex = shapeIndex % shapeTypes.length;
        const newShape = addNewShape(shapeTypes[shapeTypeIndex]);

        const droppedShape = dropShape(newShape);
        highestBlock = Math.max(highestBlock, getHighestPointOnShape(droppedShape));

        writeShapeToWell(droppedShape);
      }

      // For the height, we need to add 1 to translate from an index.
      return highestBlock + 1;
    };

    return [() => computeHeight(2022)];
  }
});
