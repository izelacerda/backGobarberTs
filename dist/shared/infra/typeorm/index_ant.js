"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _User = _interopRequireDefault(require("../app/models/User"));

var _File = _interopRequireDefault(require("../app/models/File"));

var _Recipient = _interopRequireDefault(require("../app/models/Recipient"));

var _Order = _interopRequireDefault(require("../app/models/Order"));

var _OrderProblem = _interopRequireDefault(require("../app/models/OrderProblem"));

var _database = _interopRequireDefault(require("../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const models = [_User.default, _File.default, _Recipient.default, _Order.default, _OrderProblem.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new _sequelize.default(_database.default);
    models.map(model => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models));
  }

}

var _default = new Database();

exports.default = _default;