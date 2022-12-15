import { readAnswers } from './runner/answers.js';
import { getFilteredDays } from './runner/runner.js';

const source = 'input';
jest.setTimeout(30000);

getFilteredDays().forEach(yearDay => {
  test(`day #${yearDay.id}`, async () => {
    const result = await yearDay.runner(yearDay, source);
    const answers = await readAnswers(yearDay.year);

    result.parts.forEach((actual, partIndex) => {
      const expected = answers?.[yearDay.day]?.[source]?.[partIndex];
      if (expected !== undefined) {
        expect(actual).toBe(expected);
      }
    });
  });
});
