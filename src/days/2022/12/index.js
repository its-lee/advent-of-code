import day from '../../../runner/day.js';

import { charCode } from '../../../helpers/utility.js';
import { relative, areEqualVectors } from '../../../helpers/vector.js';

export default day(({ answer, source }) => {
  // TODO: dedupe this linearization from #8, move value map to end
  const grid = source
    .split('\n')
    .map(row => row.split(''))
    .flatMap((row, y) => row.map((s, x) => ({ value: charCode(s), position: [x, y] })));

  const initialPath = [grid.find(({ value }) => value === charCode('S'))];

  const isDestination = c => c.value === charCode('E');

  const areAdjacent = (a, b) =>
    relative(a, b)
      .map(v => Math.abs(v))
      .reduce((acc, v) => acc + v, 0) === 1;

  const findNextSteps = path => {
    const current = path[path.length - 1];
    return grid
      .filter(c => areAdjacent(current.position, c.position))
      .filter(c => c.value <= current.value + 1 || isDestination(c)) // ignore cells which are too step
      .filter(c => !path.some(p => areEqualVectors(p.position, c.position))); // don't go where we've already gone to avoid infinite cycles
  };

  const extendAndBifurcatePath = path => findNextSteps(path).map(step => [...path, step]);

  // todo: need to detect terminuses - either the end is E OR the end hasn't changed
  // todo: need to progress each path in turn

  // const paths = extendAndBifurcatePath(initialPath);
  // paths.forEach(path => {
  //   // check if we're at the end
  //   if (path[path.length - 1].value === charCode('E')) {
  //     console.log('found successful path');
  //   }

  //   const newPaths = extendAndBifurcatePath(path).filter(newPath => newPath.length === path.length);
  //   // check for termination
  //   // remove finished paths
  //   newPaths.forEach(np => {
  //     // ...
  //   });
  // });

  const recursePaths = paths => {
    paths.forEach(path => {
      // console.log(path[path.length - 1].value, 'E=', charCode('E'));
      // check if we're at the end
      if (isDestination(path[path.length - 1])) {
        console.log('found successful path - length', path.length);
      }

      // Ignore those paths which have stopped growing - they're at a dead end.
      const newPaths = extendAndBifurcatePath(path).filter(newPath => newPath.length > path.length);

      // console.log(newPaths);

      recursePaths(newPaths);
    });
  };

  recursePaths([initialPath]);
});
