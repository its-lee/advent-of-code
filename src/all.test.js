import { readAnswers } from './runner/answers.js';
import { getFilteredDays } from './runner/helpers.js';

const sources = ['demo', 'input'];
jest.setTimeout(5 * 60 * 1000);

getFilteredDays().forEach(yearDay => {
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
