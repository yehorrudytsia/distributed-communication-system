'use strict'

class Storage {
  constructor(db, application) {
    this.db = db;
    this.application = application;
  }

  getUser(login) {
    let result = this.db
      .select('SystemUsers', ['Id', 'Password', 'Fullname'], { login })
      .then(([user]) => user);
    return result;
  }

  getUserId(token) {
    let result = this.db
      .select('Sessions', ['userId'], {token})
      .then(([userId]) => userId);
    return result;
  }

  registration(login, password, fullName) {
    let result = this.db
      .insert('SystemUsers', { login, password, fullName });
      return result;
  }

  setSession({ userId, token, data }) {
    this.db.insert('Sessions', { userId, token, data });
  }

  async getSession(token) {
    let result = await this.db
      .select('Sessions', ['Data'], { token });
    return result;
  }
}

module.exports = Storage;
