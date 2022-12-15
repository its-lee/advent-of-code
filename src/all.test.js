import { readAnswers } from './runner/answers.js';
import { getFilteredDays } from './runner/runner.js';

const source = 'input';
jest.setTimeout(30000);

getFilteredDays().forEach(yearDay => {
  test(`day #${yearDay.id}`, async () => {
    const result = await yearDay.solve(source);
    const answers = await readAnswers(yearDay.year);

    const expectedParts = answers?.[yearDay.day]?.[source];

    expectedParts.forEach((expected, partIndex) => {
      const actual = result[partIndex];
      expect(actual).toBe(expected);
    });
  });
});
