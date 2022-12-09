import { handleDayCommand, handleTestCommand, handleNewCommand } from './commands.js';

const commands = {
  day: handleDayCommand,
  test: handleTestCommand,
  new: handleNewCommand
};

const [command, ...args] = process.argv.slice(2);
const requestedCommand = commands[command];

if (!requestedCommand) {
  console.error(`Unsupported command '${command}'`);
  process.exit(1);
}

(async () => {
  try {
    await requestedCommand(args);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
