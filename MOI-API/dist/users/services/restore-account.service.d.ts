import { DataSource, QueryRunner, Repository } from 'typeorm';
import { MntRestoreAccount, MntUsers } from '@users/entities';
export declare class RestoreAccountService {
    private restoreAccountRepository;
    private readonly dataSource;
    constructor(restoreAccountRepository: Repository<MntRestoreAccount>, dataSource: DataSource);
    create(usuario: MntUsers, ip: string, route: string, useQueryRunner?: QueryRunner): Promise<string>;
    searchToken(token: string): Promise<any>;
    searchTokenByUser(idUser: string): Promise<any>;
}
