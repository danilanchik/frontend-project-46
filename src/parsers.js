import fs from 'fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  const extension = path.extname(filepath);

  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension: ${extension}`);
  }
};

export default parse;
