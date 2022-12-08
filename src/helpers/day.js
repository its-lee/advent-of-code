import { promises as fs } from 'fs';

const readData = async (day, input) => {
  const path = `src/days/day${day}/${input ? 'input' : 'demo'}.txt`;
  return (await fs.readFile(path, 'utf-8')).trim();
};

export default dayCallback => {
  return async day => {
    const parts = [];

    dayCallback({
      part(actual, expected = undefined) {
        parts.push({ actual, expected });
      },
      input: await readData(day, true),
      demo: await readData(day, false)
    });

    return { parts };
  };
};
