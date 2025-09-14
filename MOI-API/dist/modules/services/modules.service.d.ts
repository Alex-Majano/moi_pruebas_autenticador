import { MntModules } from '../entities/mntModules.entity';
import { Repository } from 'typeorm';
export declare class ModulesService {
    private readonly moduleRepository;
    constructor(moduleRepository: Repository<MntModules>);
    findById(id: string): Promise<MntModules>;
    findByRouteAndMethod(route: string, method: string): Promise<MntModules>;
}
