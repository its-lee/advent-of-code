import day from '../../../runner/day.js';

export default day(({ answer, source }) => {
  const getNonRecursivePathSizes = () => {
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
    const pathSizes = getNonRecursivePathSizes();

    return Object.keys(pathSizes).reduce((acc, path) => {
      const recursiveSize = Object.keys(pathSizes)
        .filter(key => key.startsWith(path))
        .reduce((overall, key) => overall + pathSizes[key], 0);

      return { ...acc, [path]: recursiveSize };
    }, {});
  };

  const print = (pathSizes, limit) => {
    const tree = {};
    Object.entries(pathSizes).forEach(([key, size]) => {
      if (size > limit) {
        return;
      }

      const parts = key.split('/');
      let ptr = tree;
      parts.forEach(part => (ptr = ptr[part] = ptr[part] || {}));
      ptr['$size'] = size;
    });

    console.log(JSON.stringify(tree, null, 2));
  };

  print(getNonRecursivePathSizes(), Infinity);

  const sizeUnder100000 = Object.values(getRecursivePathSizes())
    .filter(size => size <= 100000)
    .reduce((acc, size) => acc + size, 0);

  answer(sizeUnder100000);
});
