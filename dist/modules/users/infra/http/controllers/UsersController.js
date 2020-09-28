"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      password,
      email,
      profile
    } = request.body;

    const createUserService = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUserService.execute({
      name,
      password,
      email,
      profile
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersController;