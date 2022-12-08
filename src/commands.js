import { range } from './helpers/utility.js';
import { copyDir } from './helpers/files.js';

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

export const handleNewCommand = async ([day]) => {
  requireDayParameter(day);

  const dest = `src/days/day${day}`;
  await copyDir(`src/templates/day`, dest);

  console.log(`Created new folder ${dest}`);
};
