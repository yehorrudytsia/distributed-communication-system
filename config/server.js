'use strict';

module.exports = {
  host: '127.0.0.1',
  transport: 'http',
  ports: [8000, 8001],
  timeout: 5000,
  concurrency: 500,
  queue: {
    size: 1000,
    timeout: 3000,
  },
};
