export const computeYearDayId = (year, day) => [year, day].join('/');

export const parseNumericParameter = value => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    throw new Error(`A numeric parameter is required - received ${value}`);
  }

  return parsed;
};

export const parseSourceParameter = source => {
  const sources = {
    i: 'input',
    d: 'demo'
  };

  if (!(source in sources)) {
    const valid = Object.keys(sources).join(', ');
    throw new Error(`A valid source parameter is required (one of ${valid}) - received ${source}`);
  }

  return sources[source];
};
