'use strict'

const autocannon = require('autocannon');
const url = 'http://localhost:8000'
const body = JSON.stringify({})

autocannon({
  url: 'http://localhost:8000',
  method: GET,
  connections: 10,
  pipelining: 1,
  duration: 10
}, console.log)
