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

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

export const listDir = async (src, atDepth, dirs = []) => {
  if (!atDepth) {
    dirs.push(src);
  }

  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      await listDir([src, entry.name].join('/'), atDepth - 1, dirs);
    }
  }

  return dirs;
};

export const readJsonFile = async filepath => {
  const content = await fs.readFile(filepath, 'utf-8');
  return JSON.parse(content);
};

export const writeJsonFile = async (filepath, content) => {
  await fs.writeFile(filepath, JSON.stringify(content, null, 2));
};
