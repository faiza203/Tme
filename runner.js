const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const forbiddenDirs = ['node_modules'];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.gray(`---- ${file.shortName}`));
      const beforeEaches = [];
      global.render = render;
      global.beforeEach = fn => {
        beforeEaches.push(fn);
      };
      global.it = async (desc, fn) => {
        beforeEaches.forEach(func => func());
        try {
          await fn();
          console.log(chalk.green(`\tOK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, '\n\t\t');
          console.log(chalk.red(`\tX - ${desc}`));
          console.log(chalk.red('\t', message));
        }
      };

      try {
        require(file.name);
      } catch (err) {
        console.log(chalk.red(err));
      }
    }
  }
}