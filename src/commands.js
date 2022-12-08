import { range } from './helpers/utility.js';
import { fileExists, copyDir } from './helpers/files.js';

const runDay = async (day, options) => {
  const runner = (await import(`./days/day${day}/index.js`)).default;
  return await runner(day, options);
};

const runAllDays = async (dayFilter, options) => {
  const loaded = {};
  for (const day of range(1, 25).filter(d => !dayFilter || dayFilter === d)) {
    loaded[day] = {};
    try {
      loaded[day].day = await runDay(day, options);
    } catch (e) {
      // ignore instances where we haven't finished that test yet..
      if (!(e instanceof Error && e.code === 'ERR_MODULE_NOT_FOUND')) {
        loaded[day].error = `An error occurred while importing day #${day} - ${e}`;
      }
    }
  }

  return loaded;
};

const runTests = async ({ dayFilter, logOutput, dayOptions = {} }) => {
  const fails = [];
  const addFail = (dayIndex, message) => fails.push(`Day #${dayIndex}: ${message}`);

  const days = await runAllDays(dayFilter, dayOptions);
  Object.entries(days).forEach(([dayIndex, { day, error }]) => {
    if (error) {
      addFail(dayIndex, error);
    }

    if (!day) {
      return;
    }

    if (logOutput) {
      console.log(JSON.stringify(day.parts, null, 2));
    }

    day.parts.forEach(({ actual, expected }, partIndex) => {
      if (expected !== undefined && expected !== actual) {
        addFail(dayIndex, `Part ${partIndex + 1} - returns ${actual} != ${expected}`);
      }
    });
  });

  fails.forEach(f => console.error(f));
  if (fails.length) {
    throw new Error('There are failing tests');
  }
};

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

  await runTests({ dayFilter, logOutput: true, dayOptions: { source } });
};

export const handleTestCommand = async () => {
  await runTests({ logOutput: false });
};

export const handleNewCommand = async ([day]) => {
  day = parseDayParameter(day);

  const dest = `src/days/day${day}`;
  if (await fileExists(dest)) {
    throw new Error(`${dest} already exists.`);
  }

  await copyDir(`src/templates/day`, dest);
  console.log(`Created new folder ${dest}`);
};
