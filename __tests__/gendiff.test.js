import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';
import expected from '../__fixtures__/expected.js';

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
});
