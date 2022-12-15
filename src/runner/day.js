import { promises as fs } from 'fs';

const readData = async ({ year, day }, source) => {
  const path = `src/days/${year}/${day}/${source}.txt`;
  return (await fs.readFile(path, 'utf-8')).trim();
};

export default dayCallback => {
  return async (yearDay, source) => {
    const parts = dayCallback(await readData(yearDay, source));
    return (parts ?? []).map(p => p());
  };
};
