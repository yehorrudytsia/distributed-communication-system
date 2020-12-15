'use strict';

const { http, path, worker, url } = require('./libs.js');

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

const parseRequest = async request => new Promise((resolve, reject) => {
  const buffer = [];
  request.on('data', chunk => {
    buffer.push(chunk);
  }).on('end', async () => {
    const data = buffer.join('');
    resolve(JSON.parse(data));
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

  async api (req) {
    const { res } = this;
    const { url } = req;
    console.log(url);
    const methodName = url.substring(METHOD_OFFSET);


    const session = await this.app.sessions.restore(req);
    console.dir(session);
  //  if (!session && methodName !== 'signIn') {
  //    console.log(`Forbidden ${url}`);
  //    this.httpError(403);
  //    return;
  //  }

    const args = await parseRequest(req);
    const sandbox = session ? session.sandbox : undefined;
    const context = session ? session.context : {};
    const token = session ? session.token : undefined;

    try {
      const proc = this.app.runScript(methodName, sandbox);
      console.dir(args)
      const result = await proc(context)(args);

      if (session) {
        const data = await this.app.storage.getUserId(token);
        console.dir(data)
      }

      //console.dir(args)

      if (res.finished || !result) {
        return null;
      }

      //console.log(methodName.substring(1))
      if (methodName === 'signIn') {
        const session = this.app.sessions.start(req, result.userId);
        res.setHeader('Set-Cookie', session.cookie);
      }

      console.dir(result);
      res.end(JSON.stringify(result));
    } catch (err) {
      console.log(err);
    }
  }
}

const listener = (app) => (req, res) => {
  const client = new Client(req, res, app);
  const { method, url } = req;
  console.log(`${method}    ${url}`);
  if (url.startsWith('/api/')) {
    if (method === 'POST') {
      client.api(req);
    }
    else client.httpError(res, 403)
  } else if (url.startsWith('http://')) {
    if (method === 'POST') {
      req.url = url.substring(16,30)
      console.log(req.url)
      client.api(req)
    }
    else client.httpError(res, 403)
  }
  else client.static();
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
