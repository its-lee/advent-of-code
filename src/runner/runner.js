import { range } from '../helpers/utility.js';

const runEach = async (dayFilter, options) => {
  const loaded = {};
  for (const day of range(1, 25).filter(d => !dayFilter || dayFilter === d)) {
    loaded[day] = {};
    try {
      const runner = (await import(`../days/day${day}/index.js`)).default;
      loaded[day].day = await runner(day, options);
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

  const days = await runEach(dayFilter, dayOptions);
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
