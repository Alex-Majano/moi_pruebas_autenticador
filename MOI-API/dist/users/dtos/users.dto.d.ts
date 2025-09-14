export declare class createUserDTO {
    readonly email: string;
    readonly password: string;
    readonly idRol: string;
}
declare const updateUserDTO_base: import("@nestjs/common").Type<Omit<Partial<createUserDTO>, "password">>;
export declare class updateUserDTO extends updateUserDTO_base {
}
export {};
