import { promises as fs, writeFileSync } from 'fs';

const readData = async (dir, source) => (await fs.readFile(`${dir}/${source}.txt`, 'utf-8')).trim();

const writeData = (dir, data) => writeFileSync(`${dir}/debug.txt`, data);

export default dayCallback => {
  return id => {
    const [year, day] = id.split('/');
    const dir = `src/days/${id}`;

    const writeDebugFile = data => writeData(dir, data);

    return {
      id,
      year,
      day,
      solve: async source => {
        const parts = dayCallback({ source: await readData(dir, source), writeDebugFile });
        return (parts ?? []).map(p => p());
      }
    };
  };
};
