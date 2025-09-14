import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const token: string = req.headers['authorization']?.split(' ')[1];
    if (token) {
      await this.tokenService.validExpiration(token);
    }
    next();
  }
}
