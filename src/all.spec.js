import { test, expect } from 'vitest';

import { readAnswers } from './runner/answers.js';
import { getFilteredDays } from './runner/helpers.js';

const sources = ['demo', 'input'];

const ignoredIds = [
  // These are currently failing with type errors :(
  '2022/3',
  '2022/4',
  '2022/5'
];

getFilteredDays().forEach(yearDay => {
  if (ignoredIds.includes(yearDay.id)) {
    console.warn(`Not testing ${yearDay.id} as it's set to be ignored.`);
    return;
  }

  sources.forEach(source => {
    const name = `day #${yearDay.id}, from '${source}' data`;
    test(name, async () => {
      console.time(name);
      const result = await yearDay.solve(source);
      const answers = await readAnswers(yearDay.year);

      const expectedParts = answers?.[yearDay.day]?.[source] || [];
      expectedParts.forEach((expected, partIndex) => {
        const actual = result[partIndex];
        expect(actual).toBe(expected);
      });
      console.timeEnd(name);
    });
  });
});
