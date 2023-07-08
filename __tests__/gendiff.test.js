import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/getDifference.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('compare two flat json files', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  const expected = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'expected.txt'), 'utf-8');

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
