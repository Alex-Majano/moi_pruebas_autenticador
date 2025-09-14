export declare class CreateTokenDTO {
    readonly token: string;
    readonly expirationTime: string;
    readonly userId: string;
}
declare const UpdateTokenDTO_base: import("@nestjs/common").Type<Partial<CreateTokenDTO>>;
export declare class UpdateTokenDTO extends UpdateTokenDTO_base {
    readonly refreshToken: string;
    readonly refreshExpirationTime: string;
}
export {};
