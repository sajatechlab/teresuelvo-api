import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateNegotiationsTable1703862200000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "negotiation_status_enum" AS ENUM (
        'PENDING_REVIEW',
        'IN_NEGOTIATION',
        'PENDING_PAYMENT',
        'PAID',
        'REJECTED'
      );
      
      CREATE TABLE "negotiations" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "amountNegotiated" decimal(12,2) NOT NULL,
        "status" negotiation_status_enum NOT NULL DEFAULT 'PENDING_REVIEW',
        "debtId" uuid NOT NULL REFERENCES "debts"("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        CONSTRAINT "unique_debt_negotiation" UNIQUE ("debtId")
      );

      CREATE INDEX "idx_negotiations_debt" ON "negotiations"("debtId");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "negotiations";
      DROP TYPE "negotiation_status_enum";
    `)
  }
}
