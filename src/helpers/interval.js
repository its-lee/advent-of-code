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

export const intervalLength = a => (a ? a[1] - a[0] + 1 : 0);

export const intervalsLength = a => a.reduce((acc, i) => acc + intervalLength(i), 0);
