import { runDays } from '../runner/runner.js';

import { parseNumericParameter, parseSourceParameter } from './helpers.js';

export const handleDayCommand = async ([year, day, source = 'i']) => {
  const yearFilter = parseNumericParameter(year);
  const dayFilter = parseNumericParameter(day);
  source = parseSourceParameter(source);

  await runDays({ yearFilter, dayFilter, logOutput: true, source });
};
