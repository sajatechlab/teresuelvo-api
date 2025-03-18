import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDebtsTable1703862100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "debt_type_enum" AS ENUM ('CREDIT_CARD', 'PERSONAL_LOAN', 'COMPANY', 'OTHER');
      CREATE TYPE "debt_entity_enum" AS ENUM (
        'BANCOLOMBIA',
        'BANCO_PICHINCHA',
        'BANCO_AV_VILLAS',
        'BANCO_POPULAR',
        'BANCO_OCCIDENTE',
        'BANCO_AGRARIO',
        'BANCO_DE_BOGOTA',
        'BANCO_DE_OCCIDENTE',
        'BANCO_DE_POPULAR',
        'BANCO_FALABELLA',
        'BANCO_SANTANDER',
        'BANCO_SCOTIABANK',
        'OTHER'
      );
      CREATE TABLE "debts" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "type" debt_type_enum NOT NULL,
        "otherType" varchar NULL,
        "entity" debt_entity_enum NOT NULL,
        "otherEntity" varchar NULL,
        "amount" decimal(12,2) NOT NULL,
        "guarantee" boolean NOT NULL DEFAULT false,
        "description" text NULL,
        "userId" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        CONSTRAINT "chk_other_type" CHECK (
          ("type" = 'OTHER' AND "otherType" IS NOT NULL) OR
          ("type" != 'OTHER' AND "otherType" IS NULL)
        )
      );

      CREATE INDEX "idx_debts_user" ON "debts"("userId");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "debts";
      DROP TYPE "debt_type_enum";
    `)
  }
}
