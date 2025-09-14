import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
export declare class UsersFactory implements Seeder {
    run(dataSource: DataSource): Promise<void>;
}
