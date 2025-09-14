import { Repository } from 'typeorm';
import { BitLogErrores } from '../entities/bitLogsErrors.entity';
import { IBitLogErrores } from '../interfaces/createBitacoraErrors.interface';
export declare class BitacoraService {
    private bitLogErroresRepository;
    constructor(bitLogErroresRepository: Repository<BitLogErrores>);
    create(createBitacoraDto: IBitLogErrores): Promise<void>;
}
