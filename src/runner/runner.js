import days from '../days/index.js';
import { range } from '../helpers/utility.js';
import { readAnswers } from './answers.js';

const runDay = async (yearDay, runner, options) => {
  const { tracePerformance, source } = options;

  const timerLabel = `Ended day #${yearDay.id}`;
  if (tracePerformance) {
    console.log(`Started day #${yearDay.id}`);
    console.time(timerLabel);
  }

  try {
    return await runner(yearDay, source);
  } finally {
    if (tracePerformance) {
      console.timeEnd(timerLabel);
    }
  }
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
    const runner = days[yearDay.id];
    if (!runner) {
      continue;
    }

    loaded.push({
      yearDay,
      result: await runDay(yearDay, runner, options)
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
  for (const { yearDay, result } of days) {
    if (!result) {
      return;
    }

    if (logOutput) {
      console.log(JSON.stringify(result.parts, null, 2));
    }

    const answers = await readAnswers(yearDay.year);

    result.parts.forEach((actual, partIndex) => {
      const expected = answers?.[yearDay.day]?.[source]?.[partIndex];
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
