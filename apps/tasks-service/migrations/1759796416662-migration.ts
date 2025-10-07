import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1759796416662 implements MigrationInterface {
    name = 'Migration1759796416662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "editedBy"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "username" character varying NOT NULL DEFAULT 'admin'`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "before" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "before" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "editedBy" character varying NOT NULL`);
    }

}
