"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNegotiationsTable1703862200000 = void 0;
class CreateNegotiationsTable1703862200000 {
    async up(queryRunner) {
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
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE "negotiations";
      DROP TYPE "negotiation_status_enum";
    `);
    }
}
exports.CreateNegotiationsTable1703862200000 = CreateNegotiationsTable1703862200000;
//# sourceMappingURL=1703862200000_create_negotiations_table.js.map