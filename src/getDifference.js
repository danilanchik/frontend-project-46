import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const fixturePath = path.join(process.cwd(), '__fixtures__');

  const absolutePath1 = path.join(fixturePath, filepath1);
  const absolutePath2 = path.join(fixturePath, filepath2);

  const file1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf-8'));

  const keys = _.union(_.keys(file1), _.keys(file2)).sort();

  const diff = keys.map((key) => {
    if (!_.has(file1, key)) {
      return `+ ${key}: ${file2[key]}`;
    }
    if (!_.has(file2, key)) {
      return `- ${key}: ${file1[key]}`;
    }
    if (file1[key] !== file2[key]) {
      return `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}`;
    }
    return `  ${key}: ${file1[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
