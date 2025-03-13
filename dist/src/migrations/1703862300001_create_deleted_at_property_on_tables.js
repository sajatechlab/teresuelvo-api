"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeletedAtPropertyOnTables1703862300001 = void 0;
class CreateDeletedAtPropertyOnTables1703862300001 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "debts" 
      ADD "deletedAt" TIMESTAMP WITH TIME ZONE NULL
    `);
        await queryRunner.query(`
      ALTER TABLE "negotiations" 
      ADD "deletedAt" TIMESTAMP WITH TIME ZONE NULL
    `);
        await queryRunner.query(`
      ALTER TABLE "companies" 
      ADD "deletedAt" TIMESTAMP WITH TIME ZONE NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "debts" 
      DROP COLUMN "deletedAt"
    `);
        await queryRunner.query(`
      ALTER TABLE "negotiations" 
      DROP COLUMN "deletedAt"
    `);
        await queryRunner.query(`
      ALTER TABLE "companies" 
      DROP COLUMN "deletedAt"
    `);
    }
}
exports.CreateDeletedAtPropertyOnTables1703862300001 = CreateDeletedAtPropertyOnTables1703862300001;
//# sourceMappingURL=1703862300001_create_deleted_at_property_on_tables.js.map