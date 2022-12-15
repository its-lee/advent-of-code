import days from '../days/index.js';
import { readAnswers } from './answers.js';

const getFilteredDays = options => {
  const { yearDayFilter } = options;

  return Object.keys(days)
    .filter(yearDay => !yearDayFilter || yearDay === yearDayFilter)
    .map(yearDay => {
      const [year, day] = yearDay.split('/');

      return {
        year,
        day,
        id: yearDay,
        runner: days[yearDay]
      };
    });
};

export const runDays = async options => {
  options = { source: 'input', ...options };
  const { logOutput, source } = options;

  const fails = [];
  const addFail = (yearDay, message) => fails.push(`Day #${yearDay.id}: ${message}`);

  const days = getFilteredDays(options);
  for (const yearDay of days) {
    const result = await yearDay.runner(yearDay, options.source);

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
