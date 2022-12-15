import { runDays } from '../runner/runner.js';

import days from '../days/index.js';
import { parseSourceParameter } from './helpers.js';

export const handleDayCommand = async ([yearDay, source = 'i']) => {
  if (!(yearDay in days)) {
    throw new Error(`Cannot find attempt for ${yearDay}`);
  }

  source = parseSourceParameter(source);

  await runDays({ yearDayFilter: yearDay, logOutput: true, source });
};
