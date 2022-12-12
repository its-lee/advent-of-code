import { runDays } from '../runner/runner.js';

import days from '../days/index.js';
import { parseNumericParameter, parseSourceParameter, computeYearDayId } from './helpers.js';

export const handleDayCommand = async ([year, day, source = 'i']) => {
  const yearFilter = parseNumericParameter(year);
  const dayFilter = parseNumericParameter(day);

  const id = computeYearDayId(year, day);
  if (!(id in days)) {
    throw new Error(`Cannot find attempt for ${id}`);
  }

  source = parseSourceParameter(source);

  await runDays({ yearFilter, dayFilter, logOutput: true, source });
};
