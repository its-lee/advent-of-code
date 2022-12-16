import { promises as fs, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const readData = async (dir, source) => (await fs.readFile(`${dir}/${source}.txt`, 'utf-8')).trim();

const writeData = (filepath, data) => {
  mkdirSync(dirname(filepath), { recursive: true });
  writeFileSync(filepath, data);
};

export default dayCallback => {
  return id => {
    const [year, day] = id.split('/');
    const dir = `src/days/${id}`;

    const writeDebugFile = (data, name = 'debug.txt') => writeData(`${dir}/debug/${name}`, data);

    return {
      id,
      year,
      day,
      solve: async source => {
        const parts = dayCallback({
          source: await readData(dir, source),
          isInput: source === 'input',
          writeDebugFile
        });
        return (parts ?? []).map(p => p());
      }
    };
  };
};
