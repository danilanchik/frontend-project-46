#!/usr/bin/env node

const program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .parse(process.argv);

const options = program.opts();
const filePaths = program.args;

console.log(options);
console.log(filePaths);
