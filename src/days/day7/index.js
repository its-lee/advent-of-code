import input from './input.js';

let currentPath = [];
const pathSizes = {};

input.split('\n').forEach(l => {
  console.log(l);
  if (l.startsWith('$')) {
    // cd or ls
    const [, dir] = /^\$ cd (.*)$/.exec(l) || [];
    if (dir) {
      if (dir !== '..') {
        currentPath.push(dir === '/' ? '' : dir);
      } else {
        currentPath.pop();
      }
    }
  } else {
    const [, dir] = /^dir (.*)$/.exec(l) || [];
    if (dir) {
      // we don't care about these?
      // currentDir;
      // dir[1] is the dir name
    } else {
      const [, size] = /^(\d+) (.*)$/.exec(l) || [];
      const pathStr = currentPath.join('/');
      pathSizes[pathStr] = (pathSizes[pathStr] || 0) + parseInt(size);
    }
  }
});

const recursiveSizes = Object.keys(pathSizes).reduce((acc, path) => {
  const recursiveSize = Object.keys(pathSizes).reduce((overall, subPath) => {
    if (path === '/ftj' && subPath.startsWith(path)) {
      console.log('for path', path, 'found subPath', subPath, pathSizes[subPath]);
    }

    return overall + (subPath.startsWith(path) ? pathSizes[subPath] : 0);
  }, 0);

  return { ...acc, [path]: recursiveSize };
}, {});

const sizeUnder100000 = Object.values(recursiveSizes).filter(size => size <= 100000);
//.reduce((acc, size) => acc + size, 0);

// path === '/ftj' is too small

export default [pathSizes, recursiveSizes, sizeUnder100000];
