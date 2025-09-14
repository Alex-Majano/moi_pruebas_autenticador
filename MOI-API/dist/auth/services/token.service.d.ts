import { Repository } from 'typeorm';
import { MntTokens } from '../entities/MntTokens.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDTO, UpdateTokenDTO } from '../dtos/token.dto';
export declare class TokenService {
    private readonly tokensRepository;
    private readonly jwtService;
    constructor(tokensRepository: Repository<MntTokens>, jwtService: JwtService);
    findOne(token: string): Promise<MntTokens>;
    validExpiration(token: string): Promise<MntTokens>;
    createJWTToken(payload: any, timeExpired: string, secretKey: string): Promise<string>;
    ValidToken(token: string, secretKey: string): Promise<any>;
    create(createToken: CreateTokenDTO): Promise<MntTokens>;
    update(token: string, updateToken: UpdateTokenDTO): Promise<MntTokens>;
    desactiveTokensByUser(userId: string): Promise<void>;
    updateTimeToken(id: string): Promise<void>;
    parseExpirationJwt(jwtExpireTime: any): {
        amount: number;
        unit: any;
    };
}
