import { ArgumentsHost, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BitacoraService } from '../services/bitacora.service';
export declare class HttpExceptionFilter extends BaseExceptionFilter {
    private bitLogErroresService;
    constructor(applicationRef: HttpServer, bitLogErroresService: BitacoraService);
    catch(exception: any, host: ArgumentsHost): Promise<void>;
}
