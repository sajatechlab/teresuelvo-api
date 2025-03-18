import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateNegotiationStatusEnum1703862300003
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, update any existing records
    await queryRunner.query(`
      UPDATE "negotiations"
      SET status = 'PENDING_REVISION'::negotiation_status_enum
      WHERE status = 'PENDING_REVIEW'::negotiation_status_enum
    `)

    // Then, alter the enum type
    await queryRunner.query(`
      ALTER TYPE "negotiation_status_enum" 
      RENAME VALUE 'PENDING_REVIEW' TO 'PENDING_REVISION'
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // First, update any existing records back
    await queryRunner.query(`
      UPDATE "negotiations"
      SET status = 'PENDING_REVIEW'::negotiation_status_enum
      WHERE status = 'PENDING_REVISION'::negotiation_status_enum
    `)

    // Then, alter the enum type back
    await queryRunner.query(`
      ALTER TYPE "negotiation_status_enum" 
      RENAME VALUE 'PENDING_REVISION' TO 'PENDING_REVIEW'
    `)
  }
}
