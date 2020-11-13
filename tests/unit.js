'use strict';

const units = ['config', 'database', 'crypto'];

for (const test of units) {
  console.log(`Test unit: ${test}`);
  require(`./unit.${test}.js`);
}
