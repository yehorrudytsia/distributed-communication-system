'use strict';

const WebSocket = require('ws');
const Semaphore = require('./semaphore.js');
const { http, https, path, worker } = require('./libs.js');

const TRANSPORT = { http, https, ws: http, wss: https };

const MIME_TYPES = {
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const SHUTDOWN_TIMEOUT = 5000;
const LONG_RESPONSE = 30000;
const METHOD_OFFSET = '/api/'.length;

const clients = new Map();

const timeout = msec => new Promise(resolve => {
  setTimeout(resolve, msec);
});

const receiveArgs = async req => new Promise(resolve => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', async () => {
    const data = body.join('');
    const args = JSON.parse(data);
    resolve(args);
  });
});


class Client {
  constructor(req, res, app) {
    this.req = req;
    this.res = res;
    this.app = app;
  }

  static() {
    const { url } = this.req;
    const filePath = url === '/' ? '/index.html' : url;
    const fileExt = path.extname(filePath).substring(1);
    const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.html;
    this.res.writeHead(200, { 'Content-Type': mimeType });
    const data = this.app.cache.get(filePath);
    if (data) this.res.end(data);
    else this.httpError(404);
  }

  httpError(status) {
    this.res.writeHead(status, { 'Content-Type': 'text/plain' });
    this.res.end(`HTTP ${status}: ${http.STATUS_CODES[status]}`);
  }

  async api() {
  const { req, res } = this;
  const { url } = req;
  const methodName = url.substring(METHOD_OFFSET);

  const session = await this.app.sessions.restore(req);
  if (!session && methodName !== 'signIn') {
    console.log(`Forbidden ${url}`);
    this.httpError(403);
    return;
  }

  const args = await receiveArgs(req);
  const sandbox = session ? session.sandbox : undefined;
  const context = session ? session.context : {};
  const token = session ? session.token : undefined;

  try {
    const execMethod = this.app.runScript(methodName, sandbox);

    if (true) {
      const data = await this.app.sessions.getUserId(token);
      args.userId = data.userid;
    }
    console.dir(args)
    const result1 = await execMethod({});
    const result = await result1(args);

    if (res.finished || !result) {
      return null;
    }

    if (methodName.substring(1) === 'signIn') {
      const session = this.app.sessions.start(req, result.userId);
      res.setHeader('Set-Cookie', session.cookie);
    }

    console.dir(result);
    res.end(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
}}

const listener = (app) => (req, res) => {
  const client = new Client(req, res, app);
  const { method, url } = req;
  console.log(`${method}    ${url}`);
  if (url.startsWith('/api/'))
  {
    if (method === 'POST')
    {
      client.api();
    } else client.httpError(res, 403);
  } else client.static();
};


class Server {
  constructor(config, application) {
    this.config = config;
    this.application = application;
    const { ports, host } = config;
    const { threadId } = worker;
    const port = ports[threadId - 1];
    const handler = listener(application);
    this.server = http.createServer( {application}, handler );
    this.server.listen(port, host);

  }
}

module.exports = Server;
