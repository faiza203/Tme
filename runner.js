const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const forbiddenDirs = ['node_modules'];

class Runner {
  constructor() {
    this.testFiles = [];
  }

}