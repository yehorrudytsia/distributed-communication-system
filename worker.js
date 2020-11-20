'use strict';

const PATH = process.cwd();

const { worker, fsp, path } = require('./lib/libs.js');
const { threadId } = worker;

const App = require('./lib/app.js');
const Config = require('./lib/config.js');
const Database = require('./lib/queryBuilder.js');
const Server = require('./lib/server.js');
const Sessions = require('./lib/sessions.js');
const stats = require('./domain/getStatistics.js');
const bytestoSize = require('./domain/bytestoSize.js');
const resourceMonitoring = require('./init/logMonitoring.js');

(async () => {
  const configPath = path.join(PATH, 'config');
  const config = await new Config(configPath);
  const { units } = config;
  const app = new App();
  Object.assign(app, { config });
  setTimeout(() => {
    console.dir(config)
    app.db = new Database(config.units.database, app);
    app.server = new Server(config.units.server, app);
    app.sessions = Sessions(app);
    app.sandboxInject({ sessions: app.sessions, stats, bytestoSize });
    app.sandbox = app.createSandbox();
    app.sessions.fillPool();
    console.log(`Application up in worker ${threadId}`);
    resourceMonitoring(app);
 }, 200);

  worker.parentPort.on('message', async message => {
    if (message.name === 'stop') {
      if (app.closed) return;
      console.log(`Graceful shutdown in worker ${threadId}`);
      await app.shutdown();
      process.exit(0);
    }
  });

  const logError = err => {
    console.log(err.stack);
  };

  process.on('uncaughtException', logError);
  process.on('warning', logError);
  process.on('unhandledRejection', logError);
})();
