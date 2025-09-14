import { MntModules } from './mntModules.entity';
import { MntEtiquetas } from './mntEtiquetas.entity';
export declare class MntMenu {
    id: string;
    nombre: string;
    descripcion: string;
    visible: boolean;
    activo: boolean;
    icono: string;
    filename: string;
    admin: boolean;
    superAdmin: boolean;
    prioridad: number;
    createAt: Date;
    updateAt: Date;
    deletedAt: Date;
    etiqueta: MntEtiquetas;
    modulos: MntModules[];
}
