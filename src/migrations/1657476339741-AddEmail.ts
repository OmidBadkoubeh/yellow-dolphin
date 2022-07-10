import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmail1657476339741 implements MigrationInterface {
  name = 'AddEmail1657476339741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "User" ADD "email" character varying');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "User" DROP COLUMN "email"');
  }
}
