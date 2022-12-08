import { promises as fs } from 'fs';
import path from 'path';
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

const removeExtension = async (src, ext) => {
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);

    const index = srcPath.lastIndexOf(ext);
    if (index < 0) {
      return;
    }

    await fs.rename(srcPath, srcPath.slice(0, index));
  }
};

export const handleNewCommand = async ([day]) => {
  requireDayParameter(day);

  const dest = `src/days/day${day}`;
  await copyDir(`src/templates/day`, dest);
  await removeExtension(dest, '.template');

  console.log(`Created new folder ${dest}`);
};
