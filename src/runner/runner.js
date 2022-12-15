import days from '../days/index.js';
import { readAnswers } from './answers.js';

export const getFilteredDays = (yearDayFilter = null) => {
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
  const source = 'input';
  const fails = [];

  for (const yearDay of getFilteredDays()) {
    const result = await yearDay.runner(yearDay, options);
    const answers = await readAnswers(yearDay.year);

    result.parts.forEach((actual, partIndex) => {
      const expected = answers?.[yearDay.day]?.[source]?.[partIndex];
      if (expected !== undefined && expected !== actual) {
        fails.push(`Day #${yearDay.id}: Part ${partIndex + 1} - returns ${actual} != ${expected}`);
      }
    });
  }

  fails.forEach(f => console.error(f));
  if (fails.length) {
    throw new Error('There are failing tests');
  }
};
