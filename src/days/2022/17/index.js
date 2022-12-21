import solution from '../../../runner/solution.js';

import { range } from '../../../helpers/utility.js';

export default solution(({ source }) => {
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
    let removedBlocks = 0;

    const addNewShape = shapeType => shapeType.map((x, y) => [x, highestBlock + 4 + y]);

    const moveShapeDown = shape => shape.map(([x, y]) => [x, y - 1]);

    const moveShapeSidewaysOrIgnore = (shape, isLeft) => {
      // If a sideways movement is blocked, we just ignore its effect.
      const edge = isLeft ? 0b1000000 : 0b0000001;
      if (shape.some(([x]) => x & edge)) {
        return shape;
      }

      const sideways = shape.map(([x, y]) => [isLeft ? x << 1 : x >> 1, y]);
      return sideways.some(([x, y]) => x & (well[y] || 0)) ? shape : sideways;
    };

    const getHighestPointOnShape = shape => Math.max(...shape.map(s => s[1]));

    const writeShapeToWell = shape => shape.forEach(([x, y]) => (well[y] |= x));

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

    const findLastIndex = (a, v) => {
      let i = well.length - 1;
      while (i >= 0) {
        if (a[i] === v) {
          return i;
        }

        i--;
      }

      return undefined;
    };

    // eslint-disable-next-line no-unused-vars
    const printWell = () =>
      [...well]
        .reverse()
        .forEach(x =>
          console.log(x.toString(2).padStart(7, '0').replaceAll('0', '.').replaceAll('1', '#'))
        );

    for (let shapeIndex = 0; shapeIndex < maxShapes; ++shapeIndex) {
      const shapeTypeIndex = shapeIndex % shapeTypes.length;
      const newShape = addNewShape(shapeTypes[shapeTypeIndex]);

      const droppedShape = dropShape(newShape);
      highestBlock = Math.max(highestBlock, getHighestPointOnShape(droppedShape));

      writeShapeToWell(droppedShape);

      // Every so often, check to see if there's any tetrises (horizontal line). They're rare but crucial,
      // as whenever we see one, we can ignore any blocks below them. This is one factor that allows
      // us not to keep GBs of data in RAM.
      if (shapeIndex % 1000 === 0) {
        const y = findLastIndex(well, 127);
        if (y) {
          // console.log('found tetris', y, well[y]);
          const blocksToRemove = y + 1;
          well.splice(0, blocksToRemove);
          highestBlock -= blocksToRemove;
          removedBlocks += blocksToRemove;
        }
      }
    }

    //printWell();

    // For the height, we need to add 1 to translate from an index.
    return removedBlocks + highestBlock + 1;
  };

  // todo: optimise by looking for the latest possible tetris at each stage.
  return [() => computeHeight(2022) /*, () => computeHeight(5 * 1000000)*/];
});
