'use strict';

const tests = [''];

for (const test of tests) {
  console.log(`Test unit: ${test}`);
  require(`./unit.${test}.js`);
}
