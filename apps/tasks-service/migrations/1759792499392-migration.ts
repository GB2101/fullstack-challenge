import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1759792499392 implements MigrationInterface {
    name = 'Migration1759792499392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" ADD "before" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "before"`);
    }

}
