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

export const intervalsUnion = v => {
  const unioned = [];
  let queue = v;

  while (queue.length) {
    // By construction of this algorithm, new items we pop from the queue won't intersect
    // with what's already in the final unioned result - so we won't need to rewrite elements
    // already added to the unioned array.
    const dequeued = queue.pop();

    // Also deal with any which intersect this interval - so remove them from the queue too
    const intersecting = queue.filter(i => intervalIntersection(i, dequeued));
    queue = queue.filter(q => !intersecting.includes(q));

    // Add in the result of unioning all intersecting intervals.
    let u = dequeued;
    intersecting.forEach(i => (u = intervalUnion(u, i)[0]));
    unioned.push(u);
  }

  return unioned;
};

export const intervalLength = a => (a ? a[1] - a[0] + 1 : 0);

export const intervalsLength = a => a.reduce((acc, i) => acc + intervalLength(i), 0);
