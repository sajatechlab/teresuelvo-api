import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemovePhoneUniqueIndex1703862300006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_users_phone";
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE UNIQUE INDEX "idx_users_phone" ON "users" ("phoneCode", "phoneNumber");
    `)
  }
}
