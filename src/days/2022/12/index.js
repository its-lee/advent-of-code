import day from '../../../runner/day.js';

import { charCode, range } from '../../../helpers/utility.js';
import { relative, areEqualVectors } from '../../../helpers/vector.js';

export default day(({ answer, source }) => {
  // TODO: dedupe this linearization from #8, move value map to end
  const grid = source
    .split('\n')
    .map(row => row.split(''))
    .flatMap((row, y) =>
      row.map((s, x) => ({
        mark: s,
        value: charCode(s === 'E' ? 'z' : s),
        position: [x, y]
      }))
    );

  const locateByMark = m => grid.find(({ mark }) => mark === m);

  const initialPath = [locateByMark('S')];
  const end = locateByMark('E');

  const isDestination = c => areEqualVectors(c.position, end.position);

  const areAdjacent = (a, b) =>
    relative(a, b)
      .map(v => Math.abs(v))
      .reduce((acc, v) => acc + v, 0) === 1;

  const findNextSteps = path => {
    const current = path[path.length - 1];
    return grid
      .filter(c => areAdjacent(current.position, c.position))
      .filter(c => c.value <= current.value + 1) // ignore cells which are too step
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

  const recursePaths = (paths, succeedingPaths = []) => {
    paths.forEach(path => {
      // check if we're at the end
      if (isDestination(path[path.length - 1])) {
        succeedingPaths.push(path);
        return;
      }

      // Ignore those paths which have stopped growing - they're at a dead end.
      const newPaths = extendAndBifurcatePath(path).filter(newPath => newPath.length > path.length);

      // console.log(newPaths);

      recursePaths(newPaths, succeedingPaths);
    });

    return succeedingPaths;
  };

  const printPath = path => {
    const width = Math.max(...grid.map(c => c.position[0])) + 1;
    const height = Math.max(...grid.map(c => c.position[1])) + 1;

    range(0, height).forEach((_, y) => {
      console.log(
        range(0, width)
          .map((_, x) => {
            const cell = path.find(p => areEqualVectors(p.position, [x, y]));
            return cell ? String.fromCharCode(96 + cell.value) : '.';
          })
          .join('')
      );
    });

    console.log(path.length - 1); // we don't include the start
  };

  recursePaths([initialPath])
    .sort((a, b) => b.length - a.length)
    .forEach(printPath);
});
