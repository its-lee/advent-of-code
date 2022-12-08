const { promises: fs } = require('fs');
import { range } from './helpers.js';

const getDaySubmission = async day => (await import(`./days/day${day}/index.js`)).default;

const getAllDaySubmissions = async () => {
  const loaded = {};
  for (const day of range(1, 25)) {
    loaded[day] = {};
    try {
      loaded[day].submission = await getDaySubmission(day);
    } catch (e) {
      // ignore instances where we haven't finished that test yet..
      if (!(e instanceof Error && e.code === 'ERR_MODULE_NOT_FOUND')) {
        loaded[day].error = `An error occurred while importing day #${day} - ${e}`;
      }
    }
  }

  return loaded;
};

const requireDayParameter = day => {
  if (!day || isNaN(parseInt(day))) {
    throw new Error('A numeric day parameter is required');
  }
};

export const handleDayCommand = async ([day]) => {
  requireDayParameter(day);

  const submission = await getDaySubmission(day);
  console.log(submission.items);
};

export const handleTestCommand = async () => {
  const fails = [];
  const addFail = (day, message) => fails.push(`Day #${day}: ${message}`);

  const loaded = await getAllDaySubmissions();
  Object.entries(loaded).forEach(([day, { submission, error }]) => {
    if (error) {
      addFail(day, error);
    }

    if (!submission) {
      return;
    }

    submission.items.forEach(({ actual, expected }) => {
      if (expected !== undefined && expected !== actual) {
        addFail(day, `Returns ${actual} != ${expected}`);
      }
    });
  });

  fails.forEach(f => console.error(f));
  if (fails.length) {
    throw new Error('There are failing tests');
  }
};

const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
  }
};

export const handleNewCommand = async ([day]) => {
  requireDayParameter(day);

  const src = `./templates/day`;
  const dest = `./days/day${day}`;
  copyDir(src, dest);
  console.log(day);
};
