import { promises as fs } from 'fs';
import { dirname } from 'path';

import { fileExists, readJsonFile, writeJsonFile } from '../helpers/files.js';

const getAnswersPath = year => `src/days/${year}/answers.json`;

export const readAnswers = async year => {
  const filepath = getAnswersPath(year);
  if (!(await fileExists(filepath))) {
    return {};
  }

  await readJsonFile(getAnswersPath(year));
};

export const writeAnswers = async (year, content) => {
  const filepath = getAnswersPath(year);
  const dir = dirname(filepath);

  await fs.mkdir(dir, { recursive: true });
  await writeJsonFile(filepath, content);
};
