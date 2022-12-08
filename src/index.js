import { range } from './helpers.js';

const getDaySubmission = async day => (await import(`./days/day${day}/index.js`)).default;

const getAllDaySubmissions = async () => {
  const loaded = {};
  for (const day of range(1, 26)) {
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

const handleDayCommand = async args => {
  const [day] = args;
  const submission = await getDaySubmission(day);
  console.log(submission.items);
};

const handleTestCommand = async () => {
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
  process.exit(fails.length ? 1 : 0);
};

const [command, ...args] = process.argv.slice(2);

const requestedCommand = {
  day: handleDayCommand,
  test: handleTestCommand
}[command];

if (!requestedCommand) {
  console.error(`Unsupported command '${command}'`);
  process.exit(1);
}

requestedCommand(args);
