import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactsTable1690985195915 implements MigrationInterface {
    name = 'ContactsTable1690985195915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "emailSecondary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "telephoneSecondary" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "telephoneSecondary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "emailSecondary" DROP NOT NULL`);
    }

}
