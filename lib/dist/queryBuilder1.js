'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var pg_1 = require("pg");
var OPERATORS = ['>=', '<=', '<>', '>', '<'];
var where = function (conditions, firstArgIndex) {
    if (firstArgIndex === void 0) { firstArgIndex = 1; }
    var clause = [];
    var args = [];
    var i = firstArgIndex;
    var keys = Object.keys(conditions);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var operator = '=';
        var value = conditions[key];
        if (typeof value === 'string') {
            for (var _a = 0, OPERATORS_1 = OPERATORS; _a < OPERATORS_1.length; _a++) {
                var op = OPERATORS_1[_a];
                var len = op.length;
                if (value.startsWith(op)) {
                    operator = op;
                    value = value.substring(len);
                }
            }
            if (value.includes('*') || value.includes('?')) {
                operator = 'LIKE';
                value = value.replace(/\*/g, '%').replace(/\?/g, '_');
            }
        }
        clause.push(key + " " + operator + " $" + i++);
        args.push(value);
    }
    return { clause: clause.join(' AND '), args: args };
};
var updates = function (delta, firstArgIndex) {
    if (firstArgIndex === void 0) { firstArgIndex = 1; }
    var clause = [];
    var args = [];
    var i = firstArgIndex;
    var keys = Object.keys(delta);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var value = delta[key].toString();
        clause.push(key + " = $" + i++);
        args.push(value);
    }
    return { clause: clause.join(', '), args: args };
};
var Database = /** @class */ (function () {
    function Database(config, application) {
        this.pool = new pg_1.Pool(config);
        this.application = application;
    }
    Database.prototype.query = function (sql, values) {
        var data = values ? values.join(',') : '';
        console.log(sql + "\t[" + data + "]");
        return this.pool.query(sql, values);
    };
    Database.prototype.insert = function (table, record) {
        var keys = Object.keys(record);
        var nums = new Array(keys.length);
        var data = new Array(keys.length);
        var i = 0;
        for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
            var key = keys_3[_i];
            data[i] = record[key];
            nums[i] = "$" + ++i;
        }
        var fields = keys.join(', ');
        var params = nums.join(', ');
        var sql = "INSERT INTO " + table + " (" + fields + ") VALUES (" + params + ")";
        return this.query(sql, data);
    };
    Database.prototype.select = function (table, fields, conditions) {
        if (fields === void 0) { fields = ['*']; }
        if (conditions === void 0) { conditions = null; }
        return __awaiter(this, void 0, void 0, function () {
            var keys, sql, whereClause, args, whereData, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = fields.join(', ');
                        sql = "SELECT " + keys + " FROM " + table;
                        whereClause = '';
                        args = [];
                        if (conditions) {
                            whereData = where(conditions);
                            whereClause = ' WHERE ' + whereData.clause;
                            args = whereData.args;
                        }
                        return [4 /*yield*/, this.query(sql + whereClause, args)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.rows];
                }
            });
        });
    };
    Database.prototype["delete"] = function (table, conditions) {
        if (conditions === void 0) { conditions = null; }
        var _a = where(conditions), clause = _a.clause, args = _a.args;
        var sql = "DELETE FROM " + table + " WHERE " + clause;
        return this.query(sql, args);
    };
    Database.prototype.update = function (table, delta, conditions) {
        if (delta === void 0) { delta = null; }
        if (conditions === void 0) { conditions = null; }
        var upd = updates(delta);
        var cond = where(conditions, upd.args.length + 1);
        var sql = "UPDATE " + table + " SET " + upd.clause + " WHERE " + cond.clause;
        var args = __spreadArrays(upd.args, cond.args);
        return this.query(sql, args);
    };
    Database.prototype.close = function () {
        this.pool.end();
    };
    return Database;
}());
module.exports = Database;
