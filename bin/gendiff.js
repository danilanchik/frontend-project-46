#!/usr/bin/env node

import path from 'path';
import { Command } from 'commander';
import genDiff from '../src/getDifference.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const fullFilepath1 = path.join(process.cwd(), '__fixtures__', filepath1);
    const fullFilepath2 = path.join(process.cwd(), '__fixtures__', filepath2);
    const diff = genDiff(fullFilepath1, fullFilepath2);
    console.log(diff);
  })
  .parse();
