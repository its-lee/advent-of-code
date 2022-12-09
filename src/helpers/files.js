import { promises as fs } from 'fs';
import path from 'path';

export const fileExists = async filepath => {
  try {
    await fs.access(filepath);
    return true;
  } catch (_) {
    return false;
  }
};

export const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
  }
};

export const readJsonFile = async filepath => {
  const content = await fs.readFile(filepath, 'utf-8');
  return JSON.parse(content);
};
