import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitTables1736951101346 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
