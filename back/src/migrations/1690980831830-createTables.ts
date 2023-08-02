import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1690980831830 implements MigrationInterface {
    name = 'CreateTables1690980831830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "emailPrincipal" character varying(60) NOT NULL, "emailSecondary" character varying(60), "password" character varying(120) NOT NULL, "telephonePrincipal" character varying(15) NOT NULL, "telephoneSecondary" character varying(15), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "emailPrincipal" character varying(60) NOT NULL, "emailSecondary" character varying(60), "telephonePrincipal" character varying(15) NOT NULL, "telephoneSecondary" character varying(15), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
