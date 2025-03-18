import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateEmailAndDocumentConstraints1703862300009
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing unique constraints
    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_users_document";
    `)
    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_users_email";
    `)

    // Create new partial unique indexes that exclude soft-deleted records
    await queryRunner.query(`
      CREATE UNIQUE INDEX "idx_users_document" 
      ON "users" ("documentNumber") 
      WHERE deleted_at IS NULL;

      CREATE UNIQUE INDEX "idx_users_email" 
      ON "users" ("email") 
      WHERE deleted_at IS NULL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the partial unique indexes
    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_users_document";
      DROP INDEX IF EXISTS "users_email_key";
    `)

    // Restore the original unique constraints
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD CONSTRAINT "idx_users_document" UNIQUE ("documentNumber"),
      ADD CONSTRAINT "users_email_key" UNIQUE ("email");
    `)
  }
}
