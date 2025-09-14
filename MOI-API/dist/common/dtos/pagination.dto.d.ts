declare enum enumDirectionOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class paginationDto {
    readonly pagination: boolean;
    readonly take: number;
    readonly page: number;
    readonly search?: string;
    readonly directionOrder: enumDirectionOrder;
    readonly orderField?: string;
}
export {};
