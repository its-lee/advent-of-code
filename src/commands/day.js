import { getFilteredDays } from '../runner/helpers.js';
import { parseSourceParameter } from './helpers.js';

export const handleDayCommand = async ([yearDayFilter, source = 'i']) => {
  source = parseSourceParameter(source);

  const yearDay = getFilteredDays(yearDayFilter)[0];
  if (!yearDay) {
    throw new Error(`No such day ${yearDayFilter}`);
  }

  const result = await yearDay.solve(source);
  result.forEach((value, index) => console.log(`Part ${index + 1}: ${value}`));
};
