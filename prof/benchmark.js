const autocannon = require('autocannon');
const url = 'http://localhost:8000'
const body = JSON.stringify('jacquefresco')
autocannon({
  url: url,
  connections: 1000,
  duration: 5,
  requests: [{
    method: 'POST',
    path: 'http://127.0.0.1/api/getUser',
    headers: {
      'Content-type': 'application/json'
    },
    body
  }]
});
