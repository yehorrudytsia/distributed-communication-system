var Storage2 = /** @class */ (function () {
    function Storage2(db) {
        this.db = db;
    }
    Storage2.prototype.getUser = function (login) {
        var result = this.db
            .select('SystemUsers', ['Id', 'Password', 'Fullname'], { login: login })
            .then(function (_a) {
            var user = _a[0];
            return user;
        });
        return result;
    };
    Storage2.prototype.getUserId = function (token) {
        var result = this.db
            .select('Sessions', ['userId'], { token: token })
            .then(function (_a) {
            var userId = _a[0];
            return userId;
        });
        return result;
    };
    Storage2.prototype.registration = function (login, password, fullName) {
        var result = this.db
            .insert('SystemUsers', { login: login, password: password, fullName: fullName });
        return result;
    };
    Storage2.prototype.setSession = function (_a) {
        var userId = _a.userId, token = _a.token, data = _a.data;
        this.db.insert('Sessions', { userId: userId, token: token, data: data });
    };
    Storage2.prototype.getSession = function () {
        return {};
    };
    return Storage2;
}());
