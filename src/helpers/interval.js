export const intervalIntersection = (a, b) => {
  if (!a || !b) {
    return null;
  }

  const intersection = [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
  return intersection[0] <= intersection[1] ? intersection : null;
};

export const intervalUnion = (a, b) => {
  // always return an array of intervals here
  const nonEmpties = [a, b].filter(Boolean);
  if (nonEmpties.length < 2) {
    return nonEmpties.length ? nonEmpties : [];
  }

  const intersection = intervalIntersection(a, b);
  if (intersection) {
    return [[Math.min(a[0], b[0]), Math.max(a[1], b[1])]];
  } else {
    return [a, b];
  }
};

const intervalsUnionPass = v => {
  const unioned = [];
  let queue = [...v];

  while (queue.length) {
    const dequeued = queue.pop();

    // Also deal with any which intersect this interval - so remove them from the queue too.
    //   We don't also fetch the intervals which intersect those and so on - instead we just run
    // this pass again and again until the final union gets no smaller.
    const intersecting = queue.filter(i => intervalIntersection(i, dequeued));
    queue = queue.filter(q => !intersecting.includes(q));

    // Add in the result of unioning all intersecting intervals.
    let u = dequeued;
    intersecting.forEach(i => (u = intervalUnion(u, i)[0]));
    unioned.push(u);
  }

  return unioned;
};

export const intervalsUnion = v => {
  let result = intervalsUnionPass(v);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const passResult = intervalsUnionPass(result);
    if (passResult.length === result.length) {
      return result;
    }

    result = passResult;
  }
};

export const intervalLength = a => (a ? a[1] - a[0] + 1 : 0);

export const intervalsLength = a => a.reduce((acc, i) => acc + intervalLength(i), 0);
