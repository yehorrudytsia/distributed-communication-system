'use strict';

const assert = require('assert').strict;
const EventEmitter = require('../emitter.js');

const eventEmitter = new EventEmitter();

eventEmitter.on('blaow', data => {
  console.dir(data);
});

assert.equal(typeof eventEmitter, 'object');
