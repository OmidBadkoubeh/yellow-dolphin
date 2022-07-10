import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoles1657486513092 implements MigrationInterface {
    name = 'AddRoles1657486513092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."User_roles_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "User" ADD "roles" "public"."User_roles_enum" array NOT NULL DEFAULT '{user}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."User_roles_enum"`);
    }

}
