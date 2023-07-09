import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
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
