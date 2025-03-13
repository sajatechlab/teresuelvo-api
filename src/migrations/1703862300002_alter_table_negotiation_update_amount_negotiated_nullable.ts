import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateNegotiationUpdateAmountNegotiatedNullable1703862300002
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "negotiations" 
      ALTER COLUMN "amountNegotiated" DROP NOT NULL
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "negotiations" 
      ALTER COLUMN "amountNegotiated" SET NOT NULL
    `)
  }
}
