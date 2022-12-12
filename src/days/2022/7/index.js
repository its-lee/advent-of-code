import day from '../../../runner/day.js';

export default day(({ answer, source }) => {
  const getNonRecursiveDirectorySizes = () => {
    let currentPath = [];
    const pathSizes = {};

    source.split('\n').forEach(l => {
      if (l.startsWith('$')) {
        const [, dir] = /^\$ cd (.*)$/.exec(l) || [];
        if (dir) {
          if (dir !== '..') {
            currentPath.push(dir === '/' ? '' : dir);
          } else {
            currentPath.pop();
          }
        }
      } else {
        if (!l.startsWith('dir')) {
          const [, size] = /^(\d+) (.*)$/.exec(l) || [];
          const pathStr = currentPath.join('/');
          pathSizes[pathStr] = (pathSizes[pathStr] || 0) + parseInt(size);
        }
      }
    });

    return pathSizes;
  };

  const getRecursivePathSizes = () => {
    const pathSizes = getNonRecursiveDirectorySizes();

    return Object.keys(pathSizes).reduce((acc, path) => {
      const recursiveSize = Object.keys(pathSizes).reduce((overall, subPath) => {
        return overall + (subPath.startsWith(path) ? pathSizes[subPath] : 0);
      }, 0);

      return { ...acc, [path]: recursiveSize };
    }, {});
  };

  const sizeUnder100000 = Object.values(getRecursivePathSizes()).filter(size => size <= 100000);
  //.reduce((acc, size) => acc + size, 0);

  answer(sizeUnder100000);
});
