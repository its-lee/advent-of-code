import { promises as fs } from 'fs';

const readData = async (yearDay, source) => {
  const path = `src/days/${yearDay}/${source}.txt`;
  return (await fs.readFile(path, 'utf-8')).trim();
};

export default dayCallback => {
  return yearDay => {
    return {
      yearDay,
      solve: async source => {
        const parts = dayCallback(await readData(yearDay, source));
        return (parts ?? []).map(p => p());
      }
    };
  };
};
