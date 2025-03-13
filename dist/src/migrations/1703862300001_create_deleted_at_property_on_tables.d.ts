import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateDeletedAtPropertyOnTables1703862300001 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
