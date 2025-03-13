import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCompaniesTable1703862300000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "company_type_enum" AS ENUM ('natural', 'juridica');
      CREATE TYPE "company_document_type_enum" AS ENUM ('CC', 'CE', 'PASSPORT', 'NIT');
      CREATE TYPE "debt_range_enum" AS ENUM (
        '5.000.000-10.000.000',
        '10.000.000-20.000.000',
        '20.000.000-50.000.000',
        '50.000.000-100.000.000',
        '+100.000.000'
      );
      
      CREATE TABLE "companies" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "type" company_type_enum NOT NULL,
        "documentType" company_document_type_enum NOT NULL,
        "documentNumber" varchar NOT NULL UNIQUE,
        "debtApprox" debt_range_enum NOT NULL,
        "userId" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        CONSTRAINT "unique_user_company" UNIQUE ("userId"),
        CONSTRAINT "unique_company_document" UNIQUE ("documentType", "documentNumber")
      );

      CREATE INDEX "idx_companies_user" ON "companies"("userId");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "companies";
      DROP TYPE "company_type_enum";
      DROP TYPE "company_document_type_enum";
      DROP TYPE "debt_range_enum";
    `)
  }
}
