"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUsers1596487759535 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
        unsigned: true
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'email',
        type: 'varchar',
        isNullable: false,
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'profile',
        type: 'integer',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'datetime',
        default: 'getDate()'
      }, {
        name: 'updated_at',
        type: 'datetime',
        default: 'getDate()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.default = CreateUsers1596487759535;