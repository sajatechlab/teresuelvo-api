import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDeletedAtPropertyOnTables1703862300001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add deletedAt column to debts table
    await queryRunner.query(`
      ALTER TABLE "debts" 
      ADD "deletedAt" TIMESTAMP WITH TIME ZONE NULL
    `)

    // Add deletedAt column to negotiations table
    await queryRunner.query(`
      ALTER TABLE "negotiations" 
      ADD "deletedAt" TIMESTAMP WITH TIME ZONE NULL
    `)

    // Add deletedAt column to companies table
    await queryRunner.query(`
      ALTER TABLE "companies" 
      ADD "deletedAt" TIMESTAMP WITH TIME ZONE NULL
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove deletedAt column from debts table
    await queryRunner.query(`
      ALTER TABLE "debts" 
      DROP COLUMN "deletedAt"
    `)

    // Remove deletedAt column from negotiations table
    await queryRunner.query(`
      ALTER TABLE "negotiations" 
      DROP COLUMN "deletedAt"
    `)

    // Remove deletedAt column from companies table
    await queryRunner.query(`
      ALTER TABLE "companies" 
      DROP COLUMN "deletedAt"
    `)
  }
}
