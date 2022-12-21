import { promises as fs } from 'fs';

import { fileExists, copyDir, listDir } from '../helpers/files.js';
import { readAnswers, writeAnswers } from '../runner/answers.js';

const buildDaysIndexContent = days => {
  return [
    `// This file is auto-generated by the 'new' command - do not edit this by hand!`,
    ...days.map(
      ({ variable, dir }) => `import { default as ${variable} } from './${dir}/index.js';`
    ),
    '',
    'const days = {',
    days.map(({ variable, dir }) => `  '${dir}': ${variable}`).join(',\n'),
    '};',
    '',
    `export default days;`,
    ''
  ].join('\n');
};

const regenerateDaysIndex = async () => {
  const days = (await listDir('src/days', 2))
    .reduce((acc, dir) => [...acc, dir.split('/').slice(2)], [])
    // Ensure that we use a sorted array we're working from so that the output file is predictable,
    // and reduces the number of changes we need to make to the file.
    .sort((a, b) => 10 * (a[0] - b[0]) + (a[1] - b[1]))
    .reduce((acc, [year, day]) => {
      const dir = [year, day].join('/');
      acc.push({ variable: `index${dir.replace('/', '')}`, dir });
      return acc;
    }, []);

  await fs.writeFile('src/days/index.js', buildDaysIndexContent(days), { flag: 'w' });
};

const updateAnswersFile = async (year, day) => {
  const answers = await readAnswers(year);
  answers[day] = { demo: [], input: [] };
  await writeAnswers(year, answers);
};

export const handleNewCommand = async ([yearDay]) => {
  const [year, day] = yearDay.split('/');

  const dest = `src/days/${year}/${day}`;
  if (await fileExists(dest)) {
    throw new Error(`${dest} already exists.`);
  }

  await copyDir(`src/template`, dest);
  await regenerateDaysIndex();
  await updateAnswersFile(year, day);

  console.log(`Added new day ${yearDay}`);
};
