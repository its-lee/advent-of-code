import { getFilteredDays } from '../runner/helpers.js';

const parseSourceParameter = source => {
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

export const handleDayCommand = async ([yearDayFilter, source = 'i']) => {
  source = parseSourceParameter(source);

  const yearDay = getFilteredDays(yearDayFilter)[0];
  if (!yearDay) {
    throw new Error(`No such day ${yearDayFilter}`);
  }

  const timingLabel = `${yearDayFilter} took`;
  console.time(timingLabel);
  const result = await yearDay.solve(source);
  console.timeEnd(timingLabel);

  result.forEach((value, index) => console.log(`Part ${index + 1}: ${value}`));
};
