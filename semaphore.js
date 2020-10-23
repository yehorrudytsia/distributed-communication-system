'use strict';

class Semaphore {
  constructor(concurrency, size, timeout) {
    this.counter = concurrency;
    this.timeout = timeout;
    this.size = size;
    this.queue = [];
  }
}

module.exports = Semaphore;
