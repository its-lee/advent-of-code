import { fileExists, copyDir } from './helpers/files.js';
import { runDays } from './runner/runner.js';

const parseNumericParameter = value => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    throw new Error(`A numeric parameter is required - received ${value}`);
  }

  return parsed;
};

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

const handleDayCommand = async ([year, day, source = 'i']) => {
  const yearFilter = parseNumericParameter(year);
  const dayFilter = parseNumericParameter(day);
  source = parseSourceParameter(source);

  await runDays({ yearFilter, dayFilter, logOutput: true, source });
};

const handleTestCommand = async () => {
  await runDays({ logOutput: false });
};

const handleNewCommand = async ([year, day]) => {
  year = parseNumericParameter(year);
  day = parseNumericParameter(day);

  const dest = `src/days/${year}/day${day}`;
  if (await fileExists(dest)) {
    throw new Error(`${dest} already exists.`);
  }

  await copyDir(`src/template`, dest);
  console.log(`Created new folder ${dest}`);
};

export default {
  day: handleDayCommand,
  test: handleTestCommand,
  new: handleNewCommand
};
