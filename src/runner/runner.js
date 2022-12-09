import { range } from '../helpers/utility.js';

const loadDay = async day => {
  const result = {};
  try {
    result.runner = (await import(`../days/day${day}/index.js`)).default;
  } catch (e) {
    // ignore instances where we haven't finished that test yet..
    if (!(e instanceof Error && e.code === 'ERR_MODULE_NOT_FOUND')) {
      result.error = `An error occurred while importing day #${day} - ${e}`;
    }
  }

  return result;
};

const runDay = async (day, runner, options) => {
  const { tracePerformance, dayOptions = {} } = options;

  let result;
  if (!runner) {
    return undefined;
  }

  const timerLabel = `Ended day #${day}`;
  if (tracePerformance) {
    console.log(`Started day #${day}`);
    console.time(timerLabel);
  }

  result = await runner(day, dayOptions);

  if (tracePerformance) {
    console.timeEnd(timerLabel);
  }

  return result;
};

const runEach = async options => {
  const { dayFilter } = options;

  const loaded = {};
  for (const day of range(1, 25).filter(d => !dayFilter || dayFilter === d)) {
    const { runner, error } = await loadDay(day);

    loaded[day] = {
      day: await runDay(day, runner, options),
      error
    };
  }

  return loaded;
};

export const runDays = async options => {
  const { logOutput } = options;

  const fails = [];
  const addFail = (dayIndex, message) => fails.push(`Day #${dayIndex}: ${message}`);

  const days = await runEach({ ...options, tracePerformance: true });
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
