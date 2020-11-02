'use strict';
const PATH = process.cwd();

const { worker, fsp, path } = require('./lib/libs.js');
const { threadId } = worker;

const App = require('./lib/app.js');
const Config = require('./lib/config.js');


(async () => {
  const configPath = path.join(PATH, 'config');
  const config = await new Config(configPath);
  const { units } = config;
  const app = new App();
  Object.assign(app, { config });
  setTimeout(() => {
    console.log(`Application started in worker ${threadId}`);
  }, 50);

  worker.parentPort.on('message', async message => {
    if (message.name === 'stop') {
      if (app.closed) return;
      console.log(`Graceful shutdown in worker ${threadId}`);
      await app.shutdown();
      process.exit(0);
    }
  });

  const logError = err => {
    console.dir(err);
  };

  process.on('uncaughtException', logError);
  process.on('warning', logError);
  process.on('unhandledRejection', logError);
})();
