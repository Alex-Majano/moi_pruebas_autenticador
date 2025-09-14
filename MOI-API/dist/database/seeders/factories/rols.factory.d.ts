import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
export declare class RolsFactory implements Seeder {
    run(dataSource: DataSource): Promise<void>;
}
