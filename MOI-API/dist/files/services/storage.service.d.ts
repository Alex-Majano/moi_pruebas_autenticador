import { IFileStorage } from '../interfaces/fileStorage.interface';
export declare class StorageService implements IFileStorage {
    private readonly clientS3;
    constructor();
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    getFileUrlS3(key: string): Promise<{
        url: string;
    }>;
    createDirectoryRecursively: (directoryPath: string) => void;
}
