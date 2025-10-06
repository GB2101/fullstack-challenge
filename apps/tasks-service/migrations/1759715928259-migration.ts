import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1759715928259 implements MigrationInterface {
    name = 'Migration1759715928259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "createdBy" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "createdBy"`);
    }

}
