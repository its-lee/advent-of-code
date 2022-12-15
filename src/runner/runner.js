import days from '../days/index.js';
import { range } from '../helpers/utility.js';
import { readAnswers } from './answers.js';
import { computeYearDayId } from '../commands/helpers.js';

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
          id: computeYearDayId(year, day)
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
      result: await runner(yearDay, options.source)
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
      continue;
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
