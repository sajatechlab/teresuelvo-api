import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDeletedAtToUsers1703862300007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "deleted_at";
    `)
  }
}
