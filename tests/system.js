'use strict';

const http = require('http');
const crypto = require('crypto');
const assert = require('assert').strict;
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js');

const SEQ_LENGTH = 8;
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const DIGIT = '0123456789';
const ALPHA_DIGIT = ALPHA + DIGIT;
const BYTE  = 256;

const HOST = '127.0.0.1';
const PORT = 8001;
const START_TIMEOUT = 1000;
const TASKS_TIMEOUT = 3000;
const START_DELAY = 2000;
const TEST_DELAY = 100;

const generateSeq = () => {
  const base = ALPHA_DIGIT.length;
  const bytes = crypto.randomBytes(base);
  let seq = '';
  for (let i = 0; i < SEQ_LENGTH; i++) {
    const index = ((bytes[i] * base) / BYTE) | 0;
    seq += ALPHA_DIGIT[index];
  }
  return seq;
};


const tasks = [
  { get: '/', status: 302 },
  {
    post: '/api/getUser',
    data: { login: 'berniesanders' }
  },
];

console.log('System test started');
setTimeout(async () => {
  console.log('System test finished');
  process.exit(0);
}, TASKS_TIMEOUT);


const getRequest = task => {
  const request = {
    host: HOST,
    port: PORT,
    agent: false
  };
  if (task.get) {
    request.method = 'GET';
    request.path = task.get;
  } else if (task.post) {
    request.method = 'POST';
    request.path = task.post;
  }
  if (task.data) {
    task.data = JSON.stringify(task.data);
    request.headers = {
      'Content-Type': 'application/json',
      'Content-Length': task.data.length
    };
  }
  return request;
};

setTimeout(() => {
  tasks.forEach(task => {
    const name = task.get || task.post;
    console.log('HTTP request ' + name);
    const request = getRequest(task);
    const req = http.request(request);
    req.on('response', res => {
      const expectedStatus = task.status || 200;
      setTimeout(() => {
        assert.equal(res.statusCode, expectedStatus);
      }, TEST_DELAY);
    });
    req.on('error', err => {
      console.log(err.stack);
    });
    if (task.data) req.write(task.data);
    req.end();
  });
}, START_DELAY);
