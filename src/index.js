import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './buildTree.js';
import formatDiff from './formatters/index.js';

const getData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(filepath).slice(1);
  return parse(data, format);
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const diff = buildDiffTree(file1, file2);
  return formatDiff(diff, formatName);
};

export default gendiff;
