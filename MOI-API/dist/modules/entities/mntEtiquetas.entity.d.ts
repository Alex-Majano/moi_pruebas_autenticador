import { MntMenu } from './MntMenu.entity';
export declare class MntEtiquetas {
    id: string;
    nombre: string;
    icono: string;
    descripcion: string;
    visible: boolean;
    activo: boolean;
    prioridad: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    etiquetaMenu: MntMenu[];
}
