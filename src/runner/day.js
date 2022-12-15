import { promises as fs } from 'fs';

const readData = async (id, source) => {
  const path = `src/days/${id}/${source}.txt`;
  return (await fs.readFile(path, 'utf-8')).trim();
};

export default dayCallback => {
  return id => {
    const [year, day] = id.split('/');

    return {
      id,
      year,
      day,
      solve: async source => {
        const parts = dayCallback(await readData(id, source));
        return (parts ?? []).map(p => p());
      }
    };
  };
};
