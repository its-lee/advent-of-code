import { range } from './helpers.js';

const getDaySubmission = async day => (await import(`./days/day${day}/index.js`)).default;

const getAllDaySubmissions = async () => {
  const submissions = [];
  for (const day of range(1, 26)) {
    try {
      submissions.push(await getDaySubmission(day));
    } catch (e) {
      // ignore instances where we haven't finished that test yet..
      if (!(e instanceof Error && e.code === 'ERR_MODULE_NOT_FOUND')) {
        fails.push(`An error occurred while importing day #${day} - ${e}`);
      }
    }
  }

  return submissions;
};

const handleDayCommand = async args => {
  const [day] = args;
  const submission = await getDaySubmission(day);
  console.log(submission.submissions);
};

const handleTestCommand = async () => {
  const submissions = await getAllDaySubmissions();
  const fails = [];
  submissions.forEach(s => {
    s.submissions.forEach(({ actual, expected }) => {
      if (expected === undefined) {
        return;
      }

      if (expected !== actual) {
        fails.push(`Day #${day}: Returns ${actual} != ${expected}`);
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
