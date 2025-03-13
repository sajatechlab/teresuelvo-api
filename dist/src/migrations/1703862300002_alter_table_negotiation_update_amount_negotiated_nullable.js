"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNegotiationUpdateAmountNegotiatedNullable1703862300002 = void 0;
class CreateNegotiationUpdateAmountNegotiatedNullable1703862300002 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "negotiations" 
      ALTER COLUMN "amountNegotiated" DROP NOT NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "negotiations" 
      ALTER COLUMN "amountNegotiated" SET NOT NULL
    `);
    }
}
exports.CreateNegotiationUpdateAmountNegotiatedNullable1703862300002 = CreateNegotiationUpdateAmountNegotiatedNullable1703862300002;
//# sourceMappingURL=1703862300002_alter_table_negotiation_update_amount_negotiated_nullable.js.map