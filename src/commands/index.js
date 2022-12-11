import { handleDayCommand } from './day.js';
import { handleTestCommand } from './test.js';
import { handleNewCommand } from './new.js';

export default {
  day: handleDayCommand,
  test: handleTestCommand,
  new: handleNewCommand
};
