#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/getDifference.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  })
  .parse();
