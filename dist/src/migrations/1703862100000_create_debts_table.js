"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDebtsTable1703862100000 = void 0;
class CreateDebtsTable1703862100000 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TYPE "debt_type_enum" AS ENUM ('CreditCard', 'PersonalLoan', 'Company', 'Other');
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
          ("type" = 'Other' AND "otherType" IS NOT NULL) OR
          ("type" != 'Other' AND "otherType" IS NULL)
        )
      );

      CREATE INDEX "idx_debts_user" ON "debts"("userId");
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE "debts";
      DROP TYPE "debt_type_enum";
    `);
    }
}
exports.CreateDebtsTable1703862100000 = CreateDebtsTable1703862100000;
//# sourceMappingURL=1703862100000_create_debts_table.js.map