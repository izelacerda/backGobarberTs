import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1596481858131
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'getDate()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'getDate()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
