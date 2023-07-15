import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';
import expected from '../__fixtures__/expected.js';
import expectedPlain from '../__fixtures__/expected_plain.js';
import expectedJson from '../__fixtures__/expected_json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe('genDiff function', () => {
  test('should generate correct diff for nested structures in JSON files', () => {
    const pathToFile1 = getFilePath('file1.json');
    const pathToFile2 = getFilePath('file2.json');

    const expectedDiff = expected;
    const actual = genDiff(pathToFile1, pathToFile2);

    expect(actual).toEqual(expectedDiff);
  });

  test('should generate correct diff for nested structures in YAML files', () => {
    const pathToFile1 = getFilePath('file1.yaml');
    const pathToFile2 = getFilePath('file2.yaml');

    const expectedDiff = expected;
    const actual = genDiff(pathToFile1, pathToFile2);

    expect(actual).toEqual(expectedDiff);
  });

  test('plain format', () => {
    const filepath1 = getFilePath('file1.json');
    const filepath2 = getFilePath('file2.json');
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  });

  test('json format', () => {
    const filepath1 = getFilePath('file1.json');
    const filepath2 = getFilePath('file2.json');
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  });
});
