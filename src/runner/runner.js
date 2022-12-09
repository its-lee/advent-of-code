import { range } from '../helpers/utility.js';
import { readJsonFile } from '../helpers/files.js';

const loadDay = async ({ year, day, id }) => {
  const result = {};
  try {
    result.runner = (await import(`../days/${year}/day${day}/index.js`)).default;
  } catch (e) {
    // ignore instances where we haven't finished that test yet..
    if (!(e instanceof Error && e.code === 'ERR_MODULE_NOT_FOUND')) {
      result.error = `An error occurred while importing day #${id} - ${e}`;
    }
  }

  return result;
};

const runDay = async (yearDay, runner, options) => {
  const { tracePerformance, source } = options;

  let result;
  if (!runner) {
    return undefined;
  }

  const timerLabel = `Ended day #${yearDay.id}`;
  if (tracePerformance) {
    console.log(`Started day #${yearDay.id}`);
    console.time(timerLabel);
  }

  result = await runner(yearDay, source);

  if (tracePerformance) {
    console.timeEnd(timerLabel);
  }

  return result;
};

const getFilteredDays = options => {
  const { yearFilter, dayFilter } = options;

  return range(2000, 100)
    .filter(y => !yearFilter || yearFilter === y)
    .flatMap(year => {
      return range(1, 25)
        .filter(d => !dayFilter || dayFilter === d)
        .map(day => ({
          year,
          day,
          id: [year, day].join('/')
        }));
    });
};

const runEach = async options => {
  const loaded = [];
  for (const yearDay of getFilteredDays(options)) {
    const { runner, error } = await loadDay(yearDay);

    loaded.push({
      yearDay,
      result: await runDay(yearDay, runner, options),
      error
    });
  }

  return loaded;
};

export const runDays = async options => {
  options = { source: 'input', ...options };
  const { logOutput, source } = options;

  const fails = [];
  const addFail = (yearDay, message) => fails.push(`Day #${yearDay.id}: ${message}`);

  const days = await runEach({ ...options, tracePerformance: true });
  for (const { yearDay, result, error } of days) {
    if (error) {
      addFail(yearDay, error);
    }

    if (!result) {
      return;
    }

    if (logOutput) {
      console.log(JSON.stringify(result.parts, null, 2));
    }

    const answers = await readJsonFile(`src/days/${yearDay.year}/answers.json`);

    result.parts.forEach((actual, partIndex) => {
      const expected = answers?.[yearDay.year]?.[yearDay.day]?.[source]?.[partIndex];
      if (expected !== undefined && expected !== actual) {
        addFail(yearDay, `Part ${partIndex + 1} - returns ${actual} != ${expected}`);
      }
    });
  }

  fails.forEach(f => console.error(f));
  if (fails.length) {
    throw new Error('There are failing tests');
  }
};
