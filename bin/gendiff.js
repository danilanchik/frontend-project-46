#!/usr/bin/env node

import path from 'path';
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, options) => {
    const fullFilepath1 = path.resolve(process.cwd(), filepath1);
    const fullFilepath2 = path.resolve(process.cwd(), filepath2);
    const format = options.format || 'stylish';
    const diff = genDiff(fullFilepath1, fullFilepath2, format);
    console.log(diff);
  })
  .parse();
