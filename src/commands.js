import { range } from './helpers/utility.js';
import { copyDir } from './helpers/files.js';

const getDay = async (day, options) => {
  const runner = (await import(`./days/day${day}/index.js`)).default;
  return await runner(day, options);
};

const getAllDays = async () => {
  const loaded = {};
  for (const day of range(1, 25)) {
    loaded[day] = {};
    try {
      loaded[day].day = await getDay(day);
    } catch (e) {
      // ignore instances where we haven't finished that test yet..
      if (!(e instanceof Error && e.code === 'ERR_MODULE_NOT_FOUND')) {
        loaded[day].error = `An error occurred while importing day #${day} - ${e}`;
      }
    }
  }

  return loaded;
};

const parseDayParameter = day => {
  if (!day || isNaN(parseInt(day))) {
    throw new Error(`A numeric day parameter is required - received ${day}`);
  }

  return day;
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
  day = parseDayParameter(day);
  source = parseSourceParameter(source);

  const parts = await getDay(day, { source });
  console.log(JSON.stringify(parts));
};

export const handleTestCommand = async () => {
  const fails = [];
  const addFail = (dayIndex, message) => fails.push(`Day #${dayIndex}: ${message}`);

  const days = await getAllDays();
  Object.entries(days).forEach(([index, { day, error }]) => {
    if (error) {
      addFail(index, error);
    }

    if (!day) {
      return;
    }

    day.parts.forEach(({ actual, expected }) => {
      if (expected !== undefined && expected !== actual) {
        addFail(index, `Returns ${actual} != ${expected}`);
      }
    });
  });

  fails.forEach(f => console.error(f));
  if (fails.length) {
    throw new Error('There are failing tests');
  }
};

export const handleNewCommand = async ([day]) => {
  day = parseDayParameter(day);

  const dest = `src/days/day${day}`;
  await copyDir(`src/templates/day`, dest);

  console.log(`Created new folder ${dest}`);
};
