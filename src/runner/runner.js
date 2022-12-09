import { range } from '../helpers/utility.js';

const runOne = async (day, options) => {
  const runner = (await import(`../days/day${day}/index.js`)).default;
  return await runner(day, options);
};

const runMultiple = async (dayFilter, options) => {
  const loaded = {};
  for (const day of range(1, 25).filter(d => !dayFilter || dayFilter === d)) {
    loaded[day] = {};
    try {
      loaded[day].day = await runOne(day, options);
    } catch (e) {
      // ignore instances where we haven't finished that test yet..
      if (!(e instanceof Error && e.code === 'ERR_MODULE_NOT_FOUND')) {
        loaded[day].error = `An error occurred while importing day #${day} - ${e}`;
      }
    }
  }

  return loaded;
};

export const runDays = async ({ dayFilter, logOutput, dayOptions = {} }) => {
  const fails = [];
  const addFail = (dayIndex, message) => fails.push(`Day #${dayIndex}: ${message}`);

  const days = await runMultiple(dayFilter, dayOptions);
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
