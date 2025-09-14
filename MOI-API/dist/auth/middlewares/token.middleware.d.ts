import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token.service';
export declare class TokenMiddleware implements NestMiddleware {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    use(req: Request, _res: Response, next: NextFunction): Promise<void>;
}
