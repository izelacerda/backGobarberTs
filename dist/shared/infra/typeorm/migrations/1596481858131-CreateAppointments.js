"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAppointments1596481858131 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'appointments',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'NEWID()'
      }, {
        name: 'provider',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'date',
        type: 'datetime',
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
    await queryRunner.dropTable('appointments');
  }

}

exports.default = CreateAppointments1596481858131;