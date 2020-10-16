'use strict';

const assert = require('assert').strict;
const EventEmitter = require('../emitter.js');

const eventEmitter = new EventEmitter();

eventEmitter.on('blaow', data => {
  console.dir(data);
});

eventEmitter.emit('blaow', { snap: 'back' });

assert.equal(typeof eventEmitter, 'object');
