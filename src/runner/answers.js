import { readJsonFile, writeJsonFile } from '../helpers/files.js';

const getAnswersPath = year => `src/days/${year}/answers.json`;

export const readAnswers = async year => readJsonFile(getAnswersPath(year));

export const writeAnswers = async (year, content) => writeJsonFile(getAnswersPath(year), content);
