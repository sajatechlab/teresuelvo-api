import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddIsAdminToUsers1703862300005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // First add the column
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "isAdmin" boolean NOT NULL DEFAULT false;
    `)

    // Then explicitly update all existing users to have isAdmin = false
    await queryRunner.query(`
      UPDATE "users"
      SET "isAdmin" = false;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "isAdmin";
    `)
  }
}
