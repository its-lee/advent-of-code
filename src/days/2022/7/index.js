import day from '../../../runner/day.js';

export default day(source => {
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
      const subPaths = Object.keys(pathSizes).filter(
        key => key === path || key.startsWith(`${path}/`)
      );

      const recursiveSize = subPaths.reduce((overall, key) => overall + pathSizes[key], 0);

      // console.log(path, 'contains', subPaths, 'with size', recursiveSize);

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

    // console.log(JSON.stringify(tree, null, 2));
  };

  print(getNonRecursivePathSizes(), Infinity);
  // eslint-disable-next-line no-unused-vars
  const sizeUnder100000 = Object.values(getRecursivePathSizes())
    .filter(size => size <= 100000)
    .reduce((acc, size) => acc + size, 0);

  // const keyInto = (root, path) => {
  //   let ptr = root;
  //   path.forEach(p => (ptr = ptr[p] = ptr[p] || {}));
  //   return ptr;
  // };
  // const getNonRecursivePathSizes = () => {
  //   let currentPath = [];
  //   const pathSizes = {};
  //   source.split('\n').forEach(l => {
  //     if (l.startsWith('$')) {
  //       const [, dir] = /^\$ cd (.*)$/.exec(l) || [];
  //       if (dir) {
  //         if (dir !== '..') {
  //           currentPath.push(dir === '/' ? '' : dir);
  //         } else {
  //           currentPath.pop();
  //         }
  //       }
  //     } else {
  //       if (!l.startsWith('dir')) {
  //         const [, size] = /^(\d+) (.*)$/.exec(l) || [];
  //         const ourPath = keyInto(pathSizes, currentPath);
  //         ourPath['$size'] = (ourPath['$size'] || 0) + parseInt(size);
  //       }
  //     }
  //   });
  //   return pathSizes;
  // };
  // const getRecursivePathSizes = () => {
  //   const pathSizes = getNonRecursivePathSizes();
  // }
  // console.log(JSON.stringify(getNonRecursivePathSizes(), null, 2));
});
