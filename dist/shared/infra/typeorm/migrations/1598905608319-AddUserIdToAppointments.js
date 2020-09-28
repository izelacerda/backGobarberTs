"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddUserIdToAppointments1598905608319 {
  async up(queryRunner) {
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'user_id',
      type: 'integer',
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');
    await queryRunner.dropColumn('appointments', 'user_id');
  }

}

exports.default = AddUserIdToAppointments1598905608319;