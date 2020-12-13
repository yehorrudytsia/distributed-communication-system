'use strict';

const assert = require('assert').strict;
const path = require('path');

const app = require('../lib/app.js');

const Database = require('../lib/queryBuilder.js');
assert(Database);

const Config = {
  host: '127.0.0.1',
  port: 5432,
  database: 'dcs',
  user: 'venus',
  password: 'venus',
  max: 1,
};
assert(Config);

const PATH = process.cwd();

//const SystemUsers = 'CREATE TABLE SystemUsers ( Id        serial, Login     varchar(64) NOT NULL, Password  varchar(255) NOT NULL, FullName  varchar(255))'
//const systemusers = 'CREATE TABLE SystemUsers ( Id        serial, Login     varchar(64) NOT NULL, Password  varchar(255) NOT NULL, FullName  varchar(255))'


(async () => {
  setTimeout(async () => {
    const database = new Database(Config);
    const empty = 'empty';
    try {
      const user = { login: empty, password: empty, fullName: empty };
      const result = await database.insert('SystemUsers', user);
      assert(result);
      assert.equal(result.rowCount, 1);
    } catch (err) {
      console.log(err.stack);
      process.exit(1);
    }
    try {
      const fields = ['login', 'password'];
      const where = { login: empty };
      const [record] = await database.select('SystemUsers', fields, where);
      assert.equal(record.login, empty);
      assert.equal(record.password, empty);
    } catch (err) {
      console.log(err.stack);
      process.exit(1);
    }
    try {
      const delta = { password: empty };
      const where = { login: empty };
      const result = await database.update('SystemUsers', delta, where);
      assert.equal(result.rowCount, 1);
    } catch (err) {
      console.log(err.stack);
      process.exit(1);
    }
    try {
      const where = { login: empty };
      const result = await database.delete('SystemUsers', where);
      assert.equal(result.rowCount, 1);
    } catch (err) {
      console.log(err.stack);
      process.exit(1);
    }
    database.close();
  }, 100)
})();
