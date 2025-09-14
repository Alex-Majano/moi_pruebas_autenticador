import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { classSessionUser } from '@common/class/userSession.class';
import { IToken } from '../interfaces/token.interface';
import { PermissionsService } from '@auth/services/permissions.service';
import { UsersService } from '@users/services/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly permissionsService;
    private readonly usersService;
    private sessionUser;
    constructor(permissionsService: PermissionsService, usersService: UsersService, sessionUser: classSessionUser);
    validate(request: Request, payload: IToken): Promise<any>;
}
export {};
