import { runDays } from '../runner/runner.js';

export const handleTestCommand = async () => {
  await runDays({ logOutput: false });
};
