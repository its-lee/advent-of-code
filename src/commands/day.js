import { getFilteredDays } from '../runner/runner.js';
import { parseSourceParameter } from './helpers.js';

export const handleDayCommand = async ([yearDayFilter, source = 'i']) => {
  source = parseSourceParameter(source);

  const days = getFilteredDays(yearDayFilter);
  for (const yearDay of days) {
    const result = await yearDay.runner(yearDay, source);
    console.log(JSON.stringify(result.parts, null, 2));
  }
};
