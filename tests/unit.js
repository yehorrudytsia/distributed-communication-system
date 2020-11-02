'use strict';

const tests = ['config'];

for (const test of tests) {
  console.log(`Test unit: ${test}`);
  require(`./unit.${test}.js`);
}
