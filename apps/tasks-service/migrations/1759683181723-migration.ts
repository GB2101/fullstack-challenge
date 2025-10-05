import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1759683181723 implements MigrationInterface {
    name = 'Migration1759683181723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "priority" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "level" integer NOT NULL, CONSTRAINT "PK_413921aa4a118e20f361ceba8b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "deadline" TIMESTAMP NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "priorityId" integer, "statusId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_a396efb8f415c1b4970cdea6d4f" FOREIGN KEY ("priorityId") REFERENCES "priority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_a11f0de47a765c6c74ffbd10afa" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_a11f0de47a765c6c74ffbd10afa"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_a396efb8f415c1b4970cdea6d4f"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "priority"`);
    }

}
