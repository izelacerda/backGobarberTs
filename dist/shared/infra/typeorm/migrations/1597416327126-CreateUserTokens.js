"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUserTokens1597416327126 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user_tokens',
      columns: [{
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
        unsigned: true
      }, {
        name: 'token',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'NEWID()'
      }, {
        name: 'user_id',
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
      }],
      foreignKeys: [{
        name: 'TokenUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('user_tokens');
  }

}

exports.default = CreateUserTokens1597416327126;