import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
export declare class UnaccentFactory implements Seeder {
    run(dataSource: DataSource): Promise<void>;
}
