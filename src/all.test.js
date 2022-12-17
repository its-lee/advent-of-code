import { readAnswers } from './runner/answers.js';
import { getFilteredDays } from './runner/helpers.js';

const source = 'input';
jest.setTimeout(5 * 60000);

getFilteredDays().forEach(yearDay => {
  const name = `day #${yearDay.id}`;
  test(name, async () => {
    console.time(name);
    const result = await yearDay.solve(source);
    const answers = await readAnswers(yearDay.year);

    const expectedParts = answers?.[yearDay.day]?.[source];

    expectedParts.forEach((expected, partIndex) => {
      const actual = result[partIndex];
      expect(actual).toBe(expected);
    });
    console.timeEnd(name);
  });
});
