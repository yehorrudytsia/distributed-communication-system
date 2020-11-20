'use strict';

const assert = require('assert').strict;
const path = require('path');

const app = require('../lib/app.js');

const Database = require('../lib/queryBuilder.js');
assert(Database);

const Config = require('../lib/config.js');
assert(Config);

const PATH = process.cwd();

(async () => {
  const configPath = path.join(PATH, 'config');
  const config = await new Config(configPath);

  setTimeout(async () => {
    const databaseConfig = config.units.database;
    const database = new Database(databaseConfig);
    database.close();
  }, 100)
})();
