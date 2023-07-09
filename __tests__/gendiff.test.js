import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/getDifference.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileNames = { file1: 'file1', file2: 'file2' };
const fileExtensions = { json: '.json', yml: '.yml', yaml: '.yaml' };

const getFixturePath = (file, ext) => path.join(__dirname, '..', '__fixtures__', `${file}${ext}`);

test('compare two flat json files', () => {
  const filepath1 = getFixturePath(fileNames.file1, fileExtensions.json);
  const filepath2 = getFixturePath(fileNames.file2, fileExtensions.json);
  const expected = fs.readFileSync(getFixturePath('expected', '.txt'), 'utf-8');

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

test('compare two flat yaml files', () => {
  const filepath1 = getFixturePath(fileNames.file1, fileExtensions.yaml);
  const filepath2 = getFixturePath(fileNames.file2, fileExtensions.yaml);
  const expected = fs.readFileSync(getFixturePath('expected', '.txt'), 'utf-8');

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
