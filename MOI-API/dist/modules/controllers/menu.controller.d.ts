import { MenuService } from '@modules/services/menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    find(): Promise<import("../interfaces/menu.interface").IMenu[]>;
    create(data: any): Promise<any>;
    menu(data: any): Promise<any>;
    module(data: any): Promise<any>;
    createpermiso(data: any): Promise<void>;
}
