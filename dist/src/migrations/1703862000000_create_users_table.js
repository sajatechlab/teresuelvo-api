"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1703862000000 = void 0;
class CreateUsersTable1703862000000 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TYPE "document_type_enum" AS ENUM ('CC', 'CE', 'PASSPORT');
      
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar NOT NULL,
        "lastName" varchar NOT NULL,
        "documentType" document_type_enum NOT NULL,
        "documentNumber" varchar NOT NULL UNIQUE,
        "phoneCode" varchar NOT NULL,
        "phoneNumber" varchar NOT NULL,
        "email" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
      );

      CREATE UNIQUE INDEX "idx_users_document" ON "users" ("documentType", "documentNumber");
      CREATE UNIQUE INDEX "idx_users_phone" ON "users" ("phoneCode", "phoneNumber");
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE "users";
      DROP TYPE "document_type_enum";
    `);
    }
}
exports.CreateUsersTable1703862000000 = CreateUsersTable1703862000000;
//# sourceMappingURL=1703862000000_create_users_table.js.map