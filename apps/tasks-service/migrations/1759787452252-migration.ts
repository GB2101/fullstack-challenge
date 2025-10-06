import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1759787452252 implements MigrationInterface {
    name = 'Migration1759787452252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "users" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "users"`);
    }

}
