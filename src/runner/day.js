import { promises as fs } from 'fs';

const readData = async (day, source) => {
  const path = `src/days/day${day}/${source}.txt`;
  return (await fs.readFile(path, 'utf-8')).trim();
};

export default dayCallback => {
  return async (day, source) => {
    const parts = [];

    dayCallback({
      source: await readData(day, source),
      answer(value) {
        parts.push(value);
      }
    });

    return { parts };
  };
};
