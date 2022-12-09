import { fileExists, copyDir } from './helpers/files.js';
import { runDays } from './runner/runner.js';

const parseDayParameter = day => {
  const parsed = parseInt(day);
  if (isNaN(parsed)) {
    throw new Error(`A numeric day parameter is required - received ${day}`);
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

export const handleDayCommand = async ([day, source = 'i']) => {
  const dayFilter = parseDayParameter(day);
  source = parseSourceParameter(source);

  await runDays({ dayFilter, logOutput: true, dayOptions: { source } });
};

export const handleTestCommand = async () => {
  await runDays({ logOutput: false });
};

export const handleNewCommand = async ([day]) => {
  day = parseDayParameter(day);

  const dest = `src/days/day${day}`;
  if (await fileExists(dest)) {
    throw new Error(`${dest} already exists.`);
  }

  await copyDir(`src/template`, dest);
  console.log(`Created new folder ${dest}`);
};
